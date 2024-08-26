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






// View all transactions related to specific users
export default function TransactionTable({userID}) {
  
  const navigate = useNavigate();
  const [merchantTransaction, updateMerchantTransaction] = useState([]);
  const [emptyData, updateEmptyData] = useState(false);


  // Fetch all the merchant Transactions
  useEffect(() => {
    axiosInstance.get(`/api/v2/admin/merchant/pg/distinct/transactions/?query=${userID}`).then((res)=> {
      // console.log(res)

      if (res.status === 200 && res.data.success === true) {
        updateMerchantTransaction(res.data.distinct_merchant_transaction)
        updateEmptyData(false);
      }
      
      if (res.data.distinct_merchant_transaction.length === 0) {
          updateEmptyData(true);
      }

    }).catch((error)=> {
      console.log(error)

      
    })
  }, []);


  // Method to handle Edit Button Clicked
  const handleEditButtonClicked = (event, transaction)=> {
    const transactionData = transaction
    navigate('/admin/update/merchant/pg/transactions/', {state: {tranaction: transactionData, mode: modeName}})
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
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    {merchantTransaction.map((transaction, index)=> {
                      <>
                        <TableCell component="th"  scope="row" align="left" padding="none">
                            {transaction?.createdAt}
                        </TableCell>

                        <TableCell component="th"  scope="row" align="left" padding="none">
                            {transaction?.merchant.merchant_name}
                        </TableCell>

                        <TableCell component="th"  scope="row" align="left" padding="none">
                            {transaction?.merchant.merchant_email}
                        </TableCell>
                        
                        <TableCell component="th"  scope="row" align="left" padding="none">
                              {transaction?.transaction_id}
                        </TableCell>

                        <TableCell component="th"  scope="row" align="left" padding="none">
                            {transaction?.amount}
                        </TableCell>

                        <TableCell component="th"  scope="row" align="left" padding="none">
                            {transaction?.status}
                        </TableCell>

                        <TableCell component="th"  scope="row" align="left" padding="none">
                              <IconButton aria-label="Example" onClick={(event)=> {handleEditButtonClicked(event, transaction)}}>
                                  <ModeEditSharpIcon color='secondary'/>
                              </IconButton>
                        </TableCell>

                      </>
                    })}
                  </TableRow>
              
            </TableBody>
          </Table>
          </Box>
        </TableContainer>
      </Paper>
    </Box>

  );
};

