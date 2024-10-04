import TextField from '@mui/material/TextField';
import { Paper, Typography, Grid, Box } from '@mui/material';
import { Main, DrawerHeader } from '../../Components/Content';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import BackupIcon from '@mui/icons-material/Backup';
import CancelIcon from '@mui/icons-material/Cancel';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import axiosInstance from '../../Components/Authentication/axios';
import { useLocation, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';




// Raise Exchange Money Request
export default function UpdateExchangeMoneyRequest(){
    
    const location = useLocation();
    const navigate = useNavigate();
    const ExchangeData = location.state?.exchangeData || '';

    const [successMessage, SetSuccessMessage]          = useState('');  // Success message
    const [statusValue, updateStatusValue]             = useState(ExchangeData?.status || '');  // Selected status
    const [disableButton, setDisablebutton]            = useState(false);
    const [error, setError]                            = useState('');  // Error Message
    const [loader, setLoader]                          = useState(false);
    

    // Update Transaction Status
    const handleTransactionStatusUpdate = () => {
        if(statusValue === '') {
            setError('Please select status')
        } else {
            setDisablebutton(true);

            if (ExchangeData) {
                axiosInstance.put(`/api/v6/admin/exchange/money/`, {
                    exchange_money_id: ExchangeData?.id,
                    converted_amount: ExchangeData?.converted_amount,
                    status: statusValue
        
                }).then((res)=> {
                    // console.log(res)
                    if (res.status === 200)  {
                        SetSuccessMessage('Transaction Updated Successfully')
        
                        setTimeout(() => {
                            navigate('/admin/all/exchange/money/')
                        }, 1000);
                    }
        
                }).catch((error)=> {
                    // console.log(error)
                    setDisablebutton(false);

                    if (error.response.status === 401) {
                        navigate('/signin/')
                    } else if (error.response.data.message === 'Transaction has been completed') {
                        setError('Transaction has been completed can not perform this task again')
                    } else if (error.response.data.message === 'From Wallet not found') {
                        setError('User wallet not found')
                    } else if (error.response.data.message === 'Received Wallet not found') {
                        setError('User wallet not found')
                    } else if (error.response.data.message === 'Do not have sufficient balance in account') {
                        setError('Do not have sufficient wallet in Account')
                    } else if (error.response.data.message === 'Transaction not found') {
                        setError('Invalid Transaction')
                    } else {
                        setError('')
                    };

                });
            } else {
                setError('Something went wrong')
            };
        };
    };


    // Update status
    const handleUpdateStatusValue = (e, newValue) => {
        updateStatusValue(newValue)
    };

    // Untill API data not fetched
    if (loader) {
        return (
            <Main open={open}>
            <DrawerHeader />
                <Box sx={{ display: 'flex', justifyContent:'center', marginTop:'20%' }}>
                    <CircularProgress />
                </Box>
            </Main>
        )
    };


    // If data not present from previous page
    if (ExchangeData === '') {
        return (
            <Main open={open}>
            <DrawerHeader />
                <Box sx={{ display: 'flex', justifyContent:'center', marginTop:'20%' }}>
                    <DeleteOutlineIcon sx={{fontSize:'4rem'}} />
                </Box>
            </Main>
        )
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
                    Update Exchange Money Request
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            disabled 
                            id="userName" 
                            label="User Name" 
                            variant="outlined" 
                            fullWidth
                            name='userName'
                            value={ExchangeData?.user_name || ''}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            disabled 
                            id="userEmail" 
                            label="User Email" 
                            variant="outlined" 
                            fullWidth 
                            name='userEmail'
                            value={ExchangeData?.user_email || ''}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            type='text' 
                            id="fromAmount" 
                            label="From Amount" 
                            variant="outlined" 
                            fullWidth 
                            name='fromAmount'
                            value={`${ExchangeData?.exchange_amount || ''} ${ExchangeData?.from_currency || ''}`}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            type='text' 
                            id="toAmount" 
                            label="To Amount" 
                            variant="outlined" 
                            fullWidth 
                            name='toAmount'
                            value={`${ExchangeData?.converted_amount || ''} ${ExchangeData?.to_currency || ''}`}
                            />
                    </Grid>
                   
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            type='text' 
                            id="fee" 
                            label="Fee" 
                            variant="outlined"
                            fullWidth 
                            name='fee'
                            value={`${ExchangeData?.transaction_fee || ''} ${ExchangeData?.from_currency || ''}`}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField  
                            id="date" 
                            label="Date" 
                            variant="outlined" 
                            fullWidth 
                            name='date'
                            value={ExchangeData?.created_At?.split('T')[0] || ''}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            id="time" 
                            label="Time" 
                            variant="outlined" 
                            fullWidth 
                            name='time'
                            value={ExchangeData?.created_At?.split('T')[1] || ''}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Select
                            placeholder="Select Status"
                            id="status" 
                            name='status'
                            value={statusValue}
                            onChange={(e, newValue)=> {handleUpdateStatusValue(e, newValue);}}
                            required
                            sx={{ minWidth: 200, height: 55 }}
                            >
                                <Option value="Pending">Pending</Option>
                                <Option value="Approved">Approve</Option>
                                <Option value="Cancelled">Cancel</Option>
                                <Option value="Hold">On Hold</Option>
                        </Select>
                    </Grid>
                </Grid>

                {/* Error Message */}
                <Typography sx={{color:'red', display:'flex', justifyContent: 'center', mt:3}}>{error}</Typography>

                {/* Success Message */}
                <Typography sx={{color:'green', display:'flex', justifyContent: 'center'}}>{successMessage}</Typography>

                <Grid container justifyContent="center" sx={{ mt: 3 }} spacing={2}>
                    <Grid item>
                        <Button 
                            sx={{mx:2}} 
                            variant="contained" 
                            endIcon={<BackupIcon />}
                            onClick={handleTransactionStatusUpdate}
                            disabled={disableButton}
                            >
                            Submit
                        </Button>

                        <Button 
                            sx={{mx:2}} 
                            variant="contained" 
                            endIcon={<CancelIcon color='error'/>}
                            onClick={()=> {navigate('/admin/all/exchange/money/')}}
                            >
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
                </Paper>
        </Main>
    );
};