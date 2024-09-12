import { Main, DrawerHeader } from '../../Content';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Box, Paper, Grid, Button, FormControl, 
        InputLabel, Select, MenuItem } from '@mui/material';
import axiosInstance from '../../Authentication/axios';




//Access Each bank account details of user 
export default function MerchantBankDetail({ open }) {

    const initialFormData = {
        status: 'Success'
    }

    const location    = useLocation();
    const navigate    = useNavigate();
    const BankDetails = location.state?.accountDetails || '';

   
    const [successMessage, setSuccessMessage]  = useState('');
    const [status, setStatus]                  = useState('');
    const [error, setError]                    = useState('');
    
   

    const handleStatusChange = (event)=> {
        const value = event.target.value
        setStatus(value)
    }

    // Method to update bank account status update
    const handleBankAccounrStatusUpdate = () => {
        axiosInstance.put(`api/v3/admin/merchant/bank/update/`, {
            status: status,
            user_id: BankDetails.user?.user_id,
            mrc_bnk_id: BankDetails.account?.id

        }).then((res)=> {
            console.log(res)
            if (res.status === 200) {
                setSuccessMessage("Bank Account Updated Successfully")
            }
            else {
                setError('Some error Occured')
            }  

        }).catch((error)=> {
            console.log(error)

        }) 
    };


    
    return (
        <>
        <Main open={open}>
            <DrawerHeader />

            {/* Header Section */}
            <Paper elevation={3} className="d-flex justify-content-between align-items-center mb-3 p-3" 
                sx={{ borderRadius: '10px', padding: '20px', backgroundColor: '#f5f5f5', boxShadow: '0px 5px 15px rgba(0,0,0,0.1)' }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                    Bank Account Details
                </Typography>
                <Typography variant="h5" component="h2" sx={{ color: BankDetails.account?.is_active ? 'green' : 'red' }}>
                    Status: {BankDetails.account?.is_active ? 'Approved' : 'Not Approved'}
                </Typography>
            </Paper>

            {/* Main Content */}
            <Paper elevation={3} className='p-3 bg-light' sx={{ borderRadius: '10px', padding: '20px', backgroundColor: '#ffffff', boxShadow: '0px 5px 20px rgba(0,0,0,0.1)' }}>
                <Grid container spacing={4}>
                    {/* User Details */}
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#424242' }}>User Details</Typography>
                        <hr />
                        <Typography variant="body1" sx={{ marginBottom: '10px', color: '#616161' }}>User Name: {BankDetails.user?.user_name}</Typography>
                        <Typography variant="body1" sx={{ marginBottom: '10px', color: '#616161' }}>User Email: {BankDetails.user?.user_email}</Typography>
                    </Grid>

                    {/* Account Details */}
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#424242' }}>Account Details</Typography>
                        <hr />
                        <Typography variant="body1" sx={{ marginBottom: '10px', color: '#616161' }}><b>Account Holder Name:</b> {BankDetails.account?.acc_holder_name}</Typography>
                        <Typography variant="body1" sx={{ marginBottom: '10px', color: '#616161' }}><b>Account Holder Address:</b> {BankDetails.account?.acc_hold_add}</Typography>
                        <Typography variant="body1" sx={{ marginBottom: '10px', color: '#616161' }}><b>Bank Name:</b> {BankDetails.account?.bank_name}</Typography>
                        <Typography variant="body1" sx={{ marginBottom: '10px', color: '#616161' }}><b>Account Number: </b>{BankDetails.account?.acc_no}</Typography>
                        <Typography variant="body1" sx={{ marginBottom: '10px', color: '#616161' }}><b>IFSC Code: </b>{BankDetails.account?.ifsc_code}</Typography>
                        <Typography variant="body1" sx={{ marginBottom: '10px', color: '#616161' }}><b>Bank Address: </b>{BankDetails.account?.bank_add}</Typography>
                        <Typography variant="body1" sx={{ marginBottom: '10px', color: '#616161' }}><b>Currency: </b>{BankDetails.account?.currency}</Typography>
                        <Typography variant="body1" sx={{ marginBottom: '10px', color: '#616161' }}><b>Short Code: </b>{BankDetails.account?.short_code}</Typography>
                        <Typography variant="body1" sx={{ marginBottom: '10px', color: '#1976d2' }}>
                            <b>Document:</b> <a href={BankDetails.account?.doc} target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', textDecoration: 'none' }}>
                                View Document
                            </a>
                        </Typography>
                    </Grid>

                    {/* Change Status Section */}
                    <Grid item xs={12} sx={{ marginTop: '20px' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#424242' }}>Change Status</Typography>
                        <FormControl sx={{ width: '30%', marginBottom: '20px' }}>
                            <InputLabel id="status-select-label">Status</InputLabel>
                            <Select
                                labelId="status-select-label"
                                id="status-select"
                                value={status}
                                label="Status"
                                onChange={handleStatusChange}
                            >
                                <MenuItem value="Approve">Approve</MenuItem>
                                <MenuItem value="Reject">Reject</MenuItem>
                            </Select>
                        </FormControl> 
                        
                        <Button 
                            sx={{
                                mx: 2, 
                                mt: 1, 
                                padding: '10px 20px', 
                                backgroundColor: '#1976d2',
                                '&:hover': {
                                    backgroundColor: '#1565c0'
                                }
                            }} 
                            variant="contained" 
                            onClick={handleBankAccounrStatusUpdate}
                        >
                            Update
                        </Button>
                        {successMessage && <Typography variant="body1" sx={{ color: 'green', marginTop: '10px' }}>{successMessage}</Typography>}
                    </Grid>
                </Grid>
            </Paper>
        </Main>

        </>
    )
};




{/* <div className="d-flex justify-content-between align-items-center mb-3 rounded bg-light shadow p-3">
                <h1>Bank Account Details</h1>
                <h2>Status :
                    {BankDetails.account?.is_active ? 
                    <span className="text-success">Approved</span> 
                    : 
                    <span className="text-danger">Not Approved</span> 
                    } 
                    
                </h2>
            </div>

            <div className='p-3 rounded bg-light shadow'>
                    <div>
                        
                        <b>User Details</b>
                        <hr />
                        <p>User Name : {BankDetails.user?.user_name}</p>
                        <p>User Email : {BankDetails.user?.user_email}</p>

                        <b>Account Details</b>
                        <hr />
                        <p><b>Account Holder Name:</b> {BankDetails.account?.acc_holder_name}</p>
                        <p><b>Account Holder Address:</b> {BankDetails.account?.acc_hold_add}</p>
                        <p><b>Bank Name:</b> {BankDetails.account?.bank_name}</p>
                        <p><b>Account Number: </b>{BankDetails.account?.acc_no}</p>
                        <p><b>IFSC Code: </b>{BankDetails.account?.ifsc_code}</p>
                        <p><b>Bank Address: </b>{BankDetails.account?.bank_add}</p>
                        <p><b>Currency: </b>{BankDetails.account?.currency}</p>
                        <p><b>Short Code: </b>{BankDetails.account?.short_code}</p>

                        <p><b>Document: </b> <a href={BankDetails.account.doc} target="_blank" rel="noopener noreferrer">View Document</a></p>

                    
                        <div style={{marginTop: '20px'}}>
                        <p><b>Change Status :</b></p>
                        
                        <Box sx={{ minWidth: 120, marginBottom: '20px' }}>
                            <FormControl sx={{ width: '20%' }}>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={status}
                                label="Status"
                                onChange={(event)=> {handleStatusChange(event);}}
                            >
                                <MenuItem value='Approve'>Approve</MenuItem>
                                <MenuItem value='Reject'>Reject</MenuItem>
                            </Select>
                            </FormControl>
                        </Box>
                        </div>

                        <Button variant="contained" onClick={handleBankAccounrStatusUpdate}>Update</Button>
                        {successMessage && <p className='text-success'>{successMessage}</p>}
                        
                    </div>
            </div> */}