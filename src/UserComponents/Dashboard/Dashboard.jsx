import React from 'react';
import { Grid, CardContent, Typography, Box } from '@mui/material';
import {Main, DrawerHeader} from '../../Components/Content';
import Paper from '@mui/material/Paper';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PersonIcon from '@mui/icons-material/Person';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import AddToHomeScreenIcon from '@mui/icons-material/AddToHomeScreen';
import WalletCard from './WalletCard';
import ActivityCard from './Activity';
import TransactionOverView from './TransactionOverview';
import RecentTransactions from './RecentTransaction';



  

export default function UserDashBoard({open}) {
    return (
        <Main open={open}> 
            <DrawerHeader />

        <Box sx={{ flexGrow: 1, padding: 2 }}>
            {/* Four Cards */}
            <Grid container spacing={2} sx={{mb:3}}>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={8} style={{backgroundColor: '#FFA726', borderRadius: '10px', height: '7.4rem', display: 'flex', alignItems: 'center', padding: '1rem'}}>
                        <PersonIcon sx={{ fontSize: 40, color: 'white', marginRight: '1px' }} />
                        <CardContent>
                            <Typography variant="h5">2478</Typography>
                            <small>Total Users</small>
                        </CardContent>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={8} sx={{backgroundColor: '#66BB6A', borderRadius: '10px', height: '7.4rem', display: 'flex', alignItems: 'center', padding: '1rem'}}>
                        <ReceiptLongIcon sx={{ fontSize: 40, color: 'white', marginRight: '1px' }} />
                        <CardContent>
                            <Typography variant="h5">2478</Typography>
                            <small>Total Transactions</small>
                        </CardContent>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={8} sx={{backgroundColor: '#AB47BC', borderRadius: '10px', height: '7.4rem', display: 'flex', alignItems: 'center', padding: '1rem'}}>
                        <SimCardDownloadIcon sx={{ fontSize: 40, color: 'white', marginRight: '1px' }} />
                        <CardContent>
                            <Typography variant="h5">2478</Typography>
                            <small>Total Deposits</small>
                        </CardContent>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={8} sx={{backgroundColor: '#42A5F5', borderRadius: '10px', height: '7.4rem', display: 'flex', alignItems: 'center', padding: '1rem'}}>
                        <AddToHomeScreenIcon sx={{ fontSize: 40, color: 'white', marginRight: '1px' }} />
                        <CardContent>
                            <Typography variant="h5">2478</Typography>
                            <small>Total Withdrawls</small>
                        </CardContent>
                    </Paper>
                </Grid>
            </Grid>
            {/* Four Card Ends */}

            <Grid container spacing={1}>
                <Grid item xs={12} sm={8} md={7}>
                    <WalletCard />
                </Grid>

                <Grid item xs={12} sm={4} md={5}>
                    <ActivityCard />
                </Grid>
            </Grid>

            <Grid container mt={2} spacing={2}>
                <Grid item xs={12} sm={6} md={6}>
                    <TransactionOverView/>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                    <RecentTransactions/>
                </Grid>
            </Grid>
        </Box>

        </Main>
    );
};