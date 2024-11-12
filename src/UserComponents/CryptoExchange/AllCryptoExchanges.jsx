import { Main, DrawerHeader } from "../../Components/Content";
import { Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Paper, Box, Typography, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import axiosInstance from '../../Components/Authentication/axios';
import ModeEditSharpIcon from '@mui/icons-material/ModeEditSharp';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Pagination from '@mui/material/Pagination';
import Input from '@mui/joy/Input';
import Button from '../../Components/MUIBaseButton/button';
import { useNavigate } from "react-router-dom";
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { useTheme } from '@mui/material/styles';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useMediaQuery } from '@mui/material';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import {Button as JoyButton} from '@mui/joy';
import FormControl from '@mui/material/FormControl';
import Tooltip from '@mui/material/Tooltip';
import ClearIcon from '@mui/icons-material/Clear';
import CircularProgress from '@mui/material/CircularProgress';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { DatePicker } from 'antd';


const { RangePicker } = DatePicker;




// Change status color according to the transaction status
const getStatusColor = (status)=> {
    switch (status) {
        case 'Hold':
             return 'primary'
        case 'Cancelled':
            return 'error'
        case 'Approved':
            return 'success'
        case 'Pending':
            return 'warning'
        default:
            return 'primary'
    }
};




// Get Crypto Images
const getCryptoIcons = (icon)=> {
    switch (icon) {
        case 'BTC':
            return '/cryptoicons/BTCS.png'

        case 'ETH':
            return '/cryptoicons/ETH.png'

        case 'XRP':
            return '/cryptoicons/XRP.png'

        case 'DOGE':
            return '/cryptoicons/DOGE.png'

        case 'LTC':
            return '/cryptoicons/LTC.png'

        case 'TOR':
            return '/cryptoicons/TOR.png'

        case 'SOL':
            return '/cryptoicons/SOL.png'

        default:
            '';
    }
};



//// Currency 
const getCurrencyIcon = (currency)=> { 
    switch (currency) {
        case 'USD':
            return '/currencyIcon/dollar.jpg'
        case 'INR':
            return '/currencyIcon/rupee.JPG'
        case 'EUR':
            return '/currencyIcon/euro.png'
        case 'GBP':
            return '/currencyIcon/gbp.png'
        case 'CNY':
            return '¥'
        default:
            '$';
    }
};




