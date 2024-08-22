import { Main, DrawerHeader } from '../Content';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Button from '@mui/material/Button';
import BackupIcon from '@mui/icons-material/Backup';
import CancelIcon from '@mui/icons-material/Cancel';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import axiosInstance from '../Authentication/axios';
import { Paper, Typography, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';





// Update Merchant Refund transaction by Admin
export default function UpdateMerchantRefund({open}) {
    const navigate = useNavigate();
    const location = useLocation();
    const states = location?.state || ''

    const [successMessage, setSuccessMessage] = useState('');  // Success Message state
    const [error, setError]                   = useState('');  // Error Message state
    const [status, updateStatus]              = useState(states.merchantRefunds?.status || '');  // Withdrawal status state

    
    // Capture Status value
    const handleUpdateStatus = (e, newValue)=> {
        updateStatus(newValue)
    };

    // Update Status method
    const handleUpdateRefund = ()=> {

        axiosInstance.put(`api/v6/admin/merchant/update/refunds/`, {
            merchant_id:    states.merchantRefunds.merchant_id,
            refund_id:      states.merchantRefunds.id,
            transaction_id: states.merchantRefunds.transaction_id,
            status:         status

        }).then((res)=> {
            // console.log(res)
            if (res.status === 200 && res.data.message === 'Updated Successfully') {
                setSuccessMessage('Updated Successfully')

                setTimeout(() => {
                    navigate('/admin/merchant/refunds/')
                }, 2000);
            };

        }).catch((error)=> {
            console.log(error)
            if (error.response.data.message === 'Can not perform the same action again') {
                setError('Transaction has already been approved, Can not perform this action')
            }
        })
    };

    // If the values are not present
    if (states === '') {
        
        return (
            <Main open={open}>
            <DrawerHeader />
                <p>Please go back and retry</p>
            </Main>
        );
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
                    Update Merchant Refund Requests
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
                            value={states.merchantRefunds?.merchant_name || ''}
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
                            value={states.merchantRefunds?.merchant_email || ''}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            type='text' 
                            id="transactionAmount" 
                            label="Transaction Amount" 
                            variant="outlined" 
                            fullWidth 
                            name='transactionAmount'
                            value={`${states.merchantRefunds?.transaction_amount || ''} ${states.merchantRefunds?.transaction_currency || ''}`.trim()}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            type='text' 
                            id="transactionID" 
                            label="Transaction ID" 
                            variant="outlined" 
                            fullWidth 
                            name='transactionID'
                            value={states.merchantRefunds?.transaction_id || ''}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            type='text'
                            id="refundAmount"
                            label="Refund Amount"
                            variant="outlined"
                            name='refundAmount'
                            fullWidth
                            value={`${states.merchantRefunds?.amount || ''} ${states.merchantRefunds?.currency || ''}`.trim()}
                            />
                    </Grid>

                    {/* <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            type='text' 
                            id="instantRefund" 
                            label="Instant Refund" 
                            variant="outlined" 
                            fullWidth 
                            name='instantRefund'
                            value={states.merchantRefunds.instant_refund ? 'Yes' : 'No'}
                            />
                    </Grid> */}
                    
                    {/* <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            type='text' 
                            id="instantRefundAmount" 
                            label="Instant Refund Amount" 
                            variant="outlined" 
                            fullWidth 
                            name='instantRefundAmount'
                            value={`${states.merchantRefunds?.instant_refund_amount || ''} ${states.merchantRefunds?.transaction_currency || ''}`}
                            />
                    </Grid> */}

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField  
                            id="date" 
                            label="Date" 
                            variant="outlined" 
                            fullWidth 
                            name='date'
                            value={states.merchantRefunds?.createdAt.split('T')[0]}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            id="time" 
                            label="Time" 
                            variant="outlined" 
                            fullWidth 
                            name='time'
                            value={states.merchantRefunds?.createdAt.split('T')[1]}
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
                        <Button 
                            sx={{mx:2}} 
                            variant="contained" 
                            endIcon={<BackupIcon />}
                            onClick={handleUpdateRefund}
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