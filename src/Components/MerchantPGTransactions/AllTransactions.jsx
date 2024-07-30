import { Table, TableBody, TableCell, TableContainer, 
         TableHead, TableRow, Paper, Box } from '@mui/material';
import { Main, DrawerHeader } from '../Content';
import { useEffect, useState } from 'react';
import axiosInstance from '../Authentication/axios';
import ModeEditSharpIcon from '@mui/icons-material/ModeEditSharp';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Pagination from '@mui/material/Pagination';
import FormControlLabel from '@mui/material/FormControlLabel';
import { IOSSwitch } from '../Switch/TestProductionSwitch';
import { useNavigate } from 'react-router-dom';



// All Transaction Data
export default function AllMerchantPGTransactions({open}) {
    const [transactionData, updateTransactionData] = useState([]); // All Transaction data state
    const [modeName, setModeName] = useState('Production Mode');   // Mode Name
    const navigate = useNavigate();


    // Call API to fetch all the Transactions
    useEffect(()=> {
        axiosInstance.get(`api/v2/admin/merchant/pg/transactions/`).then((res)=> {
            // console.log(res)

            if (res.status === 200 && res.data.message === 'Transaction fetched successfuly') {
                updateTransactionData(res.data.AdminmerchantPGTransactions)
            };

        }).catch((error)=> {
            console.log(error)
            
        })
    }, []);

    // Method for Test/Production checkbox
    const handleCheckBoxChange = (e)=> {
         const value = e.target.checked

         if (value === false) {
            axiosInstance.get(`/api/v2/admin/merchant/pg/sandbox/transactions/`).then((res)=> {
                // console.log(res)
    
                if (res.status === 200 && res.data.message === 'Transaction fetched successfuly') {
                    updateTransactionData(res.data.AdminmerchantPGSandboxTransactions)
                    setModeName('Test Mode')
                };
    
            }).catch((error)=> {
                console.log(error)
                
            })
         } else if (value === true) {
            axiosInstance.get(`api/v2/admin/merchant/pg/transactions/`).then((res)=> {
                // console.log(res)
    
                if (res.status === 200 && res.data.message === 'Transaction fetched successfuly') {
                    updateTransactionData(res.data.AdminmerchantPGTransactions)
                    setModeName('Production Mode')
                };
    
            }).catch((error)=> {
                console.log(error)
                
            })
         }
    };

    // Change status color according to the transaction status
    const getStatusColor = (status)=> {
        switch (status) {
            case 'PAYMENT_INITIATED':
                 return 'primary'
            case 'PAYMENT_FAILED':
                return 'error'
            case 'PAYMENT_SUCCESS':
                return 'success'
            case 'PAYMENT_PENDING':
                return 'warning'
            default:
                return 'primary'
        }
    };

    // Method to handle Edit Button Clicked
    const handleEditButtonClicked = (event, transaction)=> {
        const transactionData = transaction
        navigate('/admin/update/merchant/pg/transactions/', {state: {tranaction: transactionData}})
    };


    return (
        <Main open={open}>
            <DrawerHeader />

            <TableContainer component={Paper}>
            <Box sx={{ height: 450, overflowY: 'auto' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{position:'sticky', zIndex: 1, top: 0, backgroundColor: 'white'}}>
                        <TableRow>
                            <TableCell><b>Sl No.</b></TableCell>
                            <TableCell align="center"><b>Transaction ID</b></TableCell>
                            <TableCell align="left"><b>Merchant</b></TableCell>
                            <TableCell align="left"><b>Amount</b></TableCell>
                            <TableCell align="center"><b>Date</b></TableCell>
                            <TableCell align="center"><b>Status</b></TableCell>
                            <TableCell align="right"><b>Edit</b></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {transactionData.map((transactions, index) => (
                            <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell scope="row">
                                    {transactions?.id}
                                </TableCell>

                                <TableCell scope="row" align='left'>
                                    {transactions?.transaction_id}
                                </TableCell>

                                <TableCell  scope="row" align='left'>
                                    {transactions?.merchant?.merchant_name}
                                </TableCell>

                                <TableCell component="th" scope="row">
                                    {transactions?.amount} {transactions?.currency}
                                </TableCell>

                                <TableCell component="th" scope="row">
                                    {transactions?.createdAt}
                                </TableCell>

                                <TableCell component="th" scope="row">
                                    <Chip label={transactions?.status} variant="outlined" color={getStatusColor(transactions?.status)} />
                                </TableCell>

                                <TableCell component="th" scope="row">
                                    <IconButton aria-label="Example" onClick={(event)=> {handleEditButtonClicked(event, transactions)}}>
                                        <ModeEditSharpIcon color='secondary'/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>

            <Box sx={{display:'flex', justifyContent:'space-between'}}>
                <Pagination count={10} color="primary" sx={{mb:2, mt:2}} />

                <FormControlLabel 
                    control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                    label={modeName}
                    onChange={handleCheckBoxChange}
                    />
            </Box>

            </TableContainer>
        </Main>
    );
};