//// All Crypto Exchange Transaction Table
export default function AllCryptoExchangeTable({open}) {
    const navigate      = useNavigate();
    const theme         = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    
    const [cryptoExchangeTransactions, updateCryptoExchangeTransactions] = useState([]);  // All Transactions
    const [totalRows, updateTotalRows]       = useState(0);     // Paginated Rows
    const [exportData, updateExportData]     = useState([]);

    const [showFilters, setShowFilters]      = useState(false);  // Filter fileds state
    const [filterDate, setFilterDate]        = useState('');  // Filter date state field
    const [filterError, setFilterError]      = useState('');  // Error message of filter
    const [loader, setLoader]                = useState(true);
    const [LgStartDateRange, setLgStartDateRange]   = useState('');  // Large Screen Start date
    const [LgEndDateRange, setLgEndDateRange]       = useState('');  // Large Screen End Date
    const [ShStartDateRange, setShStartDateRange]   = useState('');  // Small screen Start date
    const [ShEndDateRange, setShEndDateRange]       = useState('');  // Small Screen End date
    const [filterCrypto, setFilterCrypto]           = useState('');  // Filter Selected Crypto
    const [filterStatus, setFilterStatus]           = useState('');  // Filter Selected Status
    const [filterActive, setFilterActive]           = useState(false); /// Filter active state
    const [filterData, updateFilterData]     = useState({
        user_email: ''
    }); ////

    const counPagination = Math.ceil(totalRows);   // Total pagination count


    /// Open close Filter fields
    const handleToggleFilters = () => {
        setShowFilters(!showFilters);
    };

    // Get Filter Selected Date
    const handleFilterDateChange = (e, newValue)=> {
        setFilterDate(newValue);
    };

    //// Get Filter Selected Crypto
    const handleFilterCryptoChange = (e, newValue)=> {
        setFilterCrypto(newValue)
    };

    //// Get Filter Selected Status
    const handleFilterStatusChange = (e, newValue)=> {
        setFilterStatus(newValue)
    };

    /// Date Range Selected in Large Screen
    const handelLargeScreenCustomDateRange = (date,dateString)=> {
        setLgStartDateRange(dateString[0])
        setLgEndDateRange(dateString[1])
    };

    /// Small Screen Start date range
    const handleSmallScreenStartDateRange = (date,dateString)=> {
        setShStartDateRange(dateString)
    };

    /// Small Screen End Date Range
    const handleSmallScreenEndDateRange = (date,dateString)=> {
        setShEndDateRange(dateString)
    };


    // Get Filter Input data
    const handleFilterInputDataChange = (e)=> {
        const {name, value} = e.target;

        updateFilterData({
            ...filterData,
            [name]: value
        })
    };


    // Fetch all the Crypto Exchange Transactions
    useEffect(() => {
        axiosInstance.get(`/api/v6/admin/crypto/exchange/`).then((res)=> {
          // console.log(res)
          if (res.status === 200 && res.data.success === true) {
                updateCryptoExchangeTransactions(res.data.admin_user_crypto_exchange_data)
                updateTotalRows(res.data.paginated_rows)
                setLoader(false);
            }
  
        }).catch((error)=> {
            // console.log(error)
            if (error.response.data.message === 'Unauthorized') {
                window.location.href = '/signin/'
            } else if (error.response.data.message === 'No transaction found') {
                setLoader(false);
                updateCryptoExchangeTransactions([]);
            }
        })
      }, []);


    // Export to Excel
    const exportToExcel = async ()=> {
        if (exportData && exportData.length > 0) {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('sheet1')

            const headers = Object.keys(exportData[0])

            worksheet.addRow(headers)

            exportData.forEach((item)=> {
                worksheet.addRow(Object.values(item))
            })

            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, 'CryptoExchange.xlsx');
        } else {
            console.log('No Data available to Download')
        }
    };



    // Download all Deposit transactions
    const handleDownloadCryptoTransactions = ()=> {
        axiosInstance.get(`/api/v6/admin/export/crypto/exchange/`).then((res)=> {
            // console.log(res)
    
            if (res.status === 200 && res.data.success === true) {
                updateExportData(res.data.exchange_export_data);
                
                setTimeout(() => {
                    exportToExcel();
                }, 1000);
            };
    
          }).catch((error)=> {
            // console.log(error)
          })
    };


    // Get the paginated data
    const handlePaginatedData = (e, value)=> {
        let limit = 10;
        let offset = (value - 1) * limit;

        if (filterActive) {
            if (isSmallScreen && filterDate === 'CustomRange') {
                if (!ShStartDateRange) {
                    setFilterError('Please Select Start Date');
    
                } else if (!ShEndDateRange) {
                    setFilterError('Please Select End Date');
    
                } else {
                    setFilterError('');
                    GetFilteredPaginatedData(ShStartDateRange, ShEndDateRange, limit, offset);
                }
    
            } else if (!isSmallScreen && filterDate === 'CustomRange') {
                if (!LgStartDateRange) {
                    setFilterError('Please Select Date Range');
    
                } else if (!LgEndDateRange) {
                    setFilterError('Please Select Date Range');
    
                } else {
                    setFilterError('');
                    GetFilteredPaginatedData(LgStartDateRange, LgEndDateRange, limit, offset);
                }
    
            } else {
                setFilterError('');
                GetFilteredPaginatedData(LgStartDateRange, LgEndDateRange, limit, offset);
            }

        } else {
            axiosInstance.get(`/api/v6/admin/crypto/exchange/?limit=${limit}&offset=${offset}`).then((res)=> {
                // console.log(res)
                if (res.status === 200 && res.data.success === true) {
                    updateCryptoExchangeTransactions(res.data.admin_user_crypto_exchange_data)
                };
    
            }).catch((error)=> {
                // console.log(error);
            })
        }
    };


    // Method to redirect the user to Edit page
    const handleEditClicked = (transaction)=> {
        navigate('/admin/user/update/crypto/exchange/', {state: {transaction: transaction}})
    };
    
    

    // Get filtered data
    const handleFilterData = ()=> {
        if (isSmallScreen && filterDate === 'CustomRange') {
            if (!ShStartDateRange) {
                setFilterError('Please Select Start Date');

            } else if (!ShEndDateRange) {
                setFilterError('Please Select End Date');

            } else {
                setFilterError('');
                GetFilterData(ShStartDateRange, ShEndDateRange);
            }

        } else if (!isSmallScreen && filterDate === 'CustomRange') {
            if (!LgStartDateRange) {
                setFilterError('Please Select Date Range');

            } else if (!LgEndDateRange) {
                setFilterError('Please Select Date Range');

            } else {
                setFilterError('');
                GetFilterData(LgStartDateRange, LgEndDateRange);
            }

        } else {
            setFilterError('');
            GetFilterData();
        }
    };

    
    //// Call API to get filter data
    const GetFilterData = (startDate, endDate)=> {
        axiosInstance.post(`/api/v6/admin/filter/crypto/exchange/transactions/`, {
            dateTime: filterDate,
            email:  filterData.user_email,
            crypto: filterCrypto,
            status: filterStatus,
            start_date: startDate ? startDate : LgStartDateRange,
            end_date: endDate ? endDate : LgEndDateRange

        }).then((res)=> {
            // console.log(res)
            
            if (res.status === 200) {
                updateCryptoExchangeTransactions(res.data.filtered_crypto_exchange_transaction);
                updateTotalRows(res.data.paginated_count);
                setFilterActive(true);
            }

        }).catch((error)=> {
            // console.log(error)

            setTimeout(() => {
                setFilterError('')
            }, 2000);

            if (error.response.data.message === 'No data found') {
                setFilterError('No data found')
            } else if (error.response.data.message === 'Invalid Email') {
                setFilterError('Invalid Email Address')
            } else if (error.response.data.message === 'Unauthorized') {
                window.location.href = '/signin/'
            } else {
                setFilterError('')
            };
        })
    };


    
  //// Get filtered paginated data from API
  const GetFilteredPaginatedData = (startDate, endDate, limit, offset)=> {
        axiosInstance.post(`/api/v6/admin/filter/crypto/exchange/transactions/?limit=${limit}&offset=${offset}`, {
            dateTime: filterDate,
            email:  filterData.user_email,
            crypto: filterCrypto,
            status: filterStatus,
            start_date: startDate ? startDate : LgStartDateRange,
            end_date: endDate ? endDate : LgEndDateRange

        }).then((res)=> {
            // console.log(res);
            if (res.status === 200 && res.data.success === true) {
                updateCryptoExchangeTransactions(res.data.filtered_crypto_exchange_transaction);
                updateTotalRows(res.data.paginated_count);
                setFilterActive(true);
            }

        }).catch((error)=> {
            // console.log(error);
            setTimeout(() => {
                setFilterError('')
            }, 2000);

            if (error.response.data.message === 'No data found') {
                setFilterError('No data found')
            } else if (error.response.data.message === 'Invalid Email') {
                setFilterError('Invalid Email Address')
            } else if (error.response.data.message === 'Unauthorized') {
                window.location.href = '/signin/'
            } else {
                setFilterError('')
            };
        })
    };


     // Reset Filter Method
     const handleResetFilter = ()=> {
        setFilterActive(false);
        setFilterDate('');
        setLgStartDateRange('');
        setLgEndDateRange('');
        setShStartDateRange('');
        setShEndDateRange('');
        setFilterError('');
        setFilterCrypto('');
        setFilterStatus('');
        updateFilterData({
            user_email:''
        })
    };

    //// Call default pagination after filter mode off
    useEffect(() => {
        if (!filterActive) {
            handlePaginatedData('e', 1);
        }
    }, [!filterActive]);



    /// Loader
    if (loader) {
        return (
            <Main open={open}>
                <DrawerHeader/>
                <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', height: '100vh'}}>
                    <CircularProgress />
                </Box>
            </Main>
        );
    };



    //// If not Data is available
    if (cryptoExchangeTransactions.length === 0) {
        return (
            <Main open={open}>
                <DrawerHeader/>
                <TableContainer>
                    <Box sx={{ maxHeight: '90rem', overflow: 'auto' }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead sx={{ position: 'sticky', zIndex: 1, top: 0, backgroundColor: '#e2f4fb' }}>
                                <TableRow>
                                    <TableCell align="center"><b>Date</b></TableCell>
                                    <TableCell align="center"><b>User</b></TableCell>
                                    <TableCell align="center"><b>Email</b></TableCell>
                                    <TableCell align="center"><b>From Crypto</b></TableCell>
                                    <TableCell align="center"><b>FIAT Amount</b></TableCell>
                                    <TableCell align="center"><b>Amount</b></TableCell>
                                    <TableCell align="center"><b>Status</b></TableCell>
                                    <TableCell align="center"><b>Edit</b></TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody sx={{ height: '40vh' }}>
                                <TableRow>
                                    <TableCell colSpan={8}>
                                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                            <ClearIcon fontSize="large" />
                                        </Box>
                                        <p style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>Nothing to Show</p>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Box>
                </TableContainer>                  
            </Main>
        )
    };



    return (
        <Main open={open}>
            <DrawerHeader/>
                <Paper elevation={3} sx={{p:1, borderRadius: '20px'}}> 
                    <Box 
                        sx={{
                            display: 'flex', 
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            p:2,
                            }}>
                        <Typography 
                            variant="h5"
                            sx={{
                            fontSize: {
                                xs:'0.9rem',
                                sm:'1.1rem',
                                md:'1.3rem'
                            },
                            margin:0
                            }}
                        >
                            <b>All Crypto Exchange Transactions</b>
                        </Typography>

                        {/* For small screen sizes */}
                        {isSmallScreen ? (
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <IconButton aria-label="export" onClick={handleDownloadCryptoTransactions}>
                                    <FileDownloadIcon color='primary' />
                                </IconButton>

                                <IconButton aria-label="filter" onClick={handleToggleFilters}>
                                    <FilterAltIcon color='primary' />
                                </IconButton>
                            </div>
                            ) : (
                            <div>
                                <Button sx={{ mx: 1 }} onClick={handleDownloadCryptoTransactions}>Export</Button>
                                <Button sx={{ mx: 1 }} onClick={handleToggleFilters} >Filter</Button>
                            </div>
                        )}
                    </Box>

                    {/* Hidden Filter fields */}
                    {showFilters && (
                        <>
                        <Grid container p={2} justifyContent="flex-end" spacing={2}>
                            <Grid item xs={12} sm={6} md={2.5}>
                                <FormControl fullWidth>
                                    <Select
                                        label="date"
                                        placeholder='Date'
                                        id="date"
                                        name="date"
                                        value={filterDate}
                                        onChange={(e, newValue) => handleFilterDateChange(e, newValue)}
                                        indicator={<KeyboardArrowDown />}
                                        sx={{
                                            [`& .${selectClasses.indicator}`]: {
                                              transition: '0.2s',
                                              [`&.${selectClasses.expanded}`]: {
                                                transform: 'rotate(-180deg)',
                                              },
                                            },
                                          }}
                                    >
                                        <Option value="Today">Today</Option>
                                        <Option value="Yesterday">Yesterday</Option>
                                        <Option value="ThisWeek">This Week</Option>
                                        <Option value="ThisMonth">This Month</Option>
                                        <Option value="PreviousMonth">Previous Month</Option>
                                        <Option value="CustomRange">Custom Range</Option>
                                    </Select>
                                </FormControl>

                                {filterDate === "CustomRange" && (
                                    isSmallScreen ? (
                                        <>
                                            <DatePicker style={{ width: '100%', marginTop:5 }} onChange={handleSmallScreenStartDateRange} />
                                            <DatePicker style={{ width: '100%', marginTop:5 }} onChange={handleSmallScreenEndDateRange} />
                                        </>
                                    ) : (
                                        <RangePicker 
                                            style={{ width: '100%', marginTop:5 }} onChange={handelLargeScreenCustomDateRange} 
                                            />
                                    )
                                )}
                            </Grid>

                            <Grid item xs={12} sm={6} md={2.5}>
                                <FormControl fullWidth>
                                    <Input 
                                    placeholder="User Email" 
                                    name='user_email'
                                    value={filterData.user_email}
                                    onChange={handleFilterInputDataChange}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} md={2.5}>
                                <FormControl fullWidth>
                                    <Select
                                        label="Crypto"
                                        placeholder='Crypto'
                                        id="crypto"
                                        name="crypto"
                                        value={filterCrypto}
                                        onChange={(e, newValue) => handleFilterCryptoChange(e, newValue)}
                                        indicator={<KeyboardArrowDown />}
                                        sx={{
                                            [`& .${selectClasses.indicator}`]: {
                                              transition: '0.2s',
                                              [`&.${selectClasses.expanded}`]: {
                                                transform: 'rotate(-180deg)',
                                              },
                                            },
                                          }}
                                    >
                                        <Option value="BTC">BTC</Option>
                                        <Option value="ETH">ETH</Option>
                                        <Option value="SOL">SOL</Option>
                                        <Option value="XRP">XRP</Option>
                                        <Option value="LTC">LTC</Option>
                                        <Option value="BNB">BNB</Option>
                                        <Option value="DOGE">DOGE</Option>
                                    </Select>
                                    
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} md={2.5}>
                                <FormControl fullWidth>
                                    <Select
                                        placeholder='Status'
                                        id="status"
                                        name="status"
                                        value={filterStatus}
                                        onChange={(e, newValue) => handleFilterStatusChange(e, newValue)}
                                        indicator={<KeyboardArrowDown />}
                                        sx={{
                                            [`& .${selectClasses.indicator}`]: {
                                              transition: '0.2s',
                                              [`&.${selectClasses.expanded}`]: {
                                                transform: 'rotate(-180deg)',
                                              },
                                            },
                                          }}
                                    >
                                        <Option value="Pending">Pending</Option>
                                        <Option value="Approved">Approved</Option>
                                        <Option value="Cancelled">Cancelled</Option>
                                        <Option value="Hold">On Hold</Option>
                                    </Select>
                                </FormControl>
                            </Grid>
                            
                            <Grid item xs={6} sm={6} md={1}>
                                <FormControl fullWidth>
                                    <JoyButton 
                                    onClick={handleFilterData}
                                    >
                                        Submit
                                    </JoyButton>
                                </FormControl>
                            </Grid>

                            <Grid item xs={6} sm={6} md={1}>
                                <FormControl fullWidth>
                                    <JoyButton 
                                    onClick={handleResetFilter}
                                    >
                                        Reset
                                    </JoyButton>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <small style={{color:'red'}}>{filterError && filterError}</small>
                    </>
                )}

                <TableContainer>
                    <Box sx={{ maxHeight: '90rem', overflow: 'auto' }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead sx={{position:'sticky', zIndex: 1, top: 0, backgroundColor: '#e2f4fb'}}>
                                <TableRow>
                                    <TableCell align="center"><b>Date</b></TableCell>
                                    <TableCell align="center"><b>User</b></TableCell>
                                    <TableCell align="center"><b>Email</b></TableCell>
                                    <TableCell align="center"><b>From Crypto</b></TableCell>
                                    <TableCell align="center"><b>FIAT Amount</b></TableCell>
                                    <TableCell align="center"><b>Amount</b></TableCell>
                                    <TableCell align="center"><b>Status</b></TableCell>
                                    <TableCell align="center"><b>Edit</b></TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {cryptoExchangeTransactions.map((transaction, index) => (
                                    <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        {/* Date time Column */}
                                        <TableCell scope="row" align="center">
                                            <Box display="flex" sx={{alignContent:'center'}}>
                                                <Box>
                                                    <Typography variant="body1" fontWeight="bold">
                                                        {transaction?.created_at.split('T')[0] || ''}
                                                    </Typography>

                                                    <Typography variant="body2" color="textSecondary">
                                                        {transaction?.created_at.split('T')[1] || ''}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>

                                        {/* Merchant Name Column */}
                                        <TableCell scope="row" align='left'>
                                            {transaction?.user_name}
                                        </TableCell>

                                        {/* user Email Column */}
                                        <TableCell  scope="row" align='center'>
                                            {transaction?.user_email}
                                        </TableCell>

                                        {/* Crypto Qty Column */}
                                        <TableCell  scope="row" align='center'>
                                            <Tooltip title={transaction?.crypto_name || ''}>
                                                <img src={getCryptoIcons(transaction?.crypto_name || '')} alt="Crypto Image" style={{width:'30px', heigh:'30px'}} />
                                            </Tooltip>
                                        </TableCell>

                                        {/* FIAT Amount Column */}
                                        <TableCell  scope="row" align='center'>
                                            <Tooltip title={transaction?.fiat_currency || ''}>
                                                <img src={getCurrencyIcon(transaction?.fiat_currency || '')} alt={transaction?.fiat_currency || ''} style={{width:'30px', heigh:'30px'}} />
                                            </Tooltip>
                                        </TableCell>

                                        <TableCell component="th" scope="row" align="center">
                                            {transaction?.exchange_crypto_amount || ''} {transaction?.crypto_name || ''}
                                        </TableCell>

                                        {/* Status Column */}
                                        <TableCell component="th" scope="row" align="center">
                                            <Chip label={transaction?.status} variant="outlined" color={getStatusColor(transaction?.status)} />
                                        </TableCell>

                                        <TableCell component="th" scope="row" align="center">
                                            <IconButton aria-label="Example" onClick={()=> {handleEditClicked(transaction)}}>
                                                <ModeEditSharpIcon color='secondary'/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>

                    <Box sx={{display:'flex', justifyContent:'space-between'}}>
                        <Pagination 
                            count={counPagination} 
                            onChange={(e, value)=> {handlePaginatedData(e, value)}}
                            color="primary" 
                            sx={{mb:2, mt:2}} 
                            />
                    </Box>

                </TableContainer>
                </Paper>
        </Main>
    );
};
