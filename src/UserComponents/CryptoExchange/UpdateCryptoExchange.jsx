import { Main, DrawerHeader } from "../../Components/Content";
import TextField from '@mui/material/TextField';
import { Paper, Typography, Grid, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import BackupIcon from '@mui/icons-material/Backup';
import CancelIcon from '@mui/icons-material/Cancel';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import axiosInstance from '../../Components/Authentication/axios';
import { useLocation, useNavigate } from 'react-router-dom';






//// Update Crypto Exchange by Admin
export default function AdminUpdateCryptoExchange() {
    const location = useLocation();
    const navigate = useNavigate();
    const CryptoExchange = location.state?.transaction || '';

    const [successMessage, SetSuccessMessage] = useState('');  // Success message
    const [statusValue, updateStatusValue]    = useState(CryptoExchange?.status || '');  // Selected status
    const [error, setError]                   = useState('');  // Error Message
    const [disableSubmit, setDisableSubmit]   = useState(false) // Disable Button


    // Update status
    const handleUpdateStatusValue = (e, newValue) => {
        updateStatusValue(newValue)
    };


    // Update Transaction Status
    const handleTransactionStatusUpdate = () => {
            setDisableSubmit(true);

            axiosInstance.put(`/api/v6/admin/crypto/exchange/`, {
                exchange_id: CryptoExchange.id,
                status: statusValue

            }).then((res)=> {
                // console.log(res);

                if (res.status === 200 && res.data.success === true) {
                    setDisableSubmit(false)
                    SetSuccessMessage('Updated Successfully')

                    setTimeout(() => {
                        window.location.href = '/admin/user/crypto/exchange/'
                    }, 2000);
                }

            }).catch((error)=> {
                // console.log(error)

                setTimeout(() => {
                    setError('');
                    setDisableSubmit(false);
                }, 2500);

                if (error.response.data.message === 'Unauthorized') {
                    window.location.href = '/signin/'

                } else if (error.response.data.message === 'Transaction not found') {
                    setError('Invalid Transaction please try again');

                } else if (error.response.data.message === 'Invalid Crypto Wallet') {
                    setError('User crypto wallet not found');

                } else if (error.response.data.message === 'Invalid FIAT wallet') {
                    setError('User FIAT wallet not found');

                } else if (error.response.data.message === 'Insufficient funds') {
                    setError('Insufficient funds in Wallet');

                } else if (error.response.data.message === 'Transaction already approved') {
                    setError('Transaction already approved');

                } else {
                    setError('');
                }
            });
    };


    // If data not available
    if (CryptoExchange === '') {
        <Main open={open}>
            <DrawerHeader />
              <p>Retry</p>
        </Main>
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
                    Update User's Crypto Exchange Transaction
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField  
                            id="userName" 
                            label="User Name" 
                            variant="outlined" 
                            fullWidth
                            name='userName'
                            value={CryptoExchange?.user_name || ''}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            id="userEmail" 
                            label="User Email" 
                            variant="outlined" 
                            fullWidth 
                            name='userEmail'
                            value={CryptoExchange?.user_email || ''}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            type='text' 
                            id="crypto" 
                            label="Exchange Crypto Amount" 
                            variant="outlined" 
                            fullWidth 
                            name='crypto'
                            value={`${CryptoExchange?.crypto_name || ''} ${CryptoExchange.exchange_crypto_amount ? parseFloat(CryptoExchange.exchange_crypto_amount).toFixed(15) : 0 }`}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            type='text' 
                            id="amount" 
                            label="Converted FIAT Amount" 
                            variant="outlined" 
                            fullWidth 
                            name='amount'
                            value={`${CryptoExchange?.fiat_currency || ''} ${CryptoExchange.converted_fiat_amount ? parseFloat(CryptoExchange.converted_fiat_amount).toFixed(17) : 0}`}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            type='text' 
                            id="fee" 
                            label="Transaction Fee" 
                            variant="outlined" 
                            fullWidth 
                            name='fee'
                            value={`${CryptoExchange.fee_value ? parseFloat(CryptoExchange.fee_value).toFixed(17) : 0} ${CryptoExchange?.crypto_name || ''}`}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField  
                            id="date" 
                            label="Date" 
                            variant="outlined" 
                            fullWidth 
                            name='date'
                            value={`${CryptoExchange?.created_at.split('T')[0] || ''} ${CryptoExchange?.created_at.split('T')[1]  || ''}`}
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
                <Typography sx={{color:'red', display:'flex', justifyContent: 'center'}}>{error}</Typography>

                {/* Success Message */}
                <Typography sx={{color:'green', display:'flex', justifyContent: 'center'}}>{successMessage}</Typography>

                <Grid container justifyContent="center" sx={{ mt: 3 }} spacing={2}>
                    <Grid item>
                        <Button 
                            sx={{mx:2}} 
                            variant="contained" 
                            endIcon={<BackupIcon />}
                            onClick={handleTransactionStatusUpdate}
                            disabled={disableSubmit}
                            >
                            Submit
                        </Button>

                        <Button 
                            sx={{mx:2}} 
                            variant="contained" 
                            endIcon={<CancelIcon color='error'/>}
                            onClick={()=> {navigate('/admin/user/crypto/exchange/')}}
                            >
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
                </Paper>
        </Main>
    );
};