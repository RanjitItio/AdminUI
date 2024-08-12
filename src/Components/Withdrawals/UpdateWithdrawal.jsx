import TextField from '@mui/material/TextField';
import { Paper, Typography, Grid } from '@mui/material';
import { Main, DrawerHeader } from '../Content';
import { useState } from 'react';
import Button from '@mui/material/Button';
import BackupIcon from '@mui/icons-material/Backup';
import CancelIcon from '@mui/icons-material/Cancel';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';




// Update Withdrawal status
export default function UpdateMerchantWithdrawals({open}) {
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError]                   = useState('');


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
                    Update Merchant Withdrawal Request
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
                            // value={formData.transactionID}
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
                            // value={formData.merchantName}
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
                            // value={formData.amount}
                            // onChange={handleChange}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        
                        <Select
                                placeholder="Select Currency"
                                id="currency" 
                                name="currency"
                                // defaultValue={formData?.currency || ''}
                                // onChange={(e, newValue)=> {handleCurrencyChange(e, newValue)}}
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
                                // defaultValue={formData?.paymentMode || ''}
                                // onChange={(e, newValue)=> {handlePaymentModeChange(e, newValue)}}
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
                            // value={formData.dateTime}
                            // onChange={handleChange}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            id="merchantOrderId" 
                            label="merchant Order ID" 
                            variant="outlined" 
                            fullWidth 
                            name='merchantOrderID'
                            // value={formData.merchantOrderID}
                            // onChange={handleChange}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            id="merchantRedirectUrl" 
                            label="Merchant Redirect URL" 
                            variant="outlined" 
                            fullWidth
                            name='merchantRedirectURL'
                            // value={formData.merchantRedirectURL}
                            // onChange={handleChange}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            id="merchantWebhookUrl" 
                            label="Merchant Webhook URL" 
                            variant="outlined" 
                            fullWidth 
                            name='merchantCallbackURL'
                            // value={formData.merchantCallbackURL}
                            // onChange={handleChange}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField 
                            id="merchantMobileNumber" 
                            label="Merchant Mobile Number" 
                            variant="outlined" 
                            fullWidth 
                            name='merchantMobileNumber'
                            // value={formData.merchantMobileNumber}
                            // onChange={handleChange}
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
                            // value={formData.merchantPaymentType}
                            // onChange={handleChange}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Select
                            placeholder="Select Payment Status"
                            id="paymentStaus" 
                            name="status"
                            // defaultValue={formData?.status || ''}
                            // onChange={(e, newValue)=> {handlePaymentStatusChange(e, newValue)}}
                            required
                            sx={{ minWidth: 200, height: 55 }}
                            >
                                <Option value="PAYMENT_INITIATED">PAYMENT INITIATE</Option>
                                <Option value="PAYMENT_PENDING">PAYMENT PENDING</Option>
                                <Option value="PAYMENT_FAILED">PAYMENT FAILED</Option>
                                <Option value="PAYMENT_SUCCESS">PAYMENT SUCCESS</Option>
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
                            // onClick={handleSubmit}
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