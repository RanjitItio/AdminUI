import { Main, DrawerHeader } from '../../Content';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
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

    // Update Bank Account Status
    const handleBankAccounrStatusUpdate = () => {
        axiosInstance.put(`api/v3/admin/merchant/bank/update/`, {
            status: status,
            user_id: BankDetails.user?.user_id,
            mrc_bnk_id: BankDetails.account?.id

        }).then((res)=> {
            console.log(res)
            if (res.status === 200) {
                setSuccessMessage("Transaction Updated Successfully")
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
            <div className="d-flex justify-content-between align-items-center mb-3 rounded bg-light shadow p-3">
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
            </div>
        </Main>

        </>
    )
};