import React from 'react';
import { Box, Typography, Grid, Menu, MenuItem, IconButton, Select, FormControl, InputLabel   } from '@mui/material';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import axiosInstance from '../Authentication/axios';
import { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



// Currency wise icon
const getCurrencyIcon = (currency)=> {
    switch (currency) {
        case 'USD':
            return '$'
        case 'EUR':
            return '€'
        case 'INR':
            return '₹'
        case 'GBP':
            return '£'
    
        default:
            return '$';
    }
};



// All balances of Merchant (Mature, Imature etc.)
export default function MerchantAccountBalance({userID}) {
    const [accountBalance, setAccountBalance]     = useState([]);        // Account balance                       \\
    const [currencies, setCurrencies]             = useState([]);       // currencies fetcehd from APi             \\
    const [selectedCurrency, setSelectedCurrency] = useState('USD');   // Selected Available balance currency state \\
    const [maturedCurrency, setMaturedCurrency]   = useState('USD');  // Selected Matured Currency                   \\
    const [immatureCurrency, setImmatureCurrency] = useState('USD'); // Selected Immatured Currency                   \\
    const [maturedBalance, setMaturedBalance]     = useState([]);   // Matured balance currency wise                   \\
    const [immatureBalance, setImmatureBalance]   = useState([]);  // Immature Balance currency wise                    \\



    // Selected currency method
    const handleCurrencyChange = (event) => {
        setSelectedCurrency(event.target.value);
    };

    // Selected Matured currency method
    const handleMaturedCurrencyChange = (event) => {
        setMaturedCurrency(event.target.value);
    };

    // Selected Immatured currency method
    const handleImmaturedCurrencyChange = (event) => {
        setImmatureCurrency(event.target.value);
    };
    

    // Fetch merchant account balance
    useEffect(() => {
      axiosInstance.get(`/api/v4/admin/merchant/account/balance/${userID}`).then((res)=> {
        // console.log(res.data)
        if (res.status === 200) {
            setAccountBalance(res.data.merchant_balance_data)
        }

      }).catch((error)=> {
        console.log(error);

      })
    }, []);


    // fetch account balance currency wise
    useEffect(() => {
       if (selectedCurrency) {
            axiosInstance.get(`/api/v4/admin/merchant/account/balance/${userID}/?currency=${selectedCurrency}`).then((res)=> {
                // console.log(res.data)
                if (res.status === 200) {
                    setAccountBalance(res.data.merchant_balance_data)
                }
        
            }).catch((error)=> {
                console.log(error);
        
            })
       };

       if (maturedCurrency) {
            axiosInstance.get(`/api/v4/admin/merchant/mature/account/balance/${userID}/?currency=${maturedCurrency}`).then((res)=> {
                // console.log(res.data)
                if (res.status === 200) {
                    setMaturedBalance(res.data.merchant_mature_balance)
                }

            }).catch((error)=> {
                console.log(error);
        
            })
       };

       if (immatureCurrency) {
            axiosInstance.get(`/api/v4/admin/merchant/immature/account/balance/${userID}/?currency=${immatureCurrency}`).then((res)=> {
                // console.log(res.data)
                if (res.status === 200) {
                    setImmatureBalance(res.data.merchant_immature_balance)
                }

            }).catch((error)=> {
                console.log(error);
        
            })
       };

    }, [selectedCurrency, maturedCurrency, immatureCurrency]);


    // Fetch all available currencies from API
    useEffect(() => {
      axiosInstance.get(`/api/v2/currency/`).then((res)=> {
         if (res.status === 200) {
            setCurrencies(res.data.currencies)
         }

      }).catch((error)=> {
         console.log(error)
      })
    }, []);
    
    

    return (
        <Grid container spacing={2} sx={{mt:2}}>
            <Grid item xs={12} sm={4}>
                <Box
                sx={{
                backgroundColor: '#f3e8ff', 
                borderRadius: '12px',
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                position: 'relative', // Add this
                }}
            >

                <FormControl
                    sx={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                    }}
                    >
                    <InputLabel id="currency-select-label">Currency</InputLabel>
                    <Select
                        id="currency-select"
                        value={selectedCurrency}
                        onChange={handleCurrencyChange}
                        IconComponent={ExpandMoreIcon}
                        label="Currency"
                        size='small'
                    >
                        {currencies.map((curr, index) => (
                        <MenuItem key={index} value={curr?.name || ''}>
                            {curr.name}
                        </MenuItem>
                        ))}
                    </Select>
                    </FormControl>

                <Box
                sx={{
                    backgroundColor: '#d5b3ff', 
                    borderRadius: '50%',
                    padding: '8px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mb: 2, 
                }}
                >
                <LocalAtmIcon sx={{ color: '#7a1ea1', fontSize: '32px' }} />
                </Box>

                <Typography variant="subtitle1" sx={{ color: '#666666', fontWeight: '500' }}>
                Available Balance
                </Typography>

                <Typography variant="h6" sx={{ fontWeight: '700', color: '#000000' }}>
                    {getCurrencyIcon(selectedCurrency)} {accountBalance?.account_balance || 0}
                </Typography>
            </Box>
        </Grid>

        <Grid item xs={12} sm={4}>
            <Box
                sx={{
                    backgroundColor: '#c4fcef', 
                    borderRadius: '12px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    position: 'relative',
                }}
                >
                    <FormControl
                    sx={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                    }}
                    >
                    <InputLabel id="currency-select-label">Currency</InputLabel>
                    <Select
                        id="currency-select"
                        value={maturedCurrency}
                        onChange={handleMaturedCurrencyChange}
                        IconComponent={ExpandMoreIcon}
                        label="Currency"
                        size='small'
                    >
                        {currencies.map((curr, index) => (
                        <MenuItem key={index} value={curr?.name || ''}>
                            {curr.name}
                        </MenuItem>
                        ))}
                    </Select>
                    </FormControl>

                <Box
                    sx={{
                    backgroundColor: '#00c9a7', 
                    borderRadius: '50%',
                    padding: '8px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mb: 2, 
                    }}
                >
                    <PriceCheckIcon sx={{ color: '#4d8076', fontSize: '32px' }} />
                </Box>

                <Typography variant="subtitle1" sx={{ color: '#666666', fontWeight: '500' }}>
                    Mature Balance
                </Typography>

                <Typography variant="h6" sx={{ fontWeight: '700', color: '#000000' }}>
                    {getCurrencyIcon(maturedCurrency)} {maturedBalance ? maturedBalance : accountBalance?.mature_balance || 0}
                </Typography>
            </Box>
        </Grid>


        <Grid item xs={12} sm={4}>
            <Box
                sx={{
                    backgroundColor: '#ddeef5', 
                    borderRadius: '12px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    position: 'relative',
                }}
                >
                    <FormControl
                    sx={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                    }}
                    >
                    <InputLabel id="currency-select-label">Currency</InputLabel>
                    <Select
                        id="currency-select"
                        value={immatureCurrency}
                        onChange={handleImmaturedCurrencyChange}
                        IconComponent={ExpandMoreIcon}
                        label="Currency"
                        size='small'
                    >
                        {currencies.map((curr, index) => (
                        <MenuItem key={index} value={curr?.name || ''}>
                            {curr.name}
                        </MenuItem>
                        ))}
                    </Select>
                    </FormControl>

                <Box
                    sx={{
                    backgroundColor: '#3588a3', 
                    borderRadius: '50%',
                    padding: '8px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mb: 2, 
                    }}
                >
                    <MoneyOffIcon sx={{ color: '#2c73d2', fontSize: '32px' }} />
                </Box>

                <Typography variant="subtitle1" sx={{ color: '#666666', fontWeight: '500' }}>
                    Immature Balance
                </Typography>

                <Typography variant="h6" sx={{ fontWeight: '700', color: '#000000' }}>
                    {getCurrencyIcon(immatureCurrency)} {immatureBalance ? immatureBalance : accountBalance?.immature_balance || 0}
                </Typography>
            </Box>
        </Grid>
    </Grid>
    );
};