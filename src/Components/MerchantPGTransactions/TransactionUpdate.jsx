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
    const location = useLocation();
    const states = location?.state || ''
    const transactionData = states?.tranaction || ''

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

    const [formData, updateFormData] = useState(initialFormData);

    // Method to capture form values
    const handleChange = (e)=> {
        updateFormData({...formData,
        [e.target.name]: e.target.value
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
                        <TextField 
                            id="currency" 
                            label="Currency" 
                            variant="outlined" 
                            fullWidth 
                            name='currency'
                            value={formData.currency}
                            onChange={handleChange}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            id="paymentMode" 
                            label="Payment Mode" 
                            variant="outlined" 
                            fullWidth
                            name='paymentMode'
                            value={formData.paymentMode}
                            onChange={handleChange} 
                            />
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
                            value={formData.merchantPaymentType}
                            onChange={handleChange}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            id="paymentStaus" 
                            label="Payemnt Status" 
                            variant="outlined"  
                            name='status'
                            value={formData.status}
                            onChange={handleChange}
                            />
                    </Grid>

                    <Grid item xs={12} sm={12}>
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
                    </Grid>
                </Grid>

                <Grid container justifyContent="center" sx={{ mt: 3 }} spacing={2}>
                    <Grid item>
                        <Button sx={{mx:2}} variant="contained" endIcon={<BackupIcon />}>
                            Submit
                        </Button>

                        <Button sx={{mx:2}} variant="contained" endIcon={<CancelIcon color='error'/>}>
                            Cancel
                        </Button>
                    </Grid>
                </Grid>

                </Paper>
        </Main>

    );
};