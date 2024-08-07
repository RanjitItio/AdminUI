import React from 'react';
import { Paper, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



const barData = [
    { name: 'Sun', income: 80, outcome: 20 },
    { name: 'Mon', income: 60, outcome: 40 },
    { name: 'Tue', income: 70, outcome: 30 },
    { name: 'Wed', income: 50, outcome: 50 },
  ];



const ActivityCard = () => {
    return (
      <Paper elevation={3} sx={{ borderRadius: '10px', padding: 2 }}>
        <Typography variant="h6" sx={{ color: 'black', textAlign: 'center' }}>Activity</Typography>
        <Typography variant="h4" sx={{ color: 'black', textAlign: 'center' }}>$78120</Typography>

        <ResponsiveContainer width="100%" height={140}>
        <BarChart width={400} height={140} data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#00C49F" />
          <Bar dataKey="outcome" fill="#FF8042" />
        </BarChart>
        </ResponsiveContainer>
      </Paper>
    );
  };



export default ActivityCard;

