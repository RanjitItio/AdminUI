import {Main, DrawerHeader} from './Content';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import ConfirmationNumberRoundedIcon from '@mui/icons-material/ConfirmationNumberRounded';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import DashboardLineChart from './Charts/DashLinechart';
import TotalProfit from './Profit';
import LatestTickets from './LatestTickets';
import LatestDispute from './LatestDispute';
import {Row, Col} from'react-bootstrap';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import axiosInstance from './Authentication/axios';





function Dashboard({open}) {
    const [countUsers, setCountUsers] = useState(0)

    useEffect(() => {
      axiosInstance.get(`api/v1/user/count/`).then((res)=> {
        // console.log(res.data.total_users)

        if (res.data.total_users) {
            setCountUsers(res.data.total_users)
        }

      }).catch((error)=> {
        console.log(error.response)

      })
    }, [])
    

    return(
       
        <Main open={open}>
            <DrawerHeader />

            {/* <Box sx={{display: 'flex','& > :not(style)': {m: 1, width: 260, height: 153,},}}> */}
            <Box sx={{flexGrow: 1}}>
            <Grid container spacing={3} justifyContent="center">

            <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card style={{backgroundColor: '#51e56d', color: 'white', position: 'relative'}} >
                <PersonRoundedIcon style={{top: 0, left: 0, zIndex: '1', position: 'absolute', color: 'white', width: '100%', height: '73%', backgroundColor: 'rgba(255, 255, 255, 0.5)', backgroundSize: 'cover', opacity: '0.3'}}/>
                <CardContent>
                    <Typography sx={{ fontSize: 25 }} color="" gutterBottom>
                        <b>{countUsers}</b>
                    </Typography>
                    
                    <Typography variant="p" component="div" >
                       Total Users
                    </Typography>
                </CardContent>

                <CardActions sx={{backgroundColor: 'rgba(0,0,0,0.1)', marginTop: '10px', '&:hover': {backgroundColor: 'rgba(0,0,0,0.3)'},  }}>
                    <Button size="small" style={{ marginLeft: '5.3rem', color: 'white'}}>
                       More Info &nbsp; <ArrowCircleRightRoundedIcon />
                    </Button>
                </CardActions>
            </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card  style={{backgroundColor: '#8d0aa9', color: 'white', position: 'relative'}} >
                <StorefrontRoundedIcon style={{top: 0, left: 0, zIndex: '1', position: 'absolute', color: 'white', width: '100%', height: '73%', backgroundColor: 'rgba(255, 255, 255, 0.5)', backgroundSize: 'cover', opacity: '0.3'}} />
                <CardContent>
                    <Typography sx={{ fontSize: 25 }} color="" gutterBottom>
                        <b>5</b>
                    </Typography>
                    
                    <Typography variant="p" component="div" >
                      Total Merchants
                    </Typography>
                </CardContent>

                <CardActions sx={{backgroundColor: 'rgba(0,0,0,0.1)', marginTop: '10px', '&:hover': {backgroundColor: 'rgba(0,0,0,0.3)'},  }} >
                    <Button size="small" style={{ marginLeft: '5.3rem', color: 'white'}}>
                        More Info &nbsp; <ArrowCircleRightRoundedIcon />
                    </Button>
                </CardActions>
            </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card  style={{backgroundColor: '#0a8aa9', color: 'white', position: 'relative'}} >
                <ConfirmationNumberRoundedIcon style={{top: 0, left: 0, zIndex: '1', position: 'absolute', color: 'white', width: '100%', height: '73%', backgroundColor: 'rgba(255, 255, 255, 0.5)', backgroundSize: 'cover', opacity: '0.3'}} />
                <CardContent>
                    <Typography sx={{ fontSize: 25 }} color="" gutterBottom>
                        <b>5</b>
                    </Typography>
                    
                    <Typography variant="p" component="div" >
                      Total Tickets
                    </Typography>
                </CardContent>

                <CardActions sx={{backgroundColor: 'rgba(0,0,0,0.1)', marginTop: '10px', '&:hover': {backgroundColor: 'rgba(0,0,0,0.3)'},  }}>
                    <Button size="small" style={{ marginLeft: '5.3rem', color: 'white'}}>
                        More Info &nbsp; <ArrowCircleRightRoundedIcon />
                    </Button>
                </CardActions>
            </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card style={{backgroundColor: '#a90a4a', color: 'white', position: 'relative'}} >
                <DisabledByDefaultRoundedIcon style={{top: 0, left: 0, zIndex: '1', position: 'absolute', color: 'white', width: '100%', height: '73%', backgroundColor: 'rgba(255, 255, 255, 0.5)', backgroundSize: 'cover', opacity: '0.3'}} />
                <CardContent>
                    <Typography sx={{ fontSize: 25 }} color="" gutterBottom>
                        <b>5</b>
                    </Typography>
                    
                    <Typography variant="p" component="div" >
                      Total Dispute
                    </Typography>
                </CardContent>

                <CardActions sx={{backgroundColor: 'rgba(0,0,0,0.1)', marginTop: '10px', '&:hover': {backgroundColor: 'rgba(0,0,0,0.3)'}  }}>
                    <Button size="small" style={{ marginLeft: '5.3rem', color: 'white'}}>
                        More Info &nbsp; <ArrowCircleRightRoundedIcon />
                    </Button>
                </CardActions>
            </Card>
            </Grid>
        
            </Grid>
            </Box>

            {/* Dash Board Line Chart Starts */}
                <DashboardLineChart />
            {/* Dash Borad Line Chart Ends */}

            {/* Total Profit Section Starts */}
                <TotalProfit />
            {/* Total Profit Section Ends */}


            <LatestTickets />

            <LatestDispute />

        </Main>
    
    )
}




export default Dashboard;