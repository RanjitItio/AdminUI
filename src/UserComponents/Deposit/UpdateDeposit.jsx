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



// Update Deposit Transactions
export default function UpdateDepositTransaction({open}) {

    const location = useLocation();
    const navigate = useNavigate();
    const Transaction    = location.state.transactionID 
    const TransactionID = parseInt(Transaction.id)

    const [transactionDetail, updateTransactionDetail] = useState([]);  // Transaction Data
    const [successMessage, SetSuccessMessage]          = useState('');  // Success message
    const [statusValue, updateStatusValue]             = useState(Transaction?.status || '');  // Selected status
    const [disableButton, setDisablebutton]            = useState(false);
    const [error, setError]                            = useState('');  // Error Message
    const [loader, setLoader]                          = useState(true);
    

    // Get the transaction details from API
    useEffect(() => {
        axiosInstance.get(`api/v2/admin/deposit/transaction/detail/${TransactionID}/`).then((res)=> {
          if (res.status === 200) {
              updateTransactionDetail(res.data.deposite_data[0])
              setLoader(false);
          }

        }).catch((error)=> {
          console.log(error.response)

        })
      }, []);
    


    // Update Transaction Status
    const handleTransactionStatusUpdate = () => {
        if(statusValue === '') {
            setError('Please select status')
        } else {
            setDisablebutton(true);

            axiosInstance.put(`/api/v4/admin/update/deposit/transaction/`, {
                status: statusValue,
                transaction_id: TransactionID
    
            }).then((res)=> {
                // console.log(res)
                if (res.status === 200)  {
                    SetSuccessMessage('Transaction Updated Successfully')
    
                    setTimeout(() => {
                        navigate('/admin/deposits/')
                    }, 1000);
                }
    
            }).catch((error)=> {
                console.log(error)
    
                if (error.response.data.message === 'Requested transaction not available') {
                    setError('Invalid Transaction')
                    setDisablebutton(false);
                } else if (error.response.data.message === 'Transaction is completed') {
                    setError('Transaction has been completed Can not re-perform this action');
                    setDisablebutton(false);
                } else if (error.response.data.message === 'Sender donot have a selected wallet') {
                    setError('Selected wallet not available');
                    setDisablebutton(false);
                } else if (error.response.data.message === 'Error calling external API') {
                    alert('Currency Conversion API Failed');
                    setDisablebutton(false);
                } else if (error.response.data.message === 'Currency API Error') {
                    alert('Currency Conversion API Failed');
                    setDisablebutton(false);
                } else if (error.response.data.message === 'Invalid Curency Converter API response') {
                    alert('Currency Conversion API Failed');
                    setDisablebutton(false);
                } else {
                    setError('');
                    setDisablebutton(false);
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
                    Update User Deposit
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
                            value={transactionDetail?.user_name || ''}
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
                            value={transactionDetail?.user_email || ''}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            type='text' 
                            id="depositAmount" 
                            label="Deposite Amount" 
                            variant="outlined" 
                            fullWidth 
                            name='depositeAmount'
                            value={`${transactionDetail?.amount || ''} ${transactionDetail?.transaction_currency || ''}`}
                            />
                    </Grid>
                   
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            type='text' 
                            id="transactionFee" 
                            label="Transaction Fee" 
                            variant="outlined" 
                            fullWidth 
                            name='transactionFee'
                            value={`${transactionDetail?.transaction_fee || ''} ${transactionDetail?.transaction_currency || ''}`}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            type='text' 
                            id="payoutAmount" 
                            label="Total Amount" 
                            variant="outlined" 
                            fullWidth 
                            name='payoutAmount'
                            value={`${transactionDetail?.payout_amount || ''} ${transactionDetail?.transaction_currency || ''}`}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            type='text' 
                            id="paymentMode" 
                            label="Payment Mode" 
                            variant="outlined" 
                            fullWidth 
                            name='paymentMode'
                            value={transactionDetail?.payment_mode || ''}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField  
                            id="date" 
                            label="Date" 
                            variant="outlined" 
                            fullWidth 
                            name='date'
                            value={transactionDetail?.created_At?.split('T')[0] || ''}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            id="time" 
                            label="Time" 
                            variant="outlined" 
                            fullWidth 
                            name='time'
                            value={transactionDetail?.created_At?.split('T')[1] || ''}
                            />
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            type='text' 
                            id="convertedAmount" 
                            label="Converted Amount" 
                            variant="outlined"
                            fullWidth 
                            name='convertedAmount'
                            value={`${transactionDetail?.converted_amount || ''} ${transactionDetail?.converted_currency || ''}`}
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