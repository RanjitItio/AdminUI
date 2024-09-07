import {Paper, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Progress, Typography } from 'antd';
import { useState, useEffect } from 'react';
import axiosInstance from '../Authentication/axios';
import { BarChart } from '@mui/x-charts/BarChart';



const { Text, Link } = Typography;
const { Title } = Typography;





export default function DashboardAcquirer() {
    const [acquirerTransaction, updateAcquirerTransaction] = useState([]);
    const [showChart, setShowChart] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState('');

    // Load the chart in Admin dashboard section
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowChart(true);
        }, 1000); 

        return () => clearTimeout(timer); 
    }, []);

    // Fetch all the transactions
    useEffect(() => {
        axiosInstance.get(`/api/v6/admin/dash/pipe/transactions/`).then((res)=> {
            // console.log(res)

            if(res.status === 200 && res.data.success === true) {
                updateAcquirerTransaction(res.data.pipe_transactions)
            }

        }).catch((error)=> {
            console.log(error)
        })
    }, []);

    // Fetch pipe transaction currency wise
    const handleGetCurrencyWiseTransaction = ()=> {
            axiosInstance.get(`/api/v6/admin/dash/pipe/transactions/?currency=${selectedCurrency}`).then((res)=> {
                // console.log(res)
                if(res.status === 200 && res.data.success === true) {
                    updateAcquirerTransaction(res.data.pipe_transactions)
                }
    
            }).catch((error)=> {
                console.log(error)
            })
        
    };

    useEffect(() => {
        if (selectedCurrency) {
            handleGetCurrencyWiseTransaction()
        }
    }, [selectedCurrency])
    


    
    // get the selecetd currency value
    const handleCurrencyChange = (e) => {
        setSelectedCurrency(e.target.value)
    };
    
    const pipeNames    = acquirerTransaction.length > 0 ? acquirerTransaction.map((trans) => trans.pipe_name) : [' ', ' '];
    const totalAmounts = acquirerTransaction.length > 0 ?  acquirerTransaction.map((trans) => trans.total_amount) : [0, 0];

    return (
        <Paper elevation={8} sx={{mt:3, p:2, borderRadius: '10px', height: '24rem', overflow:'auto'}}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <Title level={4}>Acquirer Transactions</Title>

                <FormControl sx={{ m: 1, minWidth: 80 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Currency</InputLabel>
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        autoWidth
                        label="Currency"
                        size='small'
                        value={selectedCurrency}
                        onChange={handleCurrencyChange}
                        >
                        <MenuItem value={'USD'}>USD</MenuItem>
                        <MenuItem value={'EUR'}>EUR</MenuItem>
                        <MenuItem value={'GBP'}>GBP</MenuItem>
                        <MenuItem value={'INR'}>INR</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <Box p={1}>
                {showChart && (
                    <BarChart
                        xAxis={[{ 
                            scaleType: 'band', 
                            data: pipeNames,
                        }]}
                        series={[{ 
                            data: totalAmounts,
                            color:'#7b1fa2'
                        }]}
                        width={350}
                        height={300}
                    />
                )}
            </Box>
        </Paper>
    );
};