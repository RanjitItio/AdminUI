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
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import {Button as JoyButton} from '@mui/joy';
import FormControl from '@mui/material/FormControl';
import Tooltip from '@mui/material/Tooltip';




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




/// All Crypto Transactions
export default function AllCryptoSwapTransaction({open}) {
    const navigate      = useNavigate();
    const theme         = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    
    const [cryptoSwapTransactions, updateCryptoSwapTransactions] = useState([]);  // All Transactions
    const [totalRows, updateTotalRows]       = useState(0);     // Paginated Rows
    const [exportData, updateExportData]     = useState([]);
    const [showFilters, setShowFilters]      = useState(false);  // Filter fileds state
    const [filterDate, setFilterDate]        = useState('');  // Filter date state field
    const [filterError, setFilterError]      = useState('');  // Error message of filter
    const [filterData, updateFilterData]     = useState({
        user_email: '',
        crypto_name: '',
        status: ''
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
        updateFilterData({
            user_email:'',
            crypto_name: '',
            status: ''
        })
        handlePaginatedData('e', 1)
    };


    // Fetch all the Crypto Transactions
    useEffect(() => {
        axiosInstance.get(`/api/v5/admin/crypto/swap/`).then((res)=> {
          // console.log(res)
          if (res.status === 200 && res.data.success === true) {
                updateCryptoSwapTransactions(res.data.admin_swap_data)
                updateTotalRows(res.data.pagination_count)
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
            saveAs(blob, 'cryptoSwap.xlsx');
        } else {
            console.log('No Data available to Download')
        }
    };



    // Download all Deposit transactions
    const handleDownloadCryptoTransactions = ()=> {
        axiosInstance.get(`/api/v5/admin/export/crypto/swap/`).then((res)=> {
            // console.log(res)
    
            if (res.status === 200 && res.data.success === true) {
                updateExportData(res.data.export_admin_swap_data);
                
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

        axiosInstance.get(`/api/v5/admin/crypto/swap/?limit=${limit}&offset=${offset}`).then((res)=> {
            // console.log(res)
            if (res.status === 200 && res.data.success === true) {
                updateCryptoSwapTransactions(res.data.admin_swap_data)
            };

        }).catch((error)=> {
            // console.log(error);
        })
    };


    // Method to redirect the user to Edit page
    const handleEditClicked = (transaction)=> {
        navigate('/admin/user/update/crypto/swap/', {state: {transaction: transaction}})
    };


    // Get filtered data
    const handleFilterData = ()=> {
        axiosInstance.post(`/api/v3/admin/crypto/transactions/`, {
            date_range: filterDate,
            user_email: filterData.user_email,
            crypto_name: filterData.crypto_name,
            status: filterData.status

        }).then((res)=> {
            // console.log(res)
            
            if (res.status === 200) {
                const sortedTransaction = res.data.filtered_data.sort((a,b)=> {
                    return new Date(b.created_at) - new Date(a.created_at)
                })
                // updateCryptoTransactions(sortedTransaction)
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
                            <b>All Crypto Swap Transactions</b>
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
                                    >
                                        <Option value="Today">Today</Option>
                                        <Option value="Yesterday">Yesterday</Option>
                                        <Option value="ThisWeek">This Week</Option>
                                        <Option value="ThisMonth">This Month</Option>
                                        <Option value="PreviousMonth">Previous Month</Option>
                                    </Select>
                                </FormControl>
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
                                    <Input 
                                        name='crypto_name'
                                        value={filterData.crypto_name}
                                        onChange={handleFilterInputDataChange}
                                        placeholder="Crypto Name" 
                                        />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} md={2.5}>
                                <FormControl fullWidth>
                                    <Input 
                                        placeholder="Status"
                                        name='status'
                                        value={filterData.status} 
                                        onChange={handleFilterInputDataChange}
                                        />
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
                                    <TableCell align="center"><b>To Crypto</b></TableCell>
                                    <TableCell align="center"><b>Amount</b></TableCell>
                                    <TableCell align="center"><b>Status</b></TableCell>
                                    <TableCell align="center"><b>Edit</b></TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {cryptoSwapTransactions.map((transaction, index) => (
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
                                            {transaction?.full_name}
                                        </TableCell>

                                        {/* user Email Column */}
                                        <TableCell  scope="row" align='center'>
                                            {transaction?.email}
                                        </TableCell>

                                        {/* Crypto Qty Column */}
                                        <TableCell  scope="row" align='center'>
                                            <Tooltip title={transaction?.from_crypto || ''}>
                                                <img src={getCryptoIcons(transaction?.from_crypto || '')} alt="Crypto Image" style={{width:'30px', heigh:'30px'}} />
                                            </Tooltip>
                                        </TableCell>

                                        {/* Crypto Qty Column */}
                                        <TableCell  scope="row" align='center'>
                                            <Tooltip title={transaction?.to_crypto || ''}>
                                                <img src={getCryptoIcons(transaction?.to_crypto || '')} alt={transaction?.to_crypto || ''} style={{width:'30px', heigh:'30px'}} />
                                            </Tooltip>
                                        </TableCell>

                                        <TableCell component="th" scope="row" align="center">
                                            {transaction?.swap_quantity || ''} {transaction?.from_crypto || ''}
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