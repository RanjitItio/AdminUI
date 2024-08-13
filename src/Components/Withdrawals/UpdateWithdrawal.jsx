import TextField from '@mui/material/TextField';
import { Paper, Typography, Grid } from '@mui/material';
import { Main, DrawerHeader } from '../Content';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import BackupIcon from '@mui/icons-material/Backup';
import CancelIcon from '@mui/icons-material/Cancel';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import axiosInstance from '../Authentication/axios';
import { useLocation, useNavigate } from 'react-router-dom';




// Update Withdrawal status
export default function UpdateMerchantWithdrawals({open}) {
    const navigate = useNavigate();
    const location = useLocation();
    const states = location?.state

    const [successMessage, setSuccessMessage] = useState('');  // Success Message state
    const [error, setError]                   = useState('');  // Error Message state
    const [status, updateStatus]              = useState(states.withdrawal?.status || '');  // Withdrawal status state


    // Capture Status value
    const handleUpdateStatus = (e, newValue)=> {
        updateStatus(newValue)
    };

    // Update Status method
    const handleUpdateWithdrawal = ()=> {

        axiosInstance.put(`api/v4/admin/merchant/withdrawal/update/`, {
            status: status,
            withdrawal_id: states.withdrawal.id

        }).then((res)=> {
            // console.log(res)
            if (res.status === 200 && res.data.message === 'Updated Successfully') {
                setSuccessMessage('Updated Successfully')

                setTimeout(() => {
                    navigate('/admin/merchant/withdrawals/')
                }, 2000);
            };

        }).catch((error)=> {
            // console.log(error)
            if (error.response.data.message === 'No Withdrawal request found with given information') {
                setError('No withdrawal request found')
            } else if (error.response.data.message == 'Insufficient balance to withdrawal') {
                setError('Insuficient funds in Account')
            } else if (error.response.data.error === 'Server Error') {
                setError('Unknow error occured, Please retry after sometime')
            };

        })
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
                    Update Merchant Withdrawal Request
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
                            value={states.withdrawal?.merchant_name || ''}
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
                            value={states.withdrawal?.merchant_email || ''}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            type='number' 
                            id="withdrawalAmount" 
                            label="Withdrawal Amount" 
                            variant="outlined" 
                            fullWidth 
                            name='withdrawalAmount'
                            value={states.withdrawal?.withdrawalAmount || ''}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            type='text' 
                            id="withdrawalCurrency" 
                            label="Withdrawal Currency" 
                            variant="outlined" 
                            fullWidth 
                            name='withdrawalCurrency'
                            value={states.withdrawal?.withdrawalCurrency || ''}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            type='text' 
                            id="depositBank" 
                            label="Deposit Bank" 
                            variant="outlined" 
                            fullWidth 
                            name='depositBank'
                            value={states.withdrawal?.bank_account || ''}
                            />
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            type='text' 
                            id="bankCurrency" 
                            label="Bank Currency" 
                            variant="outlined" 
                            fullWidth 
                            name='bankCurrency'
                            value={states.withdrawal?.bankCurrency || ''}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField  
                            id="date" 
                            label="Date" 
                            variant="outlined" 
                            fullWidth 
                            name='date'
                            value={states.withdrawal?.createdAt.split('T')[0]}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            id="time" 
                            label="Time" 
                            variant="outlined" 
                            fullWidth 
                            name='time'
                            value={states.withdrawal?.createdAt.split('T')[1]}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            id="merchantAccountBalance" 
                            label="merchant Account Balance" 
                            variant="outlined" 
                            fullWidth 
                            name='merchantAccountBalance'
                            value={`${states.withdrawal?.account_balance || ''} ${states.withdrawal?.account_currency || ''}`} 
                            />
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Select
                            placeholder="Select Status"
                            id="withdrawalStaus" 
                            name="withdrawalStaus"
                            // defaultValue={states.withdrawal?.status || ''}
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
                        <Button 
                            sx={{mx:2}} 
                            variant="contained" 
                            endIcon={<BackupIcon />}
                            onClick={handleUpdateWithdrawal}
                            >
                            Submit
                        </Button>

                        <Button 
                            sx={{mx:2}} 
                            variant="contained" 
                            endIcon={<CancelIcon color='error'/>}
                            // onClick={handleCancelButton}
                            >
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
                </Paper>
        </Main>
    );
};