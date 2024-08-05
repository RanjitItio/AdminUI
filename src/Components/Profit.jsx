import React from 'react';
import { Box, Card, CardContent, Grid, Typography, 
        Tabs, Tab, List, ListItem, ListItemText, ListItemAvatar, 
        Avatar, Table, TableBody, TableCell, TableContainer, TableHead,
        TableRow, Paper } from '@mui/material';
import { green, red } from '@mui/material/colors';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


const transactions = [
  { id: 1, name: 'XYZ Store ID', type: 'Cashback', date: 'June 4, 2020', time: '05:34:45 AM', amount: '+$5,553', status: 'Completed' },
  { id: 2, name: 'Chef Renata', type: 'Transfer', date: 'June 5, 2020', time: '05:34:45 AM', amount: '-$167', status: 'Pending' },
  { id: 4, name: 'Cindy Alexandro', type: 'Transfer', date: 'June 5, 2020', time: '05:34:45 AM', amount: '+$5,553', status: 'Canceled' },
  { id: 5, name: 'Cindy Alexandro', type: 'Transfer', date: 'June 5, 2020', time: '05:34:45 AM', amount: '+$5,553', status: 'Canceled' },
  { id: 6, name: 'Cindy Alexandro', type: 'Transfer', date: 'June 5, 2020', time: '05:34:45 AM', amount: '+$5,553', status: 'Canceled' },
  { id: 7, name: 'Cindy Alexandro', type: 'Transfer', date: 'June 5, 2020', time: '05:34:45 AM', amount: '+$5,553', status: 'Canceled' },
  // Add more transactions here
];




export default function TotalProfit() {

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={9} sx={{borderRadius:'20px'}}>
            <CardContent>
              <Typography variant="h6">Recent Transactions</Typography>
              <Tabs value={0}>
                <Tab label="Monthly" />
                <Tab label="Weekly" />
                <Tab label="Today" />
              </Tabs>

              <TableContainer component={Paper} sx={{maxHeight:300, overflow:'auto'}}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Business Name</TableCell>
                        <TableCell>Date/Time</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>
                            <Avatar sx={{ bgcolor: transaction.status === 'Completed' ? green[500] : red[500], mr: 2 }}>
                              {transaction.status === 'Completed' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                            </Avatar>
                            {transaction.name}
                          </TableCell>
                          <TableCell>
                            {`${transaction.date} ${transaction.time}`}
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">{transaction.amount}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color={transaction.status === 'Completed' ? 'green' : transaction.status === 'Pending' ? 'orange' : 'red'}>
                              {transaction.status}
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
                  <Typography variant="h4">98k</Typography>
                  <Typography variant="body2" color="green">+0.5%</Typography>
                </CardContent>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Paper elevation={9} sx={{borderRadius:'20px'}}>
                <CardContent>
                  <Typography variant="h6">Invoice Remaining</Typography>
                  <Typography variant="h4">854</Typography>
                  <Typography variant="body2" color="red">-0.8% from last month</Typography>
                </CardContent>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Paper elevation={9} sx={{borderRadius:'20px'}}>
                <CardContent>
                  <Typography variant="h6">Invoice Sent</Typography>
                  <Typography variant="h4">456</Typography>
                  <Typography variant="body2" color="green">+0.5%</Typography>
                </CardContent>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Paper elevation={9} sx={{borderRadius:'20px'}}>
                <CardContent>
                  <Typography variant="h6">Invoice Completed</Typography>
                  <Typography variant="h4">1467</Typography>
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