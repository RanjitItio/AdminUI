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





// Update Transfer Transaction by Admin
export default function UpdateTransferTransaction({open}) {
    const location = useLocation();
    const navigate = useNavigate();

    const Transaction     = location.state?.transactionID 
    const transactionData  = Transaction?.transaction || '';
    const TransactionID    = parseInt(transactionData.id)


    const [transactionDetail, updateTransactionDetail] = useState([]);    // Transaction Detail
    const [statusValue, updateStatusValue]             = useState(transactionData?.status || '');   // Selectd status value
    const [successMessage, SetSuccessMessage]          = useState('');   // Success Message
    const [loader, setLoader]                          = useState(true); 
    const [disableButton, setDisablebutton]            = useState(false); // Diable Button
    const [error, setError]                            = useState('');    // Error Message


    // Get the transaction details from API
    useEffect(() => {
        axiosInstance.get(`/api/v2/admin/transfer/transaction/details/${TransactionID}/`).then((res)=> {
          if (res.status === 200) {
            // console.log(res)
            updateTransactionDetail(res.data.transfer_transaction_data[0])
            setLoader(false);
          }

        }).catch((error)=> {
          console.log(error.response)

          if (error.data.response.message === 'Transaction does not exist') {
             setError('Transaction Not Found')
          } else if (error.data.response.message == 'Currency is not available') {
            setError('Invalid Currency')
          } else if (error.data.response.message == 'Receiver currency not found') {
            setError('Invalid Receiver Currency')
          } else if (error.data.response.message == 'Error calling external API') {
            setError('Currency Conversion API Failed')
          } else if (error.data.response.message == 'Currency API Error') {
            setError('Currency Conversion API Failed')
          } else if (error.data.response.message == 'Invalid Curency Converter API response') {
            setError('Currency Conversion API Failed')
          } else {
            setError('')
          }

        })
      }, []);


      // Update Transaction Satatus
      const handleTransactionStatusUpdate = () => {
        setDisablebutton(true);

        axiosInstance.put(`/api/v4/update/transfer/transactions/`, {
            status:         statusValue,
            transaction_id: TransactionID

        }).then((res)=> {
            // console.log(res)
            if (res.status === 200) {
                SetSuccessMessage('Transaction updated Successfully')
                setDisablebutton(false);
                
                setTimeout(() => {
                    navigate('/admin/transfers/');
                }, 1000);
            };

        }).catch((error)=> {
            // console.log(error)
            setDisablebutton(false);

            if (error.response.data.msg === 'Sender donot have sufficient balance in wallet'){
              setError('Donot have sufficient wallet in Sender account')
            } else if (error.response.data.message === 'Did not found recipient Details') {
                setError('Invalid Receipinet')
            } else if (error.response.data.message === 'Transaction has been completed') {
                setError('Transaction has been completed, Can not perform this action')
            } else if (error.response.data.message === 'Sender donot have a wallet') {
                setError('Sender donot have wallet')
            } else if (error.response.data.message === 'Sender do not have sufficient wallet balance') {
                setError('Insufficient balance in sender wallet')
            } else if (error.response.data.message === 'Error calling external API') {
                setError('Currency Conversion API Failed')
            } else if (error.response.data.message === 'Currency API Error') {
                setError('Currency Conversion API Failed')
            } else if (error.response.data.message === 'Invalid Curency Converter API response') {
                setError('Currency Conversion API Failed')
            } else {
                setError('')
            };
        })
    };


    // Get selected status
    const handleUpdateStatusValue = (e, newValue) => {
        updateStatusValue(newValue)
    };

    // Until data has not fetched
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
                    Update User Transfer
                </Typography>

                <Grid container spacing={1} sx={{mb:2}}>
                    <Grid item xs={12}>
                        <Typography 
                            variant="p" 
                            sx={{
                                fontSize: {
                                xs: '0,9rem',  // For extra-small screens
                                sm: '1.1rem',    // For small screens
                                md: '1.2rem',  // For medium screens
                                }
                            }}
                            >
                            Transaction Details
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            disabled 
                            id="transactionID" 
                            label="Transaction ID" 
                            variant="outlined" 
                            fullWidth
                            name='transactionID'
                            value={transactionDetail?.transaction_id || ''}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            disabled 
                            id="date" 
                            label="Date" 
                            variant="outlined" 
                            fullWidth
                            name='date'
                            value={transactionDetail?.transaction_date?.split('T')[0] || ''}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            disabled 
                            id="time" 
                            label="Time" 
                            variant="outlined" 
                            fullWidth
                            name='time'
                            value={transactionDetail?.transaction_date?.split('T')[1] || ''}
                            />
                    </Grid>

                </Grid>
                <Grid container spacing={2} sx={{mb:2}}>
                    <Grid item xs={12}>
                        <Typography 
                            variant="p" 
                            sx={{
                                fontSize: {
                                xs: '0,9rem',  
                                sm: '1.1rem',   
                                md: '1.2rem',
                                }
                            }}
                            >
                            Sender Details
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            disabled 
                            id="sender" 
                            label="Sender" 
                            variant="outlined" 
                            fullWidth
                            name='sender'
                            value={transactionDetail?.sender?.email || ''}
                            />
                    </Grid>

                    {/* <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            disabled 
                            id="paymentMode" 
                            label="Payment Mode" 
                            variant="outlined" 
                            fullWidth 
                            name='paymentMode'
                            value={transactionDetail?.sender_payment_mode || ''}
                            />
                    </Grid> */}

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            type='text' 
                            id="amount" 
                            label="Amount" 
                            variant="outlined" 
                            fullWidth 
                            name='amount'
                            value={`${transactionDetail?.send_amount || ''} ${transactionDetail?.sender_currency?.name || ''}`}
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
                            value={`${transactionData?.transaction_fee.toFixed(2) || ''} ${transactionDetail?.sender_currency?.name || ''}`}
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
                            value={`${transactionDetail?.payout_amount || ''} ${transactionDetail?.sender_currency?.name || ''}`}
                            />
                    </Grid>
                </Grid>


                <Grid container spacing={2}>

                    <Grid item xs={12}>
                        <Typography 
                            variant="p" 
                            sx={{
                                fontSize: {
                                xs: '0,9rem', 
                                sm: '1.1rem',   
                                md: '1.2rem',
                                }
                            }}
                            >
                            Receiver Details
                        </Typography>
                    </Grid>

                    {transactionDetail.receiver_details && (
                        <>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <TextField 
                                type='text' 
                                id="receiverName" 
                                label="Receiver Name" 
                                variant="outlined" 
                                fullWidth 
                                name='receiverName'
                                value={transactionDetail?.receiver_details?.full_name || ''}
                                />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <TextField  
                                id="receiverEmail" 
                                label="Receiver Email" 
                                variant="outlined" 
                                fullWidth 
                                name='receiverEmail'
                                value={transactionDetail?.receiver_details?.email || ''}
                                />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <TextField 
                                id="paymentMode" 
                                label="Payment Mode" 
                                variant="outlined" 
                                fullWidth 
                                name='paymentMode'
                                value={transactionDetail?.receiver_details?.pay_mode || ''}
                                />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <TextField 
                                type='text' 
                                id="amountReceive" 
                                label="Amount Receive" 
                                variant="outlined"
                                fullWidth 
                                name='amountReceive'
                                value={`${transactionDetail?.receiver_details?.received_amount || ''} ${transactionDetail?.receiver_details?.currency || ''}`}
                                />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <TextField 
                                type='text' 
                                id="bank" 
                                label="bank" 
                                variant="outlined"
                                fullWidth 
                                name='bank'
                                value={transactionDetail?.receiver_details?.bank_name || ''}
                                />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <TextField 
                                type='text' 
                                id="accountNumber" 
                                label="Account Number" 
                                variant="outlined"
                                fullWidth 
                                name='accountNumber'
                                value={transactionDetail?.receiver_details?.acc_no}
                                />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <TextField 
                                type='text' 
                                id="ifscCode" 
                                label="IFSC Code" 
                                variant="outlined"
                                fullWidth 
                                name='ifscCode'
                                value={transactionDetail?.receiver_details?.ifsc_code}
                                />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <TextField 
                                type='text' 
                                id="additionalInfo" 
                                label="Additional Info" 
                                variant="outlined"
                                fullWidth 
                                name='additionalInfo'
                                value={transactionDetail?.receiver_details?.additional_info || ''}
                                />
                        </Grid>
                    </>
                    )}

                    {transactionDetail.receiver && (
                        <>
                           <Grid item xs={12} sm={6} md={4} lg={3}>
                            <TextField 
                                type='text' 
                                id="receiverName" 
                                label="Receiver Name" 
                                variant="outlined" 
                                fullWidth 
                                name='receiverName'
                                value={`${transactionDetail?.receiver?.first_name || ''} ${transactionDetail?.receiver?.last_name || ''}`}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <TextField  
                                    id="receiverEmail" 
                                    label="Receiver Email" 
                                    variant="outlined" 
                                    fullWidth 
                                    name='receiverEmail'
                                    value={transactionDetail?.receiver?.email || ''}
                                    />
                            </Grid>

                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <TextField 
                                    id="paymentMode" 
                                    label="Payment Mode" 
                                    variant="outlined" 
                                    fullWidth 
                                    name='paymentMode'
                                    value={transactionDetail?.receiver_payment_mode || ''}
                                    />
                            </Grid>

                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <TextField 
                                    type='text' 
                                    id="amountReceive" 
                                    label="Amount Receive" 
                                    variant="outlined"
                                    fullWidth 
                                    name='amountReceive'
                                    value={`${transactionDetail?.receiver_amount || ''} ${transactionDetail?.receiver_curreny || ''}`}
                                    />
                            </Grid>
                        </>
                    )}


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
                    </Grid>

                    <Grid item>
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


