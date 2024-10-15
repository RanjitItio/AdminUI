import TextField from '@mui/material/TextField';
import { Paper, Typography, Grid } from '@mui/material';
import { Main, DrawerHeader } from '../../Components/Content';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import BackupIcon from '@mui/icons-material/Backup';
import CancelIcon from '@mui/icons-material/Cancel';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import axiosInstance from '../../Components/Authentication/axios';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';




// Update User's Crypto Wallet by Admin
export default function UpdateCryptoWallet({open}) {
    const navigate = useNavigate();
    const location = useLocation();
    const states = location?.state || '';

    const [successMessage, setSuccessMessage] = useState('');  // Success Message state
    const [error, setError]                   = useState('');  // Error Message state
    const [status, updateStatus]              = useState(states.Wallet?.status || '');  // Withdrawal status state
    const [loadingButton, setLoadingButton]   = useState(false); // Loading Button State


    // Capture Status value
    const handleUpdateStatus = (e, newValue)=> {
        updateStatus(newValue)
    };



    // Update Status method
    const handleUpdateWallet = ()=> {
        setLoadingButton(true);

        axiosInstance.put(`/api/v2/admin/crypto/wallets/`, {
            wallet_id: parseInt(states.Wallet?.id),
            status: status

        }).then((res)=> {
            // console.log(res)
            if (res.status === 200 && res.data.message === 'Updated Successfully') {
                setSuccessMessage('Updated Successfully')
                setLoadingButton(false);

                setTimeout(() => {
                    setSuccessMessage('')
                    navigate('/admin/user/wallets/')
                }, 2000);
            };

        }).catch((error)=> {
            // console.log(error)
            setLoadingButton(false);

            if (error.response.data.message === 'Wallet already created') {
                setError('Wallet has been created')
            } else {
                setError('')
            };

        })
    };


    // If the values are abscent
    if (states === '') {
        return (
            <p>Please restart</p>
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
                    Update Crypto Wallet
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            disabled 
                            id="merchantName" 
                            label="Merchant Name" 
                            variant="outlined" 
                            fullWidth
                            name='merchantName'
                            value={states.Wallet?.user_name || ''}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            disabled 
                            id="merchantEmail" 
                            label="Merchant Email" 
                            variant="outlined" 
                            fullWidth 
                            name='merchantEmail'
                            value={states.Wallet?.user_email || ''}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField  
                            id="date" 
                            label="Date" 
                            variant="outlined" 
                            fullWidth 
                            name='date'
                            value={states.Wallet?.created_At.split('T')[0] || ''}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            id="time" 
                            label="Time" 
                            variant="outlined" 
                            fullWidth 
                            name='time'
                            value={states.Wallet?.created_At.split('T')[1] || ''}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            id="CryptoName" 
                            label="Crypto" 
                            variant="outlined" 
                            fullWidth 
                            name='Crypto'
                            value={states.Wallet?.crypto_name || ''}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={5} lg={5}>
                        <TextField 
                            type='text' 
                            id="walletAddress" 
                            label="Wallet Address" 
                            variant="outlined" 
                            fullWidth 
                            name='walletAddress'
                            value={states.Wallet?.wallet_address || ''}
                            />
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Select
                            placeholder="Select Status"
                            id="withdrawalStaus" 
                            name="withdrawalStaus"
                            value={status}
                            onChange={(e, newValue)=> {handleUpdateStatus(e, newValue)}}
                            required
                            sx={{ minWidth: 200, height: 55 }}
                            >
                                <Option value="Pending">Pending</Option>
                                <Option value="Approved">Approved</Option>
                                <Option value="Rejected">Rejected</Option>
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
                        {!loadingButton && 
                        <Button 
                            sx={{mx:2}} 
                            variant="contained" 
                            endIcon={<BackupIcon />}
                            onClick={handleUpdateWallet}
                            >
                            Submit
                        </Button>
                        }

                        {loadingButton && 
                            <LoadingButton loading variant="outlined">
                                Submit
                            </LoadingButton>
                        }
                        <Button 
                            sx={{mx:2}} 
                            variant="contained" 
                            endIcon={<CancelIcon color='error'/>}
                            onClick={()=> {navigate('/admin/user/wallets/'); }}
                            >
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
                </Paper>
        </Main>
    );
};