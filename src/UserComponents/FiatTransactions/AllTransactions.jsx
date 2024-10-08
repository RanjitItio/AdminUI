import { Main, DrawerHeader } from "../../Components/Content";
import { Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Paper, Box, Grid, 
    Typography} from '@mui/material';
import { useEffect, useState } from 'react';
import axiosInstance from "../../Components/Authentication/axios";
import ModeEditSharpIcon from '@mui/icons-material/ModeEditSharp';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Pagination from '@mui/material/Pagination';
import Input from '@mui/joy/Input';
import SearchIcon from '@mui/icons-material/Search';
import Button from "../../Components/MUIBaseButton/button";
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





// All Fiat Transactions
export default function AllFiatTransactions({open}) {
    const navigate = useNavigate();
    const theme    = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [allTransactions, updateAllTransactions] = useState([]);  // All merchant withdrawals
    const [searchQuery, updateSearchQuery] = useState('');  // Search Query state
    const [exportData, updateExportData] = useState([]); // Excel Data
    const [totalRows, updateTotalRows]   = useState(0);  // Paginated value
    const [showFilters, setShowFilters]      = useState(false);  // Filter fileds state
    const [filterDate, setFilterDate]        = useState('');  // Filter date state field
    const [filterError, setFilterError]      = useState('');  // Error message of filter
    const [filterData, updateFilterData]     = useState({
        merchant_email: '',
        WithdrawalCurrency: '',
        withdrawalAmount: ''
    });  // Filter filed data state


    const counPagination = Math.floor(totalRows);   // Total pagination count


     /// Open close Filter fields
     const handleToggleFilters = () => {
        setShowFilters(!showFilters);
    };


     /// Get selected date range
     const handleFilterDateChange = (e, newValue)=> {
        setFilterDate(newValue)
    };


    // Get Filter Input field values
    const handleFilterInputChange = (e)=> {
        const { name, value } = e.target;
        updateFilterData({
            ...filterData,
            [name]: value
        })
    };


    // Fetch all the user Transactions
    useEffect(() => {
      axiosInstance.get(`/api/v4/admin/fiat/transactions/`).then((res)=> {
        // console.log(res)
        if (res.status === 200 && res.data.success === true) {
            const sortedTransactions = res.data.all_fiat_transactions.sort((a,b)=> {
                return new Date(b.data.created_At) - new Date(a.data.created_At)
            })
            updateAllTransactions(sortedTransactions)
            updateTotalRows(res.data.total_row_count)
        };

      }).catch((error)=> {
        console.log(error)

      })
    }, []);


    // Method to redirect the user to Edit page
    const handleEditClicked = (transaction)=> {
        let depositData = {}
        let transferData = []

        depositData = {
            "id": 66,
            "transaction_id": transaction.data.transaction_id,
            "created_At": transaction.data.created_At,
            "amount": transaction.data.amount,
            "transaction_fee": transaction.data.transaction_fee,
            "payout_amount": transaction.data.payout_amount,
            "status": transaction.data.status,
            "payment_mode": transaction.data.payment_mode,
            "is_completed": transaction.data.is_completed,
            "user_name": transaction.user.first_name + transaction.user.lastname,
            "user_email": transaction.user.email,
            "transaction_currency": transaction.currency.name
        }

        const newData = {
            transaction: {
                "id": transaction.data.id,
                "status": transaction.data.status,
                "transaction_fee": transaction.data.transaction_fee
            }
        };

        transferData.push(newData);

        if (transaction.type === 'Transfer') {
            navigate('/admin/transfers/details/', {state: {transactionID: transferData[0]}})

        } else if (transaction.type === 'Deposit') {
            navigate('/admin/deposits/update/', {state: {transactionID: depositData}})
        } else {
            console.log('')
        };
    };


    // Change status color according to the transaction status
    const getStatusColor = (status)=> {
        switch (status) {
            case 'Hold':
                 return 'primary'
            case 'Rejected':
                return 'error'
            case 'Approved':
                return 'success'
            case 'Pending':
                return 'warning'
            default:
                return 'primary'
        }
    };


    // Search Withdrawal Transactions
    const handleSearch = ()=> {
        axiosInstance.get(`api/v4/admin/merchant/withdrawal/search/?query=${searchQuery}`).then((res)=> {
            // console.log(res)

            if (res.status === 200 && res.data.success === true) {
                updateMerchantWithdrawals(res.data.merchant_withdrawal_search)
            }

        }).catch((error)=> {
            console.log(error)

        })
    };


    // Input Search values
    const handleSearchInputChange = (e)=> {
        updateSearchQuery(e.target.value);
    };


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
            saveAs(blob, 'withdrawals.xlsx');
        } else {
            console.log('No Data available to Download')
        }
    };


    // Download all withdrawal requests
    const handleDownloadTransactions = ()=> {
        axiosInstance.get(`/api/v4/admin/merchant/pg/export/withdrawals/`).then((res)=> {
            // console.log(res)
    
            if (res.status === 200 && res.data.success === true) {
                updateExportData(res.data.AdminMerchantExportWithdrawalRequests);
                
                setTimeout(() => {
                    exportToExcel();
                }, 1000);
            };
    
          }).catch((error)=> {
            console.log(error)
    
          })
    };


    // Get the paginated data
    const handlePaginatedData = (e, value)=> {
        let limit = 10;
        let offset = (value - 1) * limit;

        axiosInstance.get(`/api/v4/admin/fiat/transactions/?limit=${limit}&offset=${offset}`).then((res)=> {
            // console.log(res)
            if (res.status === 200 && res.data.success === true) {
                const sortedTransactions = res.data.all_fiat_transactions.sort((a,b)=> {
                    return new Date(b.data.created_At) - new Date(a.data.created_At)
                })
                updateAllTransactions(sortedTransactions)
            };

        }).catch((error)=> {
            console.log(error);
        })
    };


    // Get Filter data
    const handleFilterData = ()=> {

        axiosInstance.post(`/api/v4/admin/filter/merchant/withdrawals/`, {
            date: filterDate,
            email: filterData.merchant_email,
            currency: filterData.WithdrawalCurrency,
            amount: filterData.withdrawalAmount

        }).then((res)=> {
            // console.log(res)

            if (res.status === 200 && res.data.success === true) {
                // const soterdTransactions = res.data.
                updateMerchantWithdrawals(res.data.AdminMerchantWithdrawalRequests)
                setFilterError('')
            }

        }).catch((error)=> {
            // console.log(error)

            if (error.response.data.message === 'No transaction found') {
                setFilterError('No data found')
            } else if (error.response.data.message === "Invalid Email") {
                setFilterError('Invalid email address')
            } else if (error.response.data.message === 'Invalid Currency') {
                setFilterError('Invalid Currency')
            } else {
                setFilterError('')
            };
        })
    };


    return (
        <Main open={open}>
            <DrawerHeader />

            <Paper elevation={3} sx={{p:1, borderRadius: '20px'}}> 
                {/* <h5 style={{margin:9}}><b>All Merchant Withdrawals</b></h5> */}
                
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
                                <b>All FIAT Transactions</b>
                            </Typography>
                    {/* <div style={{ display: 'flex', alignItems: 'center', marginBottom: isSmallScreen ? '16px' : '0'}}>
                        <Input placeholder="Type in here…" onChange={handleSearchInputChange} />

                        <IconButton aria-label="Example" onClick={handleSearch}>
                            <SearchIcon color='primary' />
                        </IconButton>
                    </div> */}

                    {/* For small screen sizes */}
                    {isSmallScreen ? (
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <IconButton aria-label="export">
                                    <FileDownloadIcon color='primary' />
                                </IconButton>

                                <IconButton aria-label="filter" onClick={handleToggleFilters}>
                                    <FilterAltIcon color='primary' />
                                </IconButton>
                            </div>
                            ) : (
                            <div>
                                <Button sx={{ mx: 1 }}>Export</Button>
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
                                placeholder="Merchant Email" 
                                name='merchant_email'
                                value={filterData.merchant_email}
                                onChange={handleFilterInputChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth>
                                <Input 
                                    name='WithdrawalCurrency'
                                    value={filterData.WithdrawalCurrency}
                                    onChange={handleFilterInputChange}
                                    placeholder="Withdrawal Currency" 
                                    />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth>
                                <Input 
                                    placeholder="Withdrawal Amount"
                                    name='withdrawalAmount'
                                    value={filterData.withdrawalAmount} 
                                    onChange={handleFilterInputChange}
                                    />
                            </FormControl>
                        </Grid>
                        
                        <Grid item xs={12} sm={6} md={1}>
                            <FormControl fullWidth>
                                <JoyButton 
                                onClick={handleFilterData}
                                >
                                    Submit
                                </JoyButton>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <small style={{color:'red'}}>{filterError && filterError}</small>
                </>
                )}

            <TableContainer>
            <Box sx={{ maxHeight: '90rem', overflowY: 'auto' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{position:'sticky', zIndex: 1, top: 0, backgroundColor: '#e2f4fb'}}>
                        <TableRow>
                            <TableCell><b>Sl No.</b></TableCell>
                            <TableCell align="center"><b>Merchant</b></TableCell>
                            <TableCell align="center"><b>Merchant Email</b></TableCell>
                            <TableCell align="center"><b>Type</b></TableCell>
                            <TableCell align="center"><b>Amount</b></TableCell>
                            <TableCell align="center"><b>Date</b></TableCell>
                            <TableCell align="center"><b>Time</b></TableCell>
                            <TableCell align="center"><b>Status</b></TableCell>
                            <TableCell align="center"><b>Edit</b></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {allTransactions.map((transaction, index) => (
                            <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {/* Sl No. Column */}
                                <TableCell scope="row">
                                    {transaction?.data?.id || ''}
                                </TableCell>

                                {/* Merchant Name Column */}
                                <TableCell scope="row" align='left'>
                                    {transaction?.user?.first_name || ''} {transaction?.user?.lastname || ''}
                                </TableCell>

                                {/* Merchant Email Column */}
                                <TableCell  scope="row" align='center'>
                                    {transaction?.user?.email}
                                </TableCell>

                                {/* Transaction Type Column */}
                                <TableCell  scope="row" align='center'>
                                    {transaction?.type || ''}
                                </TableCell>

                                {/* Amount */}
                                <TableCell component="th" scope="row" align="center">
                                    {transaction?.data?.amount || ''} {transaction?.currency?.name || ''}
                                </TableCell>

                                {/* Date Column */}
                                <TableCell component="th" scope="row" align="center">
                                    {transaction?.data?.created_At?.split('T')[0] || ''}
                                </TableCell>

                                {/* Time Column */}
                                <TableCell component="th" scope="row" align="center">
                                    {transaction?.data?.created_At?.split('T')[1] || ''}
                                </TableCell>

                                {/* Status Column */}
                                <TableCell component="th" scope="row" align="center">
                                    <Chip label={transaction?.data?.status} variant="outlined" color={getStatusColor(transaction?.data?.status)} />
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