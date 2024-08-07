import {Paper, CardContent, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const data = [{name: 'Sun', income: 40, outcome: 30}, {name: 'Mon', income: 20, outcome: 50}, {name: 'Tue', income: 60, outcome: 40}, {name: 'Wed', income: 40, outcome: 20}, {name: 'Thu', income: 80, outcome: 40}, {name: 'Fri', income: 50, outcome: 70}];



export default function TransactionOverView() {

    return (
        <Paper elevation={3} sx={{borderRadius:'10px'}}>
            <CardContent>
                <Typography variant="h6" sx={{mb:2}}>Transaction Overview</Typography>
                <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="income" fill="#82ca9d" />
                    <Bar dataKey="outcome" fill="#8884d8" />
                </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Paper>
    );
};