import TextField from '@mui/material/TextField';
import { Paper, Typography, Grid } from '@mui/material';
import { Main, DrawerHeader } from '../Content';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import Button from '@mui/material/Button';
import BackupIcon from '@mui/icons-material/Backup';
import CancelIcon from '@mui/icons-material/Cancel';
import {TextareaAutosize as BaseTextareaAutosize} from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import axiosInstance from '../Authentication/axios';
import { useNavigate } from 'react-router-dom';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
// import MenuItem from '@mui/material';



const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };

  const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };

  const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    box-sizing: border-box;
    width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      outline: 0;
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
  );

// Update Transaction Data
export default function MerchantPGTransactionUpdate({open}) {
    // Fetch the data from previous page
    const location = useLocation();
    const states = location?.state || ''
    const transactionData = states?.tranaction || ''
    const merchantID = transactionData.merchant.merchant_id
    const modeState  = states?.mode || ''


    const navigate = useNavigate();


    const initialFormData = {
        transactionID:        transactionData?.transaction_id || '',
        merchantName:         transactionData?.merchant?.merchant_name || '',
        amount:               transactionData?.amount || '',
        currency:             transactionData?.currency || '',
        paymentMode:          transactionData?.payment_mode || '',
        dateTime:             transactionData?.createdAt || '',
        merchantOrderID:      transactionData?.merchantOrderId || '',
        merchantRedirectURL:  transactionData?.merchantRedirectURl || '',
        merchantCallbackURL:  transactionData?.merchantCallBackURL || '',
        merchantMobileNumber: transactionData?.merchantMobileNumber || '',
        merchantPaymentType:  transactionData?.merchantPaymentType   || '',
        status:               transactionData?.status || '',
        gatewayLog:           transactionData?.gatewayRes || ''
    };

    const [formData, updateFormData]           = useState(initialFormData); // All form data
    const [error, setError]                    = useState('');                     // Error Message
    const [successMessage, setSuccessMessage]  = useState('');                        // Success message
    const [paymentStatus, updatePaymentStatus] = useState(formData?.status || '');       // Payment Status
    const [paymemtMode, updatePaymentMode]     = useState(formData?.paymentMode || '');   // Payment Mode
    const [currency, setCurrency]              = useState(formData.currency || '');      // Currency State



    // Method to capture form values
    const handleChange = (e) => {
        const { name, value } = e.target;
        updateFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    // Method to handle Payment status value
    const handlePaymentStatusChange = (e, newValue)=> {
        updatePaymentStatus(newValue)
    };

    // Method to handle Payment Mode value
    const handlePaymentModeChange = (e, newValue)=> {
        updatePaymentMode(newValue)
    };

    // Method to handle Payment Mode value
    const handleCurrencyChange = (e, newValue)=> {
        setCurrency(newValue)
    };


    // Method to handle Cancel Button click
    const handleCancelButton = ()=> {
        navigate('/admin/all-transaction/')
    };


    // Method to Submit the data to API
    const handleSubmit = ()=> {
        if(modeState === 'Production Mode') {
            SubmitFormData();
        } else {
            setError('Can not edit Sandbox Transactions')
        }
    };

    // Submit data to API
    const SubmitFormData = ()=> {
        if (formData.transactionID === '') {
            setError('Please provide transaction ID')
        } else if (!merchantID) {
            setError('Please provide merchant ID')
        } else if (formData.amount === '') {
            setError('Please provide amount')
        } else if (currency === '') {
            setError('Please provide Currency')
        }  
        else if (formData.merchantRedirectURL === '') {
            setError('Please provide Merchant redirect url')
        } else if (formData.merchantCallbackURL === '') {
            setError('Please provide Merchant Webhook url')
        } else if (formData.merchantPaymentType === '') {
            setError('Please provide Merchant payment type')
        } else if (paymentStatus === '') {
            setError('Please provide Merchant payment status')
        } else {
            setError('')

            axiosInstance.put(`api/admin/merchant/pg/transaction/update/`, {
                transaction_id: formData.transactionID,
                merchant_id:    merchantID,
                amount:         parseInt(formData.amount),
                currency:       currency,
                payment_mode:   paymemtMode,
                redirect_url:   formData.merchantRedirectURL,
                webhook_url:    formData.merchantCallbackURL,
                mobile_number:  formData.merchantMobileNumber,
                payment_type:   formData.merchantPaymentType,
                status:         paymentStatus

            }).then((res)=> {
                // console.log(res)

                if (res.status === 200 && res.data.success === true) {
                    setSuccessMessage('Updated Successfully')

                    setTimeout(() => {
                        navigate('/admin/all-transaction/')
                    }, 1000);
                };
            }).catch((error)=> {
                console.log(error)
    
            })
        }
    };

    console.log(formData.status)

    return (
        <Main open={open}>
            <DrawerHeader />

            <Paper
                elevation={3}
                sx={{
                    padding: 3,
                    marginTop: 1,
                    borderRadius: 2,
                    '&:hover': {
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                    },
                }}
                >
                <Typography variant="h5" gutterBottom sx={{mb:3}}>
                    Update Merchant Transaction
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            disabled 
                            id="transactionID" 
                            label="Transaction ID" 
                            variant="outlined" 
                            fullWidth
                            name='transactionID'
                            value={formData.transactionID}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            disabled 
                            id="merchant" 
                            label="Merchant Name" 
                            variant="outlined" 
                            fullWidth 
                            name='merchantName'
                            value={formData.merchantName}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            type='number' 
                            id="amount" 
                            label="Amount" 
                            variant="outlined" 
                            fullWidth 
                            name='amount'
                            value={formData.amount}
                            onChange={handleChange}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        {/* <TextField 
                            id="currency" 
                            label="Currency" 
                            variant="outlined" 
                            fullWidth 
                            name='currency'
                            value={formData.currency}
                            onChange={handleChange}
                            /> */}
                        <Select
                                placeholder="Select Currency"
                                id="currency" 
                                name="currency"
                                defaultValue={formData?.currency || ''}
                                onChange={(e, newValue)=> {handleCurrencyChange(e, newValue)}}
                                required
                                sx={{ minWidth: 200, height: 55 }}
                            >
                                <Option value="USD">USD</Option>
                                <Option value="INR">INR</Option>
                                <Option value="GBP">GBP</Option>
                                <Option value="EUR">EUR</Option>
                        </Select>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Select
                                placeholder="Select Payment Mode"
                                id="paymentMode" 
                                name="paymentMode"
                                defaultValue={formData?.paymentMode || ''}
                                onChange={(e, newValue)=> {handlePaymentModeChange(e, newValue)}}
                                required
                                sx={{ minWidth: 200, height: 55 }}
                            >
                                <Option value="UPI">UPI</Option>
                                <Option value="Card">Card</Option>
                                <Option value="Net Banking">Net Banking</Option>
                                <Option value="Wallet">Wallet</Option>
                        </Select>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            disabled 
                            id="dateTime" 
                            label="Date and Time" 
                            variant="outlined" 
                            fullWidth 
                            name='dateTime'
                            value={formData.dateTime}
                            onChange={handleChange}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            id="merchantOrderId" 
                            label="merchant Order ID" 
                            variant="outlined" 
                            fullWidth 
                            name='merchantOrderID'
                            value={formData.merchantOrderID}
                            onChange={handleChange}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            id="merchantRedirectUrl" 
                            label="Merchant Redirect URL" 
                            variant="outlined" 
                            fullWidth
                            name='merchantRedirectURL'
                            value={formData.merchantRedirectURL}
                            onChange={handleChange}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            id="merchantWebhookUrl" 
                            label="Merchant Webhook URL" 
                            variant="outlined" 
                            fullWidth 
                            name='merchantCallbackURL'
                            value={formData.merchantCallbackURL}
                            onChange={handleChange}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            id="merchantMobileNumber" 
                            label="Merchant Mobile Number" 
                            variant="outlined" 
                            fullWidth 
                            name='merchantMobileNumber'
                            value={formData.merchantMobileNumber}
                            onChange={handleChange}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            id="merchantPaymentType" 
                            label="Mercnant payment Type(PAY_PAGE/S2S)" 
                            variant="outlined" 
                            fullWidth 
                            name='merchantPaymentType'
                            disabled
                            value={formData.merchantPaymentType}
                            onChange={handleChange}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Select
                            placeholder="Select Payment Status"
                            id="paymentStaus" 
                            name="status"
                            defaultValue={formData?.status || ''}
                            onChange={(e, newValue)=> {handlePaymentStatusChange(e, newValue)}}
                            required
                            sx={{ minWidth: 200, height: 55 }}
                            >
                                <Option value="PAYMENT_INITIATED">PAYMENT INITIATE</Option>
                                <Option value="PAYMENT_PENDING">PAYMENT PENDING</Option>
                                <Option value="PAYMENT_FAILED">PAYMENT FAILED</Option>
                                <Option value="PAYMENT_SUCCESS">PAYMENT SUCCESS</Option>
                        </Select>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <FormControl>
                            <FormLabel>Gateway Logs</FormLabel>
                            <Textarea 
                                aria-label="empty textarea" 
                                placeholder="Empty" 
                                maxRows={9} 
                                name='gatewayLog'
                                value={formData?.gatewayLog ? JSON.stringify(formData.gatewayLog, null, 2) : ''}
                                onChange={handleChange}
                                sx={{ 
                                    width: '100%', 
                                    overflow:'scroll',
                                    whiteSpace: 'pre-wrap',
                                    wordWrap: 'break-word'
                                    }}
                            />
                            <FormHelperText>Gateway webhook response</FormHelperText>
                        </FormControl>
                        
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
                            onClick={handleSubmit}
                            >
                            Submit
                        </Button>

                        <Button 
                            sx={{mx:2}} 
                            variant="contained" 
                            endIcon={<CancelIcon color='error'/>}
                            onClick={handleCancelButton}
                            >
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
                </Paper>
        </Main>

    );
};