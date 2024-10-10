import React from 'react';
import { Box, Typography, Grid, TextField, MenuItem, Button, Select, FormControl, 
        InputLabel, Paper   } from '@mui/material';
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
    const [accountBalance, setAccountBalance]      = useState([]);        // Account balance                       \\
    const [currencies, setCurrencies]              = useState([]);       // currencies fetcehd from APi             \\
    const [selectedCurrency, setSelectedCurrency]  = useState('USD');   // Selected Available balance currency state \\
    const [maturedCurrency, setMaturedCurrency]    = useState('USD');  // Selected Matured Currency                   \\
    const [immatureCurrency, setImmatureCurrency]  = useState('USD'); // Selected Immatured Currency                   \\
    const [frozenCurrency, setFrozenCurrency]      = useState('USD'); 
    const [maturedBalance, setMaturedBalance]      = useState([]);   // Matured balance currency wise                   \\
    const [immatureBalance, setImmatureBalance]    = useState([]);  // Immature Balance currency wise
    const [frozenBalance, setFrozenBalance]        = useState([]);
    const [minimumWithdrawal, setMiniumWithdrawal] = useState(0);
    const [settlementPeriod, setSettlementPeriod]  = useState('');
    const [error, setError]                        = useState('');
    const [successMessage, setSuccessMessage]      = useState('');





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

    // Selected Immatured currency method
    const handleFrozenCurrencyChange = (event) => {
        setFrozenCurrency(event.target.value);
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

       // For Immature selected currency
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

       // For Immature selected currency
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

       // For Immature selected currency
       if (frozenCurrency) {
            axiosInstance.get(`/api/v4/admin/merchant/frozen/account/balance/${userID}/?currency=${frozenCurrency}`).then((res)=> {
                // console.log(res.data)
                if (res.status === 200) {
                    setFrozenBalance(res.data.merchant_frozen_balance)
                }

            }).catch((error)=> {
                console.log(error);
        
            })
       };

    }, [selectedCurrency, maturedCurrency, immatureCurrency, frozenCurrency]);


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
    
    // Get settlement period, minimum amount
    useEffect(() => {
      axiosInstance.get(`/api/v7/admin/merchant/balance/period/${userID}/`).then((res)=> {
        // console.log(res.data)

        if (res.status === 200) {
            setMiniumWithdrawal(res.data.minimum_withdrawal_amount)
            setSettlementPeriod(res.data.settlement_period)
        }

      }).catch((error)=> {
        console.log(error)

      })
    }, []);

    // Update Settlement Period
    const handlechangeSettlemenetPeriod = (e)=> {
        const value = e.target.value;
        setSettlementPeriod(value);
    };

    // Update minimum withdrawal amount
    const handlechangeWithdrawalAmount = (e)=> {
        const value = e.target.value;
        setMiniumWithdrawal(value)
    };
    

    // Update settlement period and withdrawal amount
    const handleUpdateSettleMentPeriod = ()=> {
        if (settlementPeriod === '') {
            setError('Select Settlement Period')
        } else if (minimumWithdrawal === '') {
            setError('Please type minimum withdrawal amount')
        } else {
            setError('')

            axiosInstance.put(`/api/v7/admin/merchant/update/period/`, {
                merchant_id: userID,
                settlement_period: settlementPeriod,
                minimum_withdrawal_amt: parseFloat(minimumWithdrawal)

            }).then((res)=> {
                // console.log(res)
                if (res.status === 200) {
                    setSuccessMessage('Updated Successfully');
                }

            }).catch((error)=> {
                console.log(error)

            });
        }
    };


    // Remove Success and Error message
    useEffect(() => {
      if (error || successMessage) {
        setTimeout(() => {
            setError('');
            setSuccessMessage('');
        }, 2500);
      }
    }, [error, successMessage])
    
    

    return (
        <Grid container spacing={2} sx={{mt:2}}>
            <Grid item xs={12} sm={3}>
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
                        name='availableBalanceCurrency'
                        value={selectedCurrency}
                        onChange={handleCurrencyChange}
                        IconComponent={ExpandMoreIcon}
                        label="Currency"
                        size='small'
                    >
                        {currencies?.length > 0 ? (
                            currencies.map((curr, index) => (
                                <MenuItem key={index} value={curr?.name || ''}>
                                    {curr.name}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem value="">
                                No currencies available
                            </MenuItem>
                        )}
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

            <Grid item xs={12} sm={3}>
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
                            name='matureCurrency'
                            value={maturedCurrency}
                            onChange={handleMaturedCurrencyChange}
                            IconComponent={ExpandMoreIcon}
                            label="Currency"
                            size='small'
                        >
                            {currencies?.length > 0 ? (
                                currencies.map((curr, index) => (
                                    <MenuItem key={index} value={curr?.name || ''}>
                                        {curr.name}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem value="">
                                    No currencies available
                                </MenuItem>
                            )}
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
                        {getCurrencyIcon(maturedCurrency)} {maturedBalance}
                    </Typography>
                </Box>
            </Grid>


            <Grid item xs={12} sm={3}>
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
                            name='immatureCurrency'
                            value={immatureCurrency}
                            onChange={handleImmaturedCurrencyChange}
                            IconComponent={ExpandMoreIcon}
                            label="Currency"
                            size='small'
                        >
                            {currencies?.length > 0 ? (
                                currencies.map((curr, index) => (
                                    <MenuItem key={index} value={curr?.name || ''}>
                                        {curr.name}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem value="">
                                    No currencies available
                                </MenuItem>
                            )}
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
                        {getCurrencyIcon(immatureCurrency)} {immatureBalance}
                    </Typography>
                </Box>
            </Grid>

            <Grid item xs={12} sm={3}>
                <Box
                    sx={{
                        backgroundColor: '#fefedf', 
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
                            name='frozenCurrency'
                            value={frozenCurrency}
                            onChange={handleFrozenCurrencyChange}
                            IconComponent={ExpandMoreIcon}
                            label="Currency"
                            size='small'
                        >
                            {currencies?.length > 0 ? (
                                currencies.map((curr, index) => (
                                    <MenuItem key={index} value={curr?.name || ''}>
                                        {curr.name}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem value="">
                                    No currencies available
                                </MenuItem>
                            )}
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
                        Frozen Balance
                    </Typography>

                    <Typography variant="h6" sx={{ fontWeight: '700', color: '#000000' }}>
                        {getCurrencyIcon(frozenCurrency)} {frozenBalance}
                    </Typography>
                </Box>
            </Grid>

            {/* Edit Section */}
            {/* <Grid container> */}
                <Paper
                elevation={3}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    padding: 3,
                    borderRadius: '20px',
                    backgroundColor: '#fff',
                    mt:2,
                    width:'100%'
                }}
            >
                <Grid container spacing={6} sx={{display:'flex', justifyContent:'center'}}>
                    {/* Settlement Period */}
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-select-small-label">Settlement Period</InputLabel>
                            <Select
                                id="demo-select-small"
                                value={settlementPeriod}
                                label="Settlement Period"
                                onChange={handlechangeSettlemenetPeriod}
                            >
                                <MenuItem value='1 Day'>1 Day</MenuItem>
                                <MenuItem value='2 Days'>2 Days</MenuItem>
                                <MenuItem value='3 Days'>3 Days</MenuItem>
                                <MenuItem value='4 Days'>4 Days</MenuItem>
                                <MenuItem value='5 Days'>5 Days</MenuItem>
                                <MenuItem value='6 Days'>6 Days</MenuItem>
                                <MenuItem value='7 Days'>7 Days</MenuItem>
                                <MenuItem value='8 Days'>8 Days</MenuItem>
                                <MenuItem value='9 Days'>9 Days</MenuItem>
                                <MenuItem value='10 Days'>10 Days</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    
                    {/* Minimum Amount */}
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="Minium Withdrawal Amount"
                            variant="outlined"
                            size="small"
                            value={minimumWithdrawal}
                            onChange={handlechangeWithdrawalAmount}
                        />
                    </Grid>
                </Grid>

                {/* Action Buttons */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 2,
                        marginTop: 2,
                    }}
                >
                    <Button variant="contained" color="error">
                        Cancel
                    </Button>

                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={handleUpdateSettleMentPeriod}>
                        Update
                    </Button>
                </Box>

                <p style={{color:'red', display:'flex', justifyContent:'center'}}>{error && error}</p>
                <p style={{color:'green', display:'flex', justifyContent:'center'}}>{successMessage && successMessage}</p>

            </Paper>
            </Grid>

        // </Grid>
    );
};