import React from 'react';
import { Grid, Paper, Typography, Box, useTheme, useMediaQuery, Button } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import JoinFullIcon from '@mui/icons-material/JoinFull';
import CachedIcon from '@mui/icons-material/Cached';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';


const pieData = [
    { name: 'Account', value: 20, color: '#3366CC' },
    { name: 'Services', value: 40, color: '#00C49F' },
    { name: 'Restaurant', value: 15, color: '#FFBB28' },
    { name: 'Others', value: 15, color: '#FF8042' },
  ];


const WalletCard = () => {
    const theme = useTheme();
    const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  
    return (
      <Paper elevation={3} sx={{ borderRadius: '10px', padding: 2, display: 'flex', flexDirection: 'column' }}>

        <Grid container spacing={5}>

        <Grid item xs={12} sm={12} md={6}>
            <Paper sx={{ 
                        display: 'flex', 
                        flexDirection: 'row', 
                        alignItems: 'center', 
                        padding: 2, 
                        height:200, 
                        mt:2,
                        backgroundColor: '#00b0dc',
                        borderRadius:'10px',
                        justifyContent: 'space-between'
                        }}>
                <Box sx={{ flexGrow: 1 }}>
                    <JoinFullIcon fontSize='large' sx={{color:'#d6dbe2', mb:2}} />
                    <Typography variant="h5" style={{color:'white'}}>$824,571.93</Typography>
                    <small style={{color:'white'}}>Wallet Balance</small> <br />
                    <span style={{color:'white'}}>+0.8%</span>
                </Box>

                <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'flex-end',
                        flexShrink: 0,
                        justifyContent: 'center' 
                        }}>
                    <Button
                        variant="contained"
                        startIcon={<CachedIcon />}
                        endIcon={<ArrowRightIcon />}
                        sx={{
                            transform: 'rotate(90deg)',
                            transformOrigin: 'center',
                            height: 'auto',
                            width:188,
                            padding: 1,
                            backgroundColor: 'white',
                            color:'black',
                            boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset'
                        }}
                    >
                        Get Balance
                    </Button>
                </Box>
            </Paper>
        </Grid>
        
        <Grid item xs={12} sm={12} md={6}>
            <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ textAlign: 'center', mr:{xs:0, sm:'59%', md:21}, mb:1 }}>Crypto Overview</Typography>

            <Grid container>
                <Grid item xs={12} sm={12} md={6}>
                    {pieData.map((entry, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                        <Box sx={{ width: '1rem', height: '1rem', backgroundColor: entry.color, marginRight: '0.5rem' }}></Box>
                        <Typography variant="body2" >{entry.name}</Typography>
                        <Typography variant="body2" sx={{  marginLeft: '0.5rem' }}>{entry.value}%</Typography>
                        </Box>
                    ))}
                </Grid>

                <Grid item xs={12} sm={12} md={6} sx={{}}>
                    <PieChart width={100} height={100}>
                        <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={50} fill="#8884d8">
                        {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </Grid>
            </Grid>
            </Box>
        </Grid>

    </Grid>
    </Paper>
    );
  };


export default WalletCard;