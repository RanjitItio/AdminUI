import { Table, TableBody, TableCell, TableContainer, 
         TableHead, TableRow, Paper, Box, Grid, Typography } from '@mui/material';
import { Main, DrawerHeader } from '../Content';
import { useEffect, useState } from 'react';
import axiosInstance from '../Authentication/axios';
import ModeEditSharpIcon from '@mui/icons-material/ModeEditSharp';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Pagination from '@mui/material/Pagination';
import FormControlLabel from '@mui/material/FormControlLabel';
import { IOSSwitch } from '../Switch/TestProductionSwitch';
import { useNavigate } from 'react-router-dom';
import Button from '../MUIBaseButton/button';
import Input from '@mui/joy/Input';
import SearchIcon from '@mui/icons-material/Search';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { useTheme } from '@mui/material/styles';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useMediaQuery } from '@mui/material';
import Select,  { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import {Button as JoyButton} from '@mui/joy';
import FormControl from '@mui/material/FormControl';
import { DatePicker } from 'antd';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';


const { RangePicker } = DatePicker;






// All Transaction Data
export default function AllMerchantPGTransactions({open}) {
    const navigate = useNavigate();
    const theme    = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [transactionData, updateTransactionData] = useState([]); // All Transaction data state
    const [modeName, setModeName]            = useState('Production Mode');   // Mode Name
    const [exportData, updateExportData]     = useState([]);  // Excel data
    const [searchedText, updateSearchedText] = useState('');  // Searched text
    const [totalRows, updateTotalRows]       = useState(0);
    const [showFilters, setShowFilters]      = useState(false);  // Filter fileds state
    const [filterDate, setFilterDate]        = useState('');  // Filter date state field
    const [filterError, setFilterError]      = useState('');  // Error message of filter
    const [LgStartDateRange, setLgStartDateRange] = useState('');  // Large Screen Start date
    const [LgEndDateRange, setLgEndDateRange]     = useState('');  // Large Screen End Date
    const [ShStartDateRange, setShStartDateRange] = useState('');  // Small screen Start date
    const [ShEndDateRange, setShEndDateRange]     = useState('');  // Small Screen End date
    const [filterActive, setFilterActive]         = useState(false);      //// Filter Active Status
    const [filterData, updateFilterData]     = useState({
        transaction_id: '',
        transaction_amount: '',
        business_name: '',
    });  // Filter filed data state


    const countPagination = Math.ceil(totalRows);


    /// Filter Date Range Selected in Large Screen
    const handelLargeScreenCustomDateRange = (date, dateString)=> {
        setLgStartDateRange(dateString[0])
        setLgEndDateRange(dateString[1])
    };


    /// Filter Small Screen Start date range
    const handleSmallScreenStartDateRange = (date, dateString)=> {
        setShStartDateRange(dateString)
    };
    


    /// Filter Small Screen End Date Range
    const handleSmallScreenEndDateRange = (date, dateString)=> {
        setShEndDateRange(dateString)
    };


    // Get Filter Input field values
    const handleFilterInputChange = (e)=> {
        const { name, value } = e.target;
        updateFilterData({
            ...filterData,
            [name]: value
        })
    };

     

    // Call API to fetch all production Transactions
    useEffect(()=> {
        axiosInstance.get(`api/v2/admin/merchant/pg/transactions/`).then((res)=> {
            // console.log(res)

            if (res.status === 200 && res.data.message === 'Transaction fetched successfuly') {
                updateTransactionData(res.data.AdminmerchantPGTransactions)
                updateTotalRows(res.data.total_row_count)
            };

        }).catch((error)=> {
            console.log(error)
            
        })
    }, []);


   
    // Method for Test/Production checkbox
    const handleCheckBoxChange = (e)=> {
         const value = e.target.checked

         if (value === false) {
            setModeName('Test Mode')

            axiosInstance.get(`/api/v2/admin/merchant/pg/sandbox/transactions/`).then((res)=> {
                // console.log(res)
    
                if (res.status === 200 && res.data.message === 'Transaction fetched successfuly') {
                    updateTransactionData(res.data.AdminmerchantPGSandboxTransactions)
                    setModeName('Test Mode')
                    updateTotalRows(res.data.total_row_count)
                };
    
            }).catch((error)=> {
                // console.log(error)
                
            })
         } else if (value === true) {
            setModeName('Production Mode')

            axiosInstance.get(`api/v2/admin/merchant/pg/transactions/`).then((res)=> {
                // console.log(res)
    
                if (res.status === 200 && res.data.message === 'Transaction fetched successfuly') {
                    updateTransactionData(res.data.AdminmerchantPGTransactions)
                    setModeName('Production Mode')
                };
    
            }).catch((error)=> {
                // console.log(error)
                
            })
         }
    };


    // Change status color according to the transaction status
    const getStatusColor = (status)=> {
        switch (status) {
            case 'PAYMENT_INITIATED':
                 return 'primary'
            case 'PAYMENT_FAILED':
                return 'error'
            case 'PAYMENT_SUCCESS':
                return 'success'
            case 'PAYMENT_PENDING':
                return 'warning'
            default:
                return 'primary'
        }
    };

    // Method to handle Edit Button Clicked
    const handleEditButtonClicked = (event, transaction)=> {
        const transactionData = transaction
        navigate('/admin/update/merchant/pg/transactions/', {state: {tranaction: transactionData, mode: modeName}})
    };

    
    // Method to Convert the data into Excel file
    const handleExportClicked = ()=> {

        // Download Production Transaction Data
        if (modeName === 'Production Mode') {
            axiosInstance.get(`/api/v2/admin/merchant/pg/export/transactions/`).then((res)=> {
                // console.log(res)
    
                if (res.status === 200 && res.data.message === 'Transaction fetched successfuly') {
                    updateExportData(res.data.ExportmerchantPGTransaction)
                    exportToExcel();
                };
    
            }).catch((error)=> {
                console.log(error)
            })
        }
        // Download Test mode transaction data
        else if (modeName === 'Test Mode') {
            axiosInstance.get(`/api/v2/admin/merchant/pg/sandbox/export/transactions/`).then((res)=> {
                // console.log(res)
    
                if (res.status === 200 && res.data.message === 'Transaction fetched successfuly') {
                    updateExportData(res.data.ExportmerchantPGSBTransaction)
                    exportToExcel();
                };
    
            }).catch((error)=> {
                console.log(error)
            })
        }
    };

    // Convert to Excel File
    const exportToExcel = async ()=> {
        
        if (exportData) {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('sheet1')

            const headers = Object.keys(exportData[0]);

            worksheet.addRow(headers);

            exportData.forEach((item) => {
                worksheet.addRow(Object.values(item));
              });

            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, 'data.xlsx');

            // console.log('downloaded')
        };
        
        updateExportData([]);
    };


    // Fetch all paginated data
    const handlePaginatedData = (e, value)=> {
        let limit = 10;
        let offset = (value - 1) * limit;

        // if (modeName === 'Production Mode') {
        //     axiosInstance.get(`api/v2/admin/merchant/pg/transactions/?limit=${limit}&offset=${offset}`).then((res)=> {
        //         // console.log(res)
        //         if (res.status === 200 && res.data.success === true) {
        //             updateTransactionData(res.data.AdminmerchantPGTransactions)
        //             updateTotalRows(res.data.total_row_count)
        //         };

        //     }).catch((error)=> {
        //         // console.log(error);

        //     })
        // } else if (modeName === 'Test Mode') {
        //     axiosInstance.get(`api/v2/admin/merchant/pg/sandbox/transactions/?limit=${limit}&offset=${offset}`).then((res)=> {
        //         // console.log(res)
        //         if (res.status === 200 && res.data.success === true) {
        //             updateTransactionData(res.data.AdminmerchantPGSandboxTransactions)
        //         };

        //     }).catch((error)=> {
        //         console.log(error);

        //     })
        // }

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
            
            if (modeName === 'Production Mode') {
                axiosInstance.get(`api/v2/admin/merchant/pg/transactions/?limit=${limit}&offset=${offset}`).then((res)=> {
                    // console.log(res)
                    if (res.status === 200 && res.data.success === true) {
                        updateTransactionData(res.data.AdminmerchantPGTransactions)
                        updateTotalRows(res.data.total_row_count)
                    };

                }).catch((error)=> {
                    // console.log(error);

                })
            } else if (modeName === 'Test Mode') {
                axiosInstance.get(`api/v2/admin/merchant/pg/sandbox/transactions/?limit=${limit}&offset=${offset}`).then((res)=> {
                    // console.log(res)
                    if (res.status === 200 && res.data.success === true) {
                        updateTransactionData(res.data.AdminmerchantPGSandboxTransactions)
                        updateTotalRows(res.data.total_row_count)
                    };

                }).catch((error)=> {
                    // console.log(error);
                })
            }
        }
    };



    // Get Filter data
    const handleFilterData = ()=> {
        if (isSmallScreen && filterDate === 'CustomRange') {
            if (!ShStartDateRange) {
                setFilterError('Please Select Start Date');

            } else if (!ShEndDateRange) {
                setFilterError('Please Select End Date');

            } else {
                setFilterError('');
                GetFilteredData(ShStartDateRange, ShEndDateRange);
            }

        } else if (!isSmallScreen && filterDate === 'CustomRange') {
            if (!LgStartDateRange) {
                setFilterError('Please Select Date Range');

            } else if (!LgEndDateRange) {
                setFilterError('Please Select Date Range');

            } else {
                setFilterError('');
                GetFilteredData(LgStartDateRange, LgEndDateRange);
            }

        } else {
            setFilterError('')
            GetFilteredData()
        }
    };


    //// Get filtered data from API
    const GetFilteredData = (startDate, endDate)=> {
        if(modeName === 'Production Mode') {

            axiosInstance.post(`/api/v2/admin/filter/merchant/transaction/`, {
                date: filterDate,
                transaction_id: filterData.transaction_id,
                transaction_amount: filterData.transaction_amount,
                business_name: filterData.business_name,
                start_date: startDate ? startDate : LgStartDateRange,
                end_date: endDate ? endDate : LgEndDateRange

            }).then((res)=> {
                // console.log(res);
                if (res.status === 200 && res.data.success === true) {
                    updateTransactionData(res.data.AdminmerchantPGTransactions);
                    setFilterError('');
                    updateTotalRows(res.data.paginated_count)
                    setFilterActive(true)
                }
    
            }).catch((error)=> {
                // console.log(error);
    
                setTimeout(() => {
                    setFilterError('');
                }, 2000);
    
                if (error.response.data.message === 'No transaction found') {
                    setFilterError('No data found');
                } else {
                    setFilterError('');
                };
            })

        } else if (modeName === 'Test Mode') {
            axiosInstance.post(`/api/v2/admin/merchant/filter/sandbox/transaction/`, {
                date: filterDate,
                transaction_id: filterData.transaction_id,
                transaction_amount: filterData.transaction_amount,
                business_name: filterData.business_name,
                start_date: startDate ? startDate : LgStartDateRange,
                end_date: endDate ? endDate : LgEndDateRange

            }).then((res)=> {
                // console.log(res)
                if (res.status === 200 && res.data.success === true) {
                    updateTransactionData(res.data.AdminmerchantPGSandboxTransactions);
                    setFilterError('');
                    setFilterActive(true)
                    updateTotalRows(res.data.paginated_count)
                }

            }).catch((error)=> {
                // console.log(error)
                setTimeout(() => {
                    setFilterError('');
                }, 2000);

                if (error.response.data.message === 'No transaction found') {
                    setFilterError('No data found')
                } else {
                    setFilterError('')
                }
            });
        }
    };


    
    //// Get filtered data from API
    const GetFilteredPaginatedData = (startDate, endDate, limit, offset)=> {
        if(modeName === 'Production Mode') {
            axiosInstance.post(`/api/v2/admin/filter/merchant/transaction/?limit=${limit}&offset=${offset}`, {
                date: filterDate,
                transaction_id: filterData.transaction_id,
                transaction_amount: filterData.transaction_amount,
                business_name: filterData.business_name,
                start_date: startDate ? startDate : LgStartDateRange,
                end_date: endDate ? endDate : LgEndDateRange

            }).then((res)=> {
                // console.log(res);
                if (res.status === 200 && res.data.success === true) {
                    updateTransactionData(res.data.AdminmerchantPGTransactions);
                    setFilterError('');
                    updateTotalRows(res.data.paginated_count)
                    setFilterActive(true)
                }
    
            }).catch((error)=> {
                // console.log(error);
                setTimeout(() => {
                    setFilterError('');
                }, 2000);
    
                if (error.response.data.message === 'No transaction found') {
                    setFilterError('No data found');
                } else {
                    setFilterError('');
                };
            })

        } else if (modeName === 'Test Mode') {
            axiosInstance.post(`/api/v2/admin/merchant/filter/sandbox/transaction/`, {
                date: filterDate,
                transaction_id: filterData.transaction_id,
                transaction_amount: filterData.transaction_amount,
                business_name: filterData.business_name,
                start_date: startDate ? startDate : LgStartDateRange,
                end_date: endDate ? endDate : LgEndDateRange

            }).then((res)=> {
                // console.log(res)
                if (res.status === 200 && res.data.success === true) {
                    updateTransactionData(res.data.AdminmerchantPGSandboxTransactions);
                    setFilterError('');
                    setFilterActive(true)
                    updateTotalRows(res.data.paginated_count)
                }

            }).catch((error)=> {
                // console.log(error)
                setTimeout(() => {
                    setFilterError('');
                }, 2000);

                if (error.response.data.message === 'No transaction found') {
                    setFilterError('No data found')
                } else {
                    setFilterError('')
                };
            });
        }
    };


    // Reset Filter Method
    const handleResetFilter = ()=> {
        setFilterDate('');
        setFilterError('')
        updateFilterData({
            transaction_id: '',
            transaction_amount: '',
            business_name: ''
        })

        setFilterActive(false);
        setLgStartDateRange('');
        setLgEndDateRange('');
        setShStartDateRange('');
        setShEndDateRange('');
    };

     //// Call default pagination after filter mode off
     useEffect(() => {
        if (!filterActive) {
            handlePaginatedData('e', 1);
        }
    }, [!filterActive]);


    return (
        <Main open={open}>
            <DrawerHeader />

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
                            <b>All Merchant Transactions</b>
                        </Typography>

                       

                {/* For small screen sizes */}
                {isSmallScreen ? (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <IconButton aria-label="export" onClick={handleExportClicked}>
                            <FileDownloadIcon color='primary' />
                        </IconButton>

                        <IconButton aria-label="filter" onClick={()=> setShowFilters(!showFilters)}>
                            <FilterAltIcon color='primary' />
                        </IconButton>
                    </div>
                    ) : (
                    <div>
                        <Button sx={{ mx: 1 }} onClick={handleExportClicked}>Export</Button>
                        <Button sx={{ mx: 1 }} onClick={()=> setShowFilters(!showFilters)}>Filter</Button>
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
                                onChange={(e, newValue) => setFilterDate(newValue)}
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
                                placeholder="Transaction ID" 
                                name='transaction_id'
                                value={filterData.transaction_id}
                                onChange={handleFilterInputChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={2.5}>
                        <FormControl fullWidth>
                            <Input 
                                name='transaction_amount'
                                value={filterData.transaction_amount}
                                onChange={handleFilterInputChange}
                                placeholder="Transaction Amount" 
                                />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={2.5}>
                        <FormControl fullWidth>
                            <Input 
                                placeholder="Business Name"
                                name='business_name'
                                value={filterData.business_name} 
                                onChange={handleFilterInputChange}
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
            <Box sx={{ maxHeight: '75rem', overflowY: 'auto' }}>
                <Table aria-label="simple table">
                    <TableHead sx={{position:'sticky', zIndex: 1, top: 0, backgroundColor: '#e2f4fb'}}>
                        <TableRow>
                            <TableCell><b>Sl No.</b></TableCell>
                            <TableCell align="center"><b>Transaction ID</b></TableCell>
                            <TableCell align="left"><b>Merchant</b></TableCell>
                            <TableCell align="left"><b>Business</b></TableCell>
                            <TableCell align="left"><b>Amount</b></TableCell>
                            <TableCell align="center"><b>Date</b></TableCell>
                            <TableCell align="center"><b>Status</b></TableCell>
                            <TableCell align="right"><b>Edit</b></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {transactionData.map((transactions, index) => (
                            <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell scope="row">
                                    {transactions?.id}
                                </TableCell>

                                <TableCell scope="row" align='left'>
                                    {transactions?.transaction_id}
                                </TableCell>

                                <TableCell  scope="row" align='left'>
                                    {transactions?.merchant?.merchant_name}
                                </TableCell>

                                <TableCell  scope="row" align='left'>
                                    {transactions?.business_name || 'None'}
                                </TableCell>

                                <TableCell component="th" scope="row">
                                    {transactions?.amount} {transactions?.currency}
                                </TableCell>

                                <TableCell component="th" scope="row">
                                    {transactions?.createdAt?.split('T')[0] || ''} <br />
                                    <small>{transactions?.createdAt?.split('T')[1] || ''}</small>
                                </TableCell>

                                <TableCell component="th" scope="row">
                                    <Chip label={transactions?.status} variant="outlined" color={getStatusColor(transactions?.status)} />
                                </TableCell>

                                <TableCell component="th" scope="row">
                                    <IconButton aria-label="Example" onClick={(event)=> {handleEditButtonClicked(event, transactions)}}>
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
                    count={countPagination}
                    onChange={(e, value)=> {handlePaginatedData(e, value);}}
                    color="primary"
                    sx={{mb:2, mt:2}}
                    />

                <FormControlLabel 
                    control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                    label={modeName}
                    onChange={handleCheckBoxChange}
                    />
            </Box>

            </TableContainer>

            </Paper>
        </Main>
    );
};