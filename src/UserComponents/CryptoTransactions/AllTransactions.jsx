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


// Transaction Type Color
const getTransactionTypeColor = (type)=> {
    switch (type) {
        case 'Buy':
            return 'success'
        case 'Sell':
            return 'error'
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



// Get all Crypto Transactions
export default function AllCryptoTransactions({open}) {
    const navigate      = useNavigate();
    const theme         = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    
    const [cryptoTransactions, updateCryptoTransactions] = useState([]);  // All Transactions
    const [totalRows, updateTotalRows]       = useState(0);     // Paginated Rows
    const [exportData, updateExportData]     = useState([]);
    const [showFilters, setShowFilters]      = useState(false);  // Filter fileds state
    const [filterDate, setFilterDate]        = useState('');  // Filter date state field
    const [filterError, setFilterError]      = useState('');  // Error message of filter
    const [LgStartDateRange, setLgStartDateRange]   = useState('');  // Large Screen Start date
    const [LgEndDateRange, setLgEndDateRange]       = useState('');  // Large Screen End Date
    const [ShStartDateRange, setShStartDateRange]   = useState('');  // Small screen Start date
    const [ShEndDateRange, setShEndDateRange]       = useState('');  // Small Screen End date
    const [filterCrypto, setFilterCrypto]           = useState('');  // Filter Selected Crypto
    const [filterStatus, setFilterStatus]           = useState('');  // Filter Selected Status
    const [filterData, updateFilterData]     = useState({
        user_email: ''
    });

    const counPagination = Math.ceil(totalRows);   // Total pagination count

    /// Open close Filter fields
    const handleToggleFilters = () => {
        setShowFilters(!showFilters);
    };


    // Get Filter Data
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


    // Reset Filter Method
    const handleResetFilter = ()=> {
        setFilterDate('');
        setFilterCrypto('');
        setFilterStatus('');
        updateFilterData({
            user_email:''
        })
        handlePaginatedData('e', 1)
    };


    // Fetch all the Crypto Transactions
    useEffect(() => {
        axiosInstance.get(`/api/v3/admin/crypto/transactions/`).then((res)=> {
          // console.log(res)
          if (res.status === 200 && res.data.success === true) {
                const sortedTransaction = res.data.crypto_transactions.sort((a,b)=> {
                    return new Date(b.created_at) - new Date(a.created_at)
                })
                updateCryptoTransactions(sortedTransaction)
                updateTotalRows(res.data.total_row_count)
        }
  
        }).catch((error)=> {
            // console.log(error)

            if (error.response.data.message === 'Unauthorized') {
                window.location.href = '/signin/'
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
            saveAs(blob, 'cryptoTransactions.xlsx');
        } else {
            console.log('No Data available to Download')
        }
    };



    // Download all Deposit transactions
    const handleDownloadCryptoTransactions = ()=> {
        axiosInstance.get(`/api/v2/admin/export/crypto/transactions/`).then((res)=> {
            // console.log(res)
    
            if (res.status === 200 && res.data.success === true) {
                updateExportData(res.data.export_crypto_transactions_data);
                
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
        let limit = 5;
        let offset = (value - 1) * limit;

        axiosInstance.get(`/api/v3/admin/crypto/transactions/?limit=${limit}&offset=${offset}`).then((res)=> {
            // console.log(res)
            const sortedTransaction = res.data.crypto_transactions.sort((a,b)=> {
                return new Date(b.created_at) - new Date(a.created_at)
            })
            updateCryptoTransactions(sortedTransaction)

        }).catch((error)=> {
            // console.log(error);

        })
    };


    // Method to redirect the user to Edit page
    const handleEditClicked = (transaction)=> {
        navigate('/admin/user/update/crypto/transactions/', {state: {transaction: transaction}})
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



    //// API Call to get Filter Data
    const GetFilterData = (startDate, endDate)=> {
          axiosInstance.post(`/api/v3/admin/crypto/transactions/`, {
            date_range: filterDate,
            user_email: filterData.user_email,
            crypto_name: filterCrypto,
            status: filterStatus,
            start_date: startDate ? startDate : LgStartDateRange,
            end_date: endDate ? endDate : LgEndDateRange

        }).then((res)=> {
            // console.log(res)

            if (res.status === 200) {
                const sortedTransaction = res.data.filtered_data.sort((a,b)=> {
                    return new Date(b.created_at) - new Date(a.created_at)
                })
                updateCryptoTransactions(sortedTransaction)
            }

        }).catch((error)=> {
            // console.log(error)

            setTimeout(() => {
                setFilterError('');
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
                            <b>All Crypto Transactions</b>
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
                                    <TableCell align="center"><b>Crypto</b></TableCell>
                                    <TableCell align="center"><b>Transaction Type</b></TableCell>
                                    <TableCell align="center"><b>Amount</b></TableCell>
                                    <TableCell align="center"><b>Status</b></TableCell>
                                    <TableCell align="center"><b>Edit</b></TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {cryptoTransactions.map((transaction, index) => (
                                    <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        {/* Date time Column */}
                                        <TableCell scope="row">
                                            <Box display="flex" alignItems="center">
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

                                        {/* Transaction Type Column */}
                                        <TableCell component="th" scope="row" align="center">
                                            <Chip label={transaction?.type || ''} variant="filled" color={getTransactionTypeColor(transaction?.type || '')} />
                                        </TableCell>

                                        <TableCell component="th" scope="row" align="center">
                                            {transaction?.amount || ''} {transaction?.currency || ''}
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