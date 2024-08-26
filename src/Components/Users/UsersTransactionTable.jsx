import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axiosInstance from '../Authentication/axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ModeEditSharpIcon from '@mui/icons-material/ModeEditSharp';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Pagination from '@mui/material/Pagination';






// View all transactions related to specific users
export default function TransactionTable({userID}) {
  
  const navigate = useNavigate();
  const [merchantTransaction, updateMerchantTransaction] = useState([]);
  const [emptyData, updateEmptyData] = useState(false);
  const [totalRows, setTotalRows] = useState(0);

  const countPagination = Math.ceil(totalRows ? totalRows : 0);

  // Fetch all the merchant Transactions
  useEffect(() => {
    axiosInstance.get(`/api/v2/admin/merchant/pg/distinct/transactions/?query=${userID}`).then((res)=> {
      // console.log(res)

      if (res.status === 200 && res.data.success === true) {
        updateMerchantTransaction(res.data.distinct_merchant_transaction);
        setTotalRows(res.data.total_row_count)
      }
      
      if (res.data.distinct_merchant_transaction.length === 0) {
          updateEmptyData(true);
      }

    }).catch((error)=> {
      console.log(error)
      
    })
  }, []);

  
  // Get all the paginated data
  const handlePaginationData = (e, value)=> {
    let limit = 15;
    let offset = (value - 1) * limit;

    axiosInstance.get(`/api/v2/admin/merchant/pg/distinct/transactions/?query=${userID}&limit=${limit}&offset=${offset}`).then((res)=> {
      // console.log(res)

      if (res.status === 200 && res.data.success === true) {
        updateMerchantTransaction(res.data.distinct_merchant_transaction);
        setTotalRows(res.data.total_row_count)
      }

    }).catch((error)=> {
      console.log(error)
      
    })
  };


  // Method to handle Edit Button Clicked
  const handleEditButtonClicked = (event, transaction)=> {
    const transactionData = transaction
    navigate('/admin/update/merchant/pg/transactions/', {state: {tranaction: transactionData, mode: 'Production Mode'}})
  };


  // Transaction Status
  const getTransactionStatus = (status)=> {
      switch (status) {
        case 'PAYMENT_SUCCESS':
          return '#008f7a'
        case 'PAYMENT_INITIATED':
          return '#0089ba'
        case 'PAYMENT_FAILED':
          return '#c34a36'
        default:
          return '#0089ba';
      }
  };


   // If Not data found for the merhant
   if (emptyData) {
     return (
      <Box sx={{ width: '100%' }}>
        <Paper elevation={3} sx={{ width: '100%', mb: 2}}>
             <div style={{display:'flex', justifyContent:'center'}}>
                <DeleteOutlineIcon color='primary' style={{fontSize:'100px'}}/>
             </div>

             <div style={{display:'flex', justifyContent:'center'}}>
                <small><b>No data found</b></small>
             </div>
        </Paper>
      </Box>
     );
   };


  return (
    <Box sx={{ width: '100%' }}>

      <Paper elevation={3} sx={{ width: '100%', mb: 2 }}>
      
        <TableContainer>
        <Box sx={{ height: 450, overflowY: 'auto' }}>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
          >
            <TableHead sx={{position:'sticky', zIndex: 1, top: 0, backgroundColor: '#e2f4fb'}}>
                <TableRow>
                    <TableCell align="center"><b>Sl No</b></TableCell>
                    <TableCell align="center"><b>Date</b></TableCell>
                    <TableCell align="center"><b>Merchant</b></TableCell>
                    <TableCell align="center"><b>Merchant Email</b></TableCell>
                    <TableCell align="center"><b>Transaction ID</b></TableCell>
                    <TableCell align="center"><b>Amount</b></TableCell>
                    <TableCell align="center"><b>Status</b></TableCell>
                    <TableCell align="center"><b>Edit</b></TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
            {merchantTransaction.map((transaction, index)=> {
              return (
                  <TableRow sx={{padding:5 }} key={index}>
                        <TableCell component="th"  scope="row" align="right">
                            {transaction.id}
                        </TableCell>

                        <TableCell component="th"  scope="row" align="center">
                            {transaction?.createdAt.split('T')[0]} <br />
                            <small><i>{transaction?.createdAt.split('T')[1]}</i></small>
                        </TableCell>

                        <TableCell  align="center" padding="none">
                            {transaction?.merchant.merchant_name}
                        </TableCell>

                        <TableCell  align="center" padding="none">
                            {transaction?.merchant.merchant_email}
                        </TableCell>
                        
                        <TableCell align="left" padding="none">
                              {transaction?.transaction_id}
                        </TableCell>

                        <TableCell align="center" padding="none">
                            {transaction?.amount} {transaction?.currency}
                        </TableCell>

                        <TableCell align="center" padding="none">
                            <p style={{color:getTransactionStatus(transaction?.status)}}>{transaction?.status}</p>
                        </TableCell>
                        
                        <TableCell align="center" padding="none">
                            <IconButton aria-label="Example" onClick={(event)=> {handleEditButtonClicked(event, transaction)}}>
                                <ModeEditSharpIcon color='secondary'/>
                            </IconButton>
                        </TableCell>
                  </TableRow>
                    )})}
              
            </TableBody>
          </Table>

          </Box>
        </TableContainer>

          <Pagination 
              count={countPagination} 
              onChange={(e, value) => handlePaginationData(e, value)}
              color="primary" 
              style={{padding:10}}
              />

      </Paper>
    </Box>
  );
};

