import { Main, DrawerHeader } from "../Content";
import { Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Paper, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import axiosInstance from "../Authentication/axios";
import ModeEditSharpIcon from '@mui/icons-material/ModeEditSharp';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Pagination from '@mui/material/Pagination';
import Input from '@mui/joy/Input';
import SearchIcon from '@mui/icons-material/Search';
import Button from "../MUIBaseButton/button";
import { useNavigate } from "react-router-dom";





// All Merchant Withdrawal transactions of PG
export default function AllMerchantPGWithdrawals({open}) {
    const navigate = useNavigate();
    const [merchantWithdrawals, updateMerchantWithdrawals] = useState([]);

    // Fetch all the merchant withdrawals
    useEffect(() => {
      axiosInstance.get(`/api/v4/admin/merchant/pg/withdrawals/`).then((res)=> {
        console.log(res)
        if (res.status === 200 && res.data.success === true) {
            updateMerchantWithdrawals(res.data.AdminMerchantWithdrawalRequests)
        };

      }).catch((error)=> {
        console.log(error)

      })
    }, []);

    // Method to redirect the user to Edit page
    const handleEditClicked = ()=> {
        navigate('/admin/merchant/update/withdrawals/')
    };

    // Change status color according to the transaction status
    const getStatusColor = (status)=> {
        switch (status) {
            case 'Hold':
                 return 'primary'
            case 'Rejected':
                return 'error'
            case 'Success':
                return 'success'
            case 'Pending':
                return 'warning'
            default:
                return 'primary'
        }
    };

    
    return (
        <Main open={open}>
            <DrawerHeader />

            <Paper elevation={3} sx={{p:1, borderRadius: '20px'}}> 

            <Box 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'start',
                    alignItems: 'center',
                    p:2
                    }}>
                <Input placeholder="Type in here…" />
                <IconButton aria-label="Example">
                    <SearchIcon color='primary' />
                </IconButton>
                <Button sx={{mx:1}}>Export</Button>
            </Box>

            <TableContainer>
            <Box sx={{ height: 450, overflowY: 'auto' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{position:'sticky', zIndex: 1, top: 0, backgroundColor: 'white'}}>
                        <TableRow>
                            <TableCell><b>Sl No.</b></TableCell>
                            <TableCell align="center"><b>Merchant</b></TableCell>
                            <TableCell align="center"><b>Merchant Email</b></TableCell>
                            <TableCell align="center"><b>Withdrawal Amount</b></TableCell>
                            <TableCell align="center"><b>Date</b></TableCell>
                            <TableCell align="center"><b>Time</b></TableCell>
                            <TableCell align="center"><b>Status</b></TableCell>
                            <TableCell align="center"><b>Edit</b></TableCell>
                            
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {merchantWithdrawals.map((transaction, index) => (
                            <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {/* Sl No. Column */}
                                <TableCell scope="row">
                                    {transaction?.id}
                                </TableCell>

                                {/* Merchant Name Column */}
                                <TableCell scope="row" align='left'>
                                    {transaction?.merchant_name}
                                </TableCell>

                                {/* Merchant Email Column */}
                                <TableCell  scope="row" align='center'>
                                    {transaction?.merchant_email}
                                </TableCell>

                                {/* Withdrawal Amount */}
                                <TableCell component="th" scope="row" align="center">
                                    {transaction?.withdrawalAmount} {transaction?.withdrawalCurrency}
                                </TableCell>

                                {/* Date Column */}
                                <TableCell component="th" scope="row" align="center">
                                    {transaction?.createdAt.split('T')[0]}
                                </TableCell>

                                {/* Time Column */}
                                <TableCell component="th" scope="row" align="center">
                                    {transaction?.createdAt.split('T')[1]}
                                </TableCell>

                                {/* Status Column */}
                                <TableCell component="th" scope="row" align="center">
                                    <Chip label={transaction?.status} variant="outlined" color={getStatusColor(transaction?.status)} />
                                </TableCell>

                                <TableCell component="th" scope="row" align="center">
                                    <IconButton aria-label="Example" onClick={handleEditClicked}>
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
            </Box>

            </TableContainer>

            </Paper>
        </Main>
    );
}