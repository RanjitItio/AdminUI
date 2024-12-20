import React from 'react';
import { Box, CardContent, Grid, Typography,  
        Avatar, Table, TableBody, TableCell, TableContainer, TableHead,
        TableRow, Paper } from '@mui/material';
import { blue, green, orange, red } from '@mui/material/colors';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useEffect } from 'react';
import axiosInstance from '../Authentication/axios';
import { useState } from 'react';








// Total Profit
export default function RecentTransactions() {
  const [transactionData, updateTransactionData] = useState([]); // All Transaction data state
  const [transactionAmount, updateTransactionAmount] = useState([]);


  // Get all the transactions
  useEffect(() => {
      axiosInstance.get(`api/v2/admin/merchant/pg/transactions/?limit=6&offset=0`).then((res)=> {
        // console.log(res)

        if (res.status === 200 && res.data.message === 'Transaction fetched successfuly') {
            updateTransactionData(res.data.AdminmerchantPGTransactions)
        };

    }).catch((error)=> {
        console.log(error)
        
    })

    // Fetch all the transaction amount
    axiosInstance.get(`api/v3/admin/merchant/success/transactions/`).then((res)=> {
      // console.log(res)
      if (res.status === 200 && res.data.success === true) {
          updateTransactionAmount(res.data)
      };

    }).catch((error)=> {
      console.log(error)

    })

  }, []);

  

  // Convert Date time format
  const ConvertDateTime = (dateTime)=> {
    const date = new Date(dateTime);
    const day = String(date.getDate()).padStart(2, '0');
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0') + "556"; 

    return `${day} ${month} ${year} ${hours}:${minutes}:${seconds}.${milliseconds}`;
  };


  // Payment Status
  const getPaymentStatus = (status) => {
     switch (status) {
      case 'PAYMENT_INITIATED':
        return 'Initiated'
      case 'PAYMENT_PENDING':
        return 'Pending'
      case 'PAYMENT_SUCCESS':
        return 'Success'
      case 'PAYMENT_FAILED':
        return 'Failed'   
      default:
        return 'Processing'
     }
  };
      



return (
    <Box sx={{ flexGrow: 1, mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper elevation={8} sx={{borderRadius:'20px'}}>
            <CardContent>
              <Typography sx={{backgroundColor:'#fcf8ff', borderRadius:'5px'}} variant="h6">
                <b style={{marginLeft:'6px'}}>Recent Transactions</b>
              </Typography>

              <TableContainer component={Paper} sx={{maxHeight:'50rem', overflow:'auto', '&::-webkit-scrollbar': {display: 'none'}, scrollbarWidth: 'none'}}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Merchant</TableCell>
                        <TableCell>Date/Time</TableCell>
                        <TableCell>Business</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {transactionData.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>
                            <Box sx={{justifyContent: 'flex-start', display: 'flex'}}>
                              <Avatar sx={{ bgcolor: 
                                                  transaction.status === 'PAYMENT_SUCCESS' ? green[500] : 
                                                  transaction.status === 'PAYMENT_PENDING' ? orange[500] : 
                                                  transaction.status === 'PAYMENT_INITIATED' ? blue[300] : 
                                                  red[500], mr: 2 }}>
                                {transaction.status === 'PAYMENT_SUCCESS' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                              </Avatar>
                                {transaction.merchant?.merchant_name}
                            </Box>
                          </TableCell>

                          <TableCell>
                            <i>{ConvertDateTime(transaction.createdAt)}</i>
                          </TableCell>

                          <TableCell>
                            <i>{transaction?.business_name || 'None'}</i>
                          </TableCell>

                          <TableCell>
                            <Typography variant="body2">{transaction.amount} {transaction.currency}</Typography>
                          </TableCell>

                          <TableCell>
                            <Typography variant="body2" color={transaction.status === 'PAYMENT_SUCCESS' ? 'green' : transaction.status === 'PAYMENT_PENDING' ? 'orange' : transaction.status === 'PAYMENT_INITIATED' ? '#0089ba' : 'red'}>
                              {getPaymentStatus(transaction.status)}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>

                  </Table>
                </TableContainer>

            </CardContent>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Paper elevation={9} sx={{borderRadius:'20px'}}>
                <CardContent>
                  <Typography variant="h6">Total Transactions</Typography>
                  <Typography variant="h4">{'$'}{transactionAmount.usd_balance}</Typography>
                  <Typography variant="body2" color="green">+0.5%</Typography>
                </CardContent>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Paper elevation={9} sx={{borderRadius:'20px'}}>
                <CardContent>
                  <Typography variant="h6">Total Refunds</Typography>
                  <Typography variant="h4">0</Typography>
                  <Typography variant="body2" color="red">-0.8% from last month</Typography>
                </CardContent>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Paper elevation={9} sx={{borderRadius:'20px'}}>
                <CardContent>
                  <Typography variant="h6">Total Withdrawls</Typography>
                  <Typography variant="h4">0</Typography>
                  <Typography variant="body2" color="green">+0.5%</Typography>
                </CardContent>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Paper elevation={9} sx={{borderRadius:'20px'}}>
                <CardContent>
                  <Typography variant="h6">Matured Amount</Typography>
                  <Typography variant="h4">0</Typography>
                  <Typography variant="body2" color="red">-6.4%</Typography>
                </CardContent>
              </Paper>
            </Grid>

          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}