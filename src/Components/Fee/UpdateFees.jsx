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
export default function UpdateFees({open}) {
    const navigate = useNavigate();
    const location = useLocation();
    const states = location?.state || '';
    const fees   = states?.fees || ''

    const [successMessage, setSuccessMessage] = useState('');  // Success Message state
    const [error, setError]                   = useState('');  // Error Message state
    const [feeName, setFeeName]               = useState(fees?.name || '');
    const [feeType, setFeeType]               = useState(fees?.fee_type || '');
    const [taxrate, setTaxRate]               = useState(false);
    const [formData, updateFormData]          = useState({
        tax_rate: fees?.tax_rate || 0,
        fixed_value: fees?.min_value || 0
    });


    // Fee Name
    const handleChangeFeeName = (e, newValue)=> {
        setFeeName(newValue)
    };

    // Flip between Percentage and Fixed field
    useEffect(() => {
       if (fees?.fee_type === 'Percentage') {
            setTaxRate(true)
       } else if (fees?.fee_type === 'Fixed') {
            setTaxRate(false);
       }
    }, []);

    


    // Fee Type
    const handleChangeFeeType = (e, newValue)=> {
        if (newValue === 'Percentage') {
            setTaxRate(true)
            updateFormData((prevData)=> ({
                ...prevData,
                fixed_value: 0
            }))

        } else if (newValue === 'Fixed') {
            setTaxRate(false)
            updateFormData((prevData)=> ({
                ...prevData,
                tax_rate: 0
            }))
        }

        setFeeType(newValue);
    };


    // Update Input Field data
    const handleUpdateFormData = (e, newValue)=> {
        const { name, value } = e.target;

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

    // const handleFeeValueChange = ()=> {
    //     if (feeType === 'Fixed') {
    //         updateFormData((prevData)=> ({
    //             ...prevData,
    //             tax_rate: 0
    //         }))
    //     } else if (feeType === 'Percentage') {
    //         updateFormData((prevData)=> ({
    //             ...prevData,
    //             fixed_value: 0
    //         }))
    //     } 
    // };
    


    // If the values are abscent
    if (states === '') {
        return (
            <Main open={open}>
                <DrawerHeader />
                <p>Please revert and restart</p>

            </Main>
        );
    };


    // Submit Fee data
    const handleSubmitUpdateData = ()=> {
        // handleFeeValueChange();

        if (!feeName) {
            setError('Please select Fee Name')
        } else if (!feeType) {
            setError('Please select Fee Type')
        
        } else {
            setError('')
            
            axiosInstance.put(`/api/v3/admin/fees/`, {
                fee_id:   fees.id,
                fee_name: feeName,
                fee_type: feeType,
                tax_rate: formData.tax_rate ? parseFloat(formData.tax_rate)  : 0,
                fixed_value: formData.fixed_value ? parseFloat(formData.fixed_value) : 0

            }).then((res)=> {
                // console.log(res)

                if (res.status === 200) {
                    setSuccessMessage('Updated Successfully')

                    setTimeout(() => {
                        navigate('/admin/fees/')
                        setSuccessMessage('')
                    }, 2000);
                }

            }).catch((error)=> {
                // console.log(error)

                if (error.response.data.message === 'Invalid Fee ID') {
                    setError('Invalid Fee')
                } else if (error.response.data.message === 'Fee Name already exists') {
                    setError('Fee name already exists')
                } else if (error.response.data.message === 'Unauthorized') {
                    navigate('/signin/')
                }

                setTimeout(() => {
                    setError('')
                }, 1500);
            });

        }
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
                    Update Fee
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={6}>
                        <Select
                            placeholder="Select Fee Name"
                            name="fee_name"
                            required
                            value={feeName}
                            onChange={handleChangeFeeName}
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
                            required
                            indicator={<KeyboardArrowDown />}
                            value={feeType}
                            onChange={handleChangeFeeType}
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
                                name='tax_rate'
                                value={formData?.tax_rate || ''}
                                onChange={handleUpdateFormData}
                                />
                        </Grid>
                    }

                    {!taxrate && 
                        <Grid item xs={12} sm={6} md={6}>
                            <Input 
                                placeholder="Fixed Value" 
                                name='fixed_value'
                                value={formData?.fixed_value || ''}
                                onChange={handleUpdateFormData}
                                />
                        </Grid>
                    }
                </Grid>

                {/* Error Message */}
                <Typography sx={{color:'red', display:'flex', justifyContent: 'center'}}>{error}</Typography>

                {/* Success Message */}
                <Typography sx={{color:'green', display:'flex', justifyContent: 'center'}}>{successMessage}</Typography>

                <Grid container justifyContent="center" sx={{ mt: 3 }} spacing={2}>
                    <Grid item>
                        <Button 
                            sx={{mx:2}} 
                            variant="contained" 
                            endIcon={<BackupIcon />}
                            onClick={handleSubmitUpdateData}
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