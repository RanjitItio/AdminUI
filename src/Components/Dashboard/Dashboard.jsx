import React from 'react';
import {Main, DrawerHeader} from '../Content';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import ConfirmationNumberRoundedIcon from '@mui/icons-material/ConfirmationNumberRounded';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import DashboardLineChart from '../Charts/DashLinechart';
// import TotalProfit from './Profit';
import RecentTransactions from './RecentTransactions';
import LatestTickets from './LatestTickets';
import LatestDispute from './LatestDispute';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import axiosInstance from '../Authentication/axios';
import { useNavigate } from 'react-router-dom';
import { Paper } from '@mui/material';
import ButtonBase from '@mui/material/ButtonBase';
import TransactionChart from './TransactionChart';




const DashboardAcquirer = React.lazy(()=> import('./DashboardAcquirer'))





// Admin dashboard section
function Dashboard({open}) {
    const [countMerchants, setCountMerchants] = useState(0)   // All Merchants
    const [countprodTransactions, setCountProdTransactions] = useState(0) // All Prod Transactions use
    const [countRefund, setCountRefund] = useState(0) // Refund Transaction
    const [countWithdrawals, setCountWithdrawals] = useState(0) // Withdrawal Transaction

    const navigate = useNavigate();

    // Call API to Get all the available users
    useEffect(() => {
      axiosInstance.get(`api/v2/admin/dashboard/counts/`).then((res)=> {
        // console.log(res.data.total_users)
        if (res.status === 200 && res.data.success === true) {
            setCountMerchants(res.data.merchant_users)
            setCountProdTransactions(res.data.prod_transactions)
            setCountRefund(res.data.refunds)
            setCountWithdrawals(res.data.withdrawals)
        }
      }).catch((error)=> {
        console.log(error)

      })
    }, [])


    // Method to redirect to all users page
    const handleUserInfo = ()=> {
        navigate('/admin/users/')
    };
    

    return(
       
        <Main open={open}>
            <DrawerHeader />

            {/* <Box sx={{display: 'flex','& > :not(style)': {m: 1, width: 260, height: 153,},}}> */}
            <Box sx={{flexGrow: 1}}>
            <Grid container spacing={3} justifyContent="center">

                <Grid item xs={12} sm={6} md={3} >
                    <Paper  elevation={8} style={{backgroundColor: '#51e56d', color: 'white', position: 'relative', borderRadius:'10px'}} >
                    <ButtonBase onClick={handleUserInfo} sx={{ display: 'block', width: '100%', height: '100%', textAlign: 'inherit'}}>
                        <PersonRoundedIcon style={{top: 0, left: 0, zIndex: '1', position: 'absolute', color: 'white', width: '100%', height: '63%', backgroundColor: 'rgba(255, 255, 255, 0.5)', backgroundSize: 'cover', opacity: '0.3'}}/>
                        <CardContent>
                            <Typography sx={{ fontSize: 25 }} color="" gutterBottom>
                                <b>{countMerchants}</b>
                            </Typography>
                            
                            <Typography variant="p" component="div" >
                                Total Merchants
                            </Typography>
                        </CardContent>

                        {/* <CardActions sx={{backgroundColor: 'rgba(0,0,0,0.1)', marginTop: '10px', '&:hover': {backgroundColor: 'rgba(0,0,0,0.3)'},  }}>
                            <Button size="small" style={{ marginLeft: '5.3rem', color: 'white'}} onClick={handleUserInfo}>
                                More Info &nbsp; <ArrowCircleRightRoundedIcon />
                            </Button>
                        </CardActions> */}
                    </ButtonBase>
                    </Paper>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={8}  style={{backgroundColor: '#8d0aa9', color: 'white', position: 'relative', borderRadius:'10px'}} >
                    <ButtonBase onClick={()=> {navigate('/admin/all-transaction/')}} sx={{ display: 'block', width: '100%', height: '100%', textAlign: 'inherit'}}>
                        <StorefrontRoundedIcon style={{top: 0, left: 0, zIndex: '1', position: 'absolute', color: 'white', width: '100%', height: '73%', backgroundColor: 'rgba(255, 255, 255, 0.5)', backgroundSize: 'cover', opacity: '0.3'}} />
                        <CardContent>
                            <Typography sx={{ fontSize: 25 }} color="" gutterBottom>
                                <b>{countprodTransactions}</b>
                            </Typography>
                            
                            <Typography variant="p" component="div" >
                                Total Transactions
                            </Typography>
                        </CardContent>

                        {/* <CardActions sx={{backgroundColor: 'rgba(0,0,0,0.1)', marginTop: '10px', '&:hover': {backgroundColor: 'rgba(0,0,0,0.3)'},  }} >
                            <Button size="small" style={{ marginLeft: '5.3rem', color: 'white'}}>
                                More Info &nbsp; <ArrowCircleRightRoundedIcon />
                            </Button>
                        </CardActions> */}
                    </ButtonBase>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={8}  style={{backgroundColor: '#0a8aa9', color: 'white', position: 'relative', borderRadius:'10px'}} >
                    <ButtonBase onClick={()=> {navigate('/admin/merchant/withdrawals/')}} sx={{ display: 'block', width: '100%', height: '100%', textAlign: 'inherit'}}>
                        <ConfirmationNumberRoundedIcon style={{top: 0, left: 0, zIndex: '1', position: 'absolute', color: 'white', width: '100%', height: '73%', backgroundColor: 'rgba(255, 255, 255, 0.5)', backgroundSize: 'cover', opacity: '0.3'}} />
                        <CardContent>
                            <Typography sx={{ fontSize: 25 }} color="" gutterBottom>
                                <b>{countWithdrawals}</b>
                            </Typography>
                            
                            <Typography variant="p" component="div" >
                                Total Withdrawls
                            </Typography>
                        </CardContent>

                        {/* <CardActions sx={{backgroundColor: 'rgba(0,0,0,0.1)', marginTop: '10px', '&:hover': {backgroundColor: 'rgba(0,0,0,0.3)'},  }}>
                            <Button size="small" style={{ marginLeft: '5.3rem', color: 'white'}} onClick={()=> {navigate('/admin/all-transaction/')}}>
                                More Info &nbsp; <ArrowCircleRightRoundedIcon />
                            </Button>
                        </CardActions> */}
                    </ButtonBase>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={8} style={{backgroundColor: '#a90a4a', color: 'white', position: 'relative', borderRadius:'10px'}}>
                    <ButtonBase  onClick={()=> {navigate('/admin/merchant/refunds/')}} sx={{ display: 'block', width: '100%', height: '100%', textAlign: 'inherit'}}>
                        <DisabledByDefaultRoundedIcon style={{top: 0, left: 0, zIndex: '1', position: 'absolute', color: 'white', width: '100%', height: '73%', backgroundColor: 'rgba(255, 255, 255, 0.5)', backgroundSize: 'cover', opacity: '0.3'}} />
                        <CardContent>
                            <Typography sx={{ fontSize: 25 }} color="" gutterBottom>
                                <b>{countRefund}</b>
                            </Typography>
                            
                            <Typography variant="p" component="div" >
                                Total Refunds
                            </Typography>
                        </CardContent>

                        {/* <CardActions sx={{backgroundColor: 'rgba(0,0,0,0.1)', marginTop: '10px', '&:hover': {backgroundColor: 'rgba(0,0,0,0.3)'}  }}>
                            <Button size="small" style={{ marginLeft: '5.3rem', color: 'white'}}>
                                More Info &nbsp; <ArrowCircleRightRoundedIcon />
                            </Button>
                        </CardActions> */}
                    </ButtonBase>
                    </Paper>
                </Grid>
        
            </Grid>
            </Box>

            {/* Dash Board Line Chart Starts */}
                {/* <DashboardLineChart /> */}
            {/* Dash Borad Line Chart Ends */}

            {/* Transaction Chart */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={7}>
                    <TransactionChart />
                </Grid>

                <Grid item xs={12} sm={12} md={5}>
                    <DashboardAcquirer />
                </Grid>
              </Grid>
            {/* Transaction Chart */}

            {/* Recent Transactions Section Starts */}
                <RecentTransactions />
            {/* Recent Transactions Section Ends */}

        </Main>
    

    );
};




export default Dashboard;