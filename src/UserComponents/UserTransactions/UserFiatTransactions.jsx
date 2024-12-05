import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axiosInstance from '../../Components/Authentication/axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ModeEditSharpIcon from '@mui/icons-material/ModeEditSharp';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Pagination from '@mui/material/Pagination';
import Chip from '@mui/material/Chip';




  // Transaction Label
  const getTransactionLabel = (status)=> {
    switch (status) {
      case 'Success':
        return 'Success'
      case 'Pending':
        return 'Pending'
      case 'Cancelled':
        return 'Cancelled'
      case 'Hold':
        return 'Hold'
      case 'Approved':
        return 'Approved'
      default:
        return 'Unknown';
    }
};


// Transaction Status
const getTransactionStatus = (status)=> {
  switch (status) {
    case 'Approved':
      return 'success'
    case 'Hold':
      return 'primary'
    case 'Cancelled':
      return 'error'
    case 'Pending':
      return 'warning'
    case 'PAYMENT_HOLD':
      return 'primary'
    default:
      return 'primary';
  }
};



// View all transactions related to specific users
export default function FiatTransactionTable({userID}) {
  
  const navigate = useNavigate();
  const [merchantTransaction, updateMerchantTransaction] = useState([]);
  const [emptyData, updateEmptyData] = useState(false);
  const [totalRows, setTotalRows] = useState(0);

  const countPagination = Math.ceil(totalRows ? totalRows : 0);

  // Fetch all the merchant Transactions
  useEffect(() => {
    axiosInstance.get(`/api/v4/admin/user/fiat/transactions/?query=${userID}`).then((res)=> {
      // console.log(res)
      if (res.status === 200) {
        updateMerchantTransaction(res.data.all_user_fiat_transactions);
        setTotalRows(res.data.total_row_count)
      }

      if (res.data.all_user_fiat_transactions.length === 0) {
          updateEmptyData(true);
      }

    }).catch((error)=> {
      // console.log(error)
      
    })
  }, []);


  // Get all the paginated data
  const handlePaginationData = (e, value)=> {
    let limit = 5;
    let offset = (value - 1) * limit;

    axiosInstance.get(`/api/v4/admin/user/fiat/transactions/?query=${userID}&limit=${limit}&offset=${offset}`).then((res)=> {
      // console.log(res)

      if (res.status === 200) {
        updateMerchantTransaction(res.data.all_user_fiat_transactions);
        setTotalRows(res.data.total_row_count)
      }

    }).catch((error)=> {
      // console.log(error)
      
    })
  };


  // Method to handle Edit Button Clicked
  const handleEditButtonClicked = (event, transaction)=> {
       if (transaction.type === 'Deposit') {
          // Navigate to the Deposit Transaction Page
          navigate('/admin/deposits/update/', {state: {transactionID: transaction.data}});

       } else if (transaction.type === 'Transfer') {
          // Navigate to the Transfer Transaction Page
          navigate('/admin/transfers/details/', {state: {transactionID: transaction.data}});
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
        <Box sx={{ maxHeight: 1200, overflow: 'auto' }}>
          <Table>
            <TableHead sx={{position:'sticky', zIndex: 1, top: 0, backgroundColor: '#e2f4fb'}}>
                <TableRow>
                    <TableCell align="center"><b>Sl No</b></TableCell>
                    <TableCell align="center"><b>Date</b></TableCell>
                    <TableCell align="center"><b>Type</b></TableCell>
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
                            {transaction?.data?.id}
                        </TableCell>

                        <TableCell component="th"  scope="row" align="center">
                            {transaction.data.created_At ? transaction.data.created_At.split('T')[0] : ''} <br />
                            <small><i>{transaction.data.created_At ? transaction.data.created_At.split('T')[1] : ''}</i></small>
                        </TableCell>

                        <TableCell  align="center" padding="none">
                            {transaction?.type} 
                        </TableCell>

                        <TableCell  align="center" padding="none">
                            {transaction?.user?.first_name} {transaction?.user?.lastname}
                        </TableCell>

                        <TableCell  align="center" padding="none">
                          <p style={{marginLeft:20}}>
                              {transaction?.user?.email}
                          </p>
                        </TableCell>
                        
                        <TableCell align="left" padding="none">
                            <p style={{marginLeft:30}}>
                              {transaction?.data?.transaction_id}
                            </p>
                        </TableCell>

                        <TableCell align="center" padding="none">
                            {transaction?.data?.amount} {transaction?.currency?.name}
                        </TableCell>

                        <TableCell align="center" padding="none">
                            <Chip label={getTransactionLabel(transaction?.data?.status)} color={getTransactionStatus(transaction?.data?.status)} />
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
              sx={{margin:1.6}}
              />
      </Paper>
    </Box>
  );
};

