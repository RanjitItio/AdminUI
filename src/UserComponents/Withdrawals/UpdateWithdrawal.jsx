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
import CircularProgress from '@mui/material/CircularProgress';




// Update FIAT withdrawal by admin
export default function UpdateFIATWithdrawals({open}) {
    const location = useLocation();
    const navigate = useNavigate();
    const Withdrawal = location.state?.withdrawal || '';
    const WithdrawalID = Withdrawal?.id || '';


    const [withdrawalDetail, updateWithdrawalDetail]   = useState([]);  // Transaction Data
    const [successMessage, SetSuccessMessage]          = useState('');  // Success message
    const [statusValue, updateStatusValue]             = useState(Withdrawal?.status || '');  // Selected status
    const [disableButton, setDisablebutton]            = useState(false);
    const [error, setError]                            = useState('');  // Error Message
    const [loader, setLoader]                          = useState(true);


    // Get the transaction details from API
    useEffect(() => {
        axiosInstance.post(`/api/v5/admin/fiat/withdrawals/?id=${WithdrawalID}`).then((res)=> {
            // console.log(res.data.withdrawal_data)
          if (res.status === 200) {
              updateWithdrawalDetail(res.data.withdrawal_data[0])
              setLoader(false);
          }

        }).catch((error)=> {
          console.log(error.response)

          if (error.response.status === 401) {
            navigate('/signin/')
          }
        })
      }, []);
    


    // Update Transaction Status
    const handleTransactionStatusUpdate = () => {
        if(statusValue === '') {
            setError('Please select status')

        } else {
            setDisablebutton(true);

            axiosInstance.put(`/api/v5/admin/fiat/withdrawals/`, {
                withdrawal_id: WithdrawalID,
                converted_amount: parseFloat(withdrawalDetail.debit_amount),
                status: statusValue

            }).then((res)=> {
                // console.log(res)
                if (res.status === 200)  {
                    SetSuccessMessage('Transaction Updated Successfully')

                    setTimeout(() => {
                        navigate('/admin/withdrawls/')
                    }, 1000);
                }

            }).catch((error)=> {
                console.log(error)
                setDisablebutton(false);

                if (error.response.data.message === 'User do not have any existing wallet') {
                    setError('user do not have existing wallet')
                } else if (error.response.data.message === 'Do not have sufficient balance in wallet') {
                    setError('Do not have sufficient balance in Wallet');
                } else if (error.response.status === 401) {
                    navigate('/signin/')
                } else if (error.response.data.message === 'Transaction Already Approved can not perform this action') {
                    setError('Transaction already approved can not perform this action again')
                } else {
                    setError('')
                }
            });
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
                    Update User's Withdrawal Request
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
                            value={withdrawalDetail?.user_name || ''}
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
                            value={withdrawalDetail?.user_email || ''}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            type='text' 
                            id="withdrawalAmount" 
                            label="Withdrawal Amount" 
                            variant="outlined" 
                            fullWidth 
                            name='withdrawalAmount'
                            value={`${withdrawalDetail?.withdrawal_amount || ''} ${withdrawalDetail?.withdrawal_currency || ''}`}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            type='text' 
                            id="withdrawalFee" 
                            label="Withdrawal Fee" 
                            variant="outlined" 
                            fullWidth 
                            name='withdrawalFee'
                            value={`${withdrawalDetail.withdrawal_fee ? withdrawalDetail.withdrawal_fee.toFixed(3) : 0} ${withdrawalDetail?.withdrawal_currency || ''}`}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            type='text' 
                            id="totalAmount" 
                            label="Total Amount" 
                            variant="outlined" 
                            fullWidth 
                            name='totalAmount'
                            value={`${withdrawalDetail?.total_amount || ''} ${withdrawalDetail?.withdrawal_currency || ''}`}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            type='text' 
                            id="wallet" 
                            label="From Wallet" 
                            variant="outlined" 
                            fullWidth 
                            name='wallet'
                            value={withdrawalDetail?.wallet_currency || ''}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            type='text' 
                            id="walletBalance" 
                            label="wallet Balance" 
                            variant="outlined" 
                            fullWidth 
                            name='walletBalance'
                            value={withdrawalDetail.wallet_balance  ? withdrawalDetail.wallet_balance.toFixed(3) : 0}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField  
                            id="date" 
                            label="Date" 
                            variant="outlined" 
                            fullWidth 
                            name='date'
                            value={withdrawalDetail?.created_At?.split('T')[0] || ''}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            id="time" 
                            label="Time" 
                            variant="outlined" 
                            fullWidth 
                            name='time'
                            value={withdrawalDetail?.created_At?.split('T')[1] || ''}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            type='text' 
                            id="convertedAmount" 
                            label="Credited Amount" 
                            variant="outlined"
                            fullWidth 
                            name='creditedAmount'
                            value={`${withdrawalDetail.credit_amount ? withdrawalDetail.credit_amount.toFixed(4) : 0} ${withdrawalDetail?.credit_currency || ''}`}
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
                            disabled={disableButton}
                            >
                            Submit
                        </Button>

                        <Button 
                            sx={{mx:2}} 
                            variant="contained" 
                            endIcon={<CancelIcon color='error'/>}
                            onClick={()=> navigate('/admin/withdrawls/')}
                            >
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
                </Paper>
        </Main>
    );
};