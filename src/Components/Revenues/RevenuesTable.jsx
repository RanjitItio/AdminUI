import { Main, DrawerHeader } from "../Content";
import { Paper, Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import axiosInstance from "../Authentication/axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';





const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );


// All Merchant Withdrawal transactions of PG
export default function Revenues({open}) {
    const [revenueData, updateRevenuesData] = useState([]);  // All merchant withdrawals

    // Fetch all Revenues
    useEffect(() => {
      axiosInstance.get(`/api/v6/admin/revenues/`).then((res)=> {
        // console.log(res)
        if (res.status === 200 && res.data.success === true) {
          const RevenueData = Array.isArray(res.data.pipe_wise_transaction) ? res.data.pipe_wise_transaction : [res.data.pipe_wise_transaction]
          updateRevenuesData(RevenueData)
        };

      }).catch((error)=> {
        console.log(error)

      })
    }, []);

    
    return (
        <Main open={open}>
            <DrawerHeader />

            <h5 style={{margin:9, marginBottom:20}}><b>All Revenues</b></h5>

            <Grid container spacing={2}>
                {revenueData.map((data, index)=> {
                    return (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Paper elevation={12} sx={{boxShadow: 3, border:'2px solid #845ec2', background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'}} >
                            <Card sx={{ 
                                    minWidth: 275, 
                                    height:'10rem',
                                    borderRadius: 3,
                                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: '0 6px 30px rgba(0, 0, 0, 0.15)',
                                        } 
                                    }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 16, fontWeight: 'bold', color: '#424242' }} gutterBottom>
                                        {data?.pipe_name} Revenue
                                    </Typography>

                                    <Typography variant="h5" component="div" sx={{ color: '#424242' }}>
                                        Fees Collected
                                    </Typography>

                                    {data.total_transaction_amount?.map((amountData, amountIndex)=> {
                                        return (
                                        <Typography sx={{ mt: 1, color: '#1a73e8', fontWeight: 'medium', fontSize: 20 }} color="primary" key={amountIndex}>
                                            {bull} {amountData.total_amount ? parseFloat(amountData?.total_amount).toFixed(2) : 0.00} {amountData?.currency}
                                        </Typography>
                                        )
                                    })}
                                    
                                </CardContent>
                            </Card>
                            </Paper>
                        </Grid>
                );
                })}
                </Grid>
        </Main>
    );
}