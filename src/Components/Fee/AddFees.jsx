import TextField from '@mui/material/TextField';
import { Paper, Typography, Grid } from '@mui/material';
import { Main, DrawerHeader } from '../Content';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import BackupIcon from '@mui/icons-material/Backup';
import CancelIcon from '@mui/icons-material/Cancel';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import axiosInstance from '../Authentication/axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Input from '@mui/joy/Input';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';



// Update Fees
export default function AddFees({open}) {
    const navigate = useNavigate();
    const initialFormData = {
        tax_rate: 0.00,
        fixed_value: 0.00
    };

    const [successMessage, setSuccessMessage] = useState('');  // Success Message state
    const [error, setError]                   = useState('');  // Error Message state
    const [formData, updateFormData]          = useState(initialFormData);
    const [feeName, setFeeName]               = useState('');
    const [feeType, setFeeType]               = useState('');
    const [taxrate, setTaxRate]               = useState(false);
    
    
    // Flip between Percentage and Fixed field
    useEffect(() => {
        if (feeType === 'Percentage') {
             setTaxRate(true)
        } else if (feeType === 'Fixed') {
             setTaxRate(false);
        }
     }, []);


    // Get form data
    const handleFormDataChange = (e, newValue)=> {
        const {name, value} = e.target;

        if (value === '') {
            setError('')
            updateFormData({
                ...formData,
                [name]: newValue || value
            })

        } else if (Number(value) === 0 || Number(value) < 0) {
            setError('Fee should be greater than 0')

        } else if (value.length > 8) {
            setError('Fee must be less than 8 digit')

        } else if (/^\d*\.?\d*$/.test(value) || value === '' || Number(value) > 0) {
            setError('')
            updateFormData({
                ...formData,
                [name]: newValue || value
            })
        }
    };


    // Fee Name
    const handleChangeFeeName = (e, newValue)=> {
        setFeeName(newValue)
    };


    // Fee Type
    const handleChangeFeeType = (e, newValue)=> {
        if (newValue === 'Percentage') {
            setTaxRate(true)
            updateFormData({
                fixed_value: 0
            })
        } else if (newValue === 'Fixed') {
            setTaxRate(false)
            updateFormData({
                tax_rate: 0
            })
        }

        setFeeType(newValue);
    };


    // Submit Create data
    const handleSubmitCreateData = (e)=> {
        if (!feeName) {
            setError('Please select Fee Name')
        } else if (!feeType) {
            setError('Please select Fee Type')
        } else {
            setError('')

            axiosInstance.post(`/api/v3/admin/fees/`, {
                fee_name: feeName,
                fee_type: feeType,
                tax_rate: formData.tax_rate ? parseFloat(formData.tax_rate) : 0,
                fixed_value: formData.fixed_value ? parseFloat(formData.fixed_value) : 0

            }).then((res)=> {
                // console.log(res)
                
                if (res.status === 201) {
                    setSuccessMessage('Created Successfully')

                    setTimeout(() => {
                        navigate('/admin/fees/')
                        setSuccessMessage('')
                    }, 2000);
                }

            }).catch((error)=> {
                // console.log(error)
                if (error.response.data.message === 'Fee Name already exists') {
                    setError('Fee Name already exists')
                } else if (error.response.data.message === 'Unauthorized') {
                    navigate('/signin/')
                }

                setTimeout(() => {
                    setError('')
                }, 1500);

            })
        };
    };


    return (
        <Main open={open}>
            <DrawerHeader />

            <Paper
                elevation={3}
                sx={{
                    padding: 3,
                    marginTop: 1,
                    borderRadius: 7,
                    '&:hover': {
                    boxShadow: '-9px 17px 5px 0px rgba(0,0,0,0.75)',
                    },
                }}
                >
                <Typography variant="h5" gutterBottom sx={{mb:3}}>
                    Add New Fee
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={6}>
                        <Select
                            placeholder="Select Fee Name"
                            required
                            name="fee_name"
                            value={feeName}
                            onChange={(e, newValue) => handleChangeFeeName(e, newValue)}
                            indicator={<KeyboardArrowDown />}
                            sx={{
                                [`& .${selectClasses.indicator}`]: {
                                  transition: '0.2s',
                                  [`&.${selectClasses.expanded}`]: {
                                    transform: 'rotate(-180deg)',
                                  },
                                },
                              }}
                            >
                            <Option value="Crypto Buy">Crypto Buy</Option>
                            <Option value="Crypto Sell">Crypto Sell</Option>
                            <Option value="Crypto Swap">Crypto Swap</Option>
                            <Option value="Crypto Exchange">Crypto Exchange</Option>
                            <Option value="Fiat Deposit">Fiat Deposit</Option>
                            <Option value="Fiat Transfer">Fiat Transfer</Option>
                            <Option value="Fiat Withdrawal">Fiat Withdrawal</Option>
                            <Option value="Fiat Exchange">Fiat Exchange</Option>
                        </Select>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                        <Select
                            placeholder="Select Fee Type"
                            name="fee_type"
                            value={feeType}
                            required
                            onChange={(e, newValue) => handleChangeFeeType(e, newValue)}
                            indicator={<KeyboardArrowDown />}
                            sx={{
                                [`& .${selectClasses.indicator}`]: {
                                  transition: '0.2s',
                                  [`&.${selectClasses.expanded}`]: {
                                    transform: 'rotate(-180deg)',
                                  },
                                },
                              }}
                            >
                            <Option value="Percentage">Percentage</Option>
                            <Option value="Fixed">Fixed</Option>
                        </Select>
                    </Grid>


                    {taxrate && 
                        <Grid item xs={12} sm={6} md={6}>
                            <Input 
                                placeholder="Tax Rate" 
                                value={formData.tax_rate}
                                name='tax_rate'
                                onChange={handleFormDataChange}
                                />
                        </Grid>
                    }

                    {!taxrate && 
                        <Grid item xs={12} sm={6} md={6}>
                            <Input 
                                placeholder="Fixed Value" 
                                name='fixed_value' 
                                value={formData.fixed_value}
                                onChange={handleFormDataChange}
                                />
                        </Grid>
                    }
                </Grid>

                {/* Error Message */}
                <Typography sx={{color:'red', display:'flex', justifyContent: 'center', mt:2}}>{error}</Typography>

                {/* Success Message */}
                <Typography sx={{color:'green', display:'flex', justifyContent: 'center', mt:2}}>{successMessage}</Typography>

                <Grid container justifyContent="center" sx={{ mt: 0 }} spacing={2}>
                    <Grid item>
                        <Button 
                            sx={{mx:2}} 
                            variant="contained" 
                            endIcon={<BackupIcon />}
                            onClick={handleSubmitCreateData}
                            >
                            Update
                        </Button>

                        <Button 
                            sx={{mx:2}} 
                            variant="contained" 
                            endIcon={<CancelIcon color='error'/>}
                            onClick={()=> navigate('/admin/fees/')}
                            >
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
                </Paper>
        </Main>
    );
};