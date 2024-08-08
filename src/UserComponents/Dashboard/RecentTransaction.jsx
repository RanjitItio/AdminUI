import React from 'react';
import { Box, Typography, Tabs, Tab, Paper, List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider } from '@mui/material';
import { green, red } from '@mui/material/colors';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const transactions = [
  { id: 1, name: "XYZ Store ID", date: "June 4, 2020", time: "05:34:45 AM", amount: "+$5,553", status: "Completed", type: "Cashback", color: green[500] },
  { id: 2, name: "Chef Renata", date: "June 5, 2020", time: "05:34:45 AM", amount: "-$167", status: "Pending", type: "Transfer", color: red[300] },
  { id: 3, name: "Cindy Alexandro", date: "June 5, 2020", time: "05:34:45 AM", amount: "+$5,553", status: "Canceled", type: "Transfer", color: red[500] },
  { id: 4, name: "Paipal", date: "June 4, 2020", time: "05:34:45 AM", amount: "+$5,553", status: "Completed", type: "Transfer", color: green[500] },
  { id: 5, name: "Hawkins Jr.", date: "June 4, 2020", time: "05:34:45 AM", amount: "+$5,553", status: "Canceled", type: "Cashback", color: red[500] },
];

const RecentTransactions = () => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ width: '100%', maxWidth: 800, padding: 2, borderRadius:'10px' }}>
        <Typography variant="h6">Previous Transactions</Typography>
        <Typography variant="body2" color="textSecondary">Recent Transactions</Typography>

        <Tabs value={tabValue} onChange={handleChange} aria-label="transaction tabs" sx={{ marginBottom: 2 }}>
          <Tab label="Monthly" />
          <Tab label="Weekly" />
          <Tab label="Today" />
        </Tabs>

        <Box sx={{ maxHeight: 240, overflow: 'auto' }}>
        <List>
          {transactions.map((transaction) => (
            <React.Fragment key={transaction.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar sx={{ backgroundColor: transaction.color }}>
                    {transaction.amount.startsWith('+') ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={transaction.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        {transaction.type}
                      </Typography>
                      <br />
                      {transaction.date}<br />{transaction.time}
                    </React.Fragment>
                  }
                />
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="body2" sx={{ color: transaction.amount.startsWith('+') ? green[500] : red[500] }}>
                    {transaction.amount}
                  </Typography>
                  <Typography variant="body2" sx={{ color: transaction.status === 'Completed' ? green[500] : transaction.status === 'Pending' ? 'orange' : red[500] }}>
                    {transaction.status}
                  </Typography>
                </Box>
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
        </Box>
      </Paper>
    </Box>
  );
};

export default RecentTransactions;
