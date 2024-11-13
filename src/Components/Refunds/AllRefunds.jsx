import { Main, DrawerHeader } from "../Content";
import { Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Paper, Box, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axiosInstance from "../Authentication/axios";
import ModeEditSharpIcon from '@mui/icons-material/ModeEditSharp';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Pagination from '@mui/material/Pagination';
import Input from '@mui/joy/Input';
// import SearchIcon from '@mui/icons-material/Search';
import Button from "../MUIBaseButton/button";
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
import { DatePicker } from 'antd';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';


const { RangePicker } = DatePicker;




//// Get all the merchant Refunds
export default function MerchantRefunds({open}) {
    const navigate = useNavigate();
    const theme    = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [merchantRefunds, updateMerchantRefunds] = useState([]); // Refund Transactions
    const [totalRowCount, setTotalRowCount]        = useState(0);
    const [exportData, updateExportData] = useState([]); // Excel Data

    const [showFilters, setShowFilters]           = useState(false);  // Filter fileds state
    const [filterDate, setFilterDate]             = useState('');  // Filter date state field
    const [filterError, setFilterError]           = useState('');  // Error message of filter
    const [LgStartDateRange, setLgStartDateRange] = useState('');  // Large Screen Start date
    const [LgEndDateRange, setLgEndDateRange]     = useState('');  // Large Screen End Date
    const [ShStartDateRange, setShStartDateRange] = useState('');  // Small screen Start date
    const [ShEndDateRange, setShEndDateRange]     = useState('');  // Small Screen End date
    const [filterCurrency, setFilterCurrency]     = useState('') // Filter Currency
    const [filterActive, setFilterActive]         = useState(false);      //// Filter Active Status
    const [filterData, updateFilterData]     = useState({
        merchant_email: '',
        refundCurrency: '',
        refundAmount: ''
    });  // Filter filed data state

    let countPagination = Math.ceil(totalRowCount); 

    
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


    // Update Filter fields data
    const handleUpdateFilterInput = (e)=> {
        const {name, value} = e.target;

        updateFilterData({
            ...filterData,
            [name]: value
        })
    };


    // Fetch all the Merchant refund transactions
    useEffect(() => {
      axiosInstance.get(`api/v6/admin/merchant/refunds/`).then((res)=> {
        // console.log(res)

        if (res.status === 200 && res.data.success === true){
            updateMerchantRefunds(res.data.admin_merchant_refunds)
            setTotalRowCount(res.data.total_count)
        }

      }).catch((error)=> {
        // console.log(error)

      })
    }, []);


    // Method to redirect to Update page
    const handleRedirectUpdateRefund = (refunds)=> {
        navigate('/admin/merchant/update/refunds/', {state: {merchantRefunds: refunds}})
    };

    // Fetch all paginated data
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
            axiosInstance.get(`api/v6/admin/merchant/refunds/?limit=${limit}&offset=${offset}`).then((res)=> {
                // console.log(res)
                if (res.status === 200 && res.data.success === true) {
                    updateMerchantRefunds(res.data.admin_merchant_refunds)
                    setTotalRowCount(res.data.total_count)
                };
    
            }).catch((error)=> {
                console.log(error);
    
            })
        }
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
            saveAs(blob, 'merchantRefunds.xlsx');
        } else {
            console.log('No Data available to Download')
        }
    };

     // Download all withdrawal requests
     const handleDownloadRefunds = ()=> {
        axiosInstance.get(`/api/v6/admin/merchant/pg/export/refunds/`).then((res)=> {
            // console.log(res)
    
            if (res.status === 200 && res.data.success === true) {
                updateExportData(res.data.admin_merchant_refunds_export);
                
                setTimeout(() => {
                    exportToExcel();
                }, 1000);
                
            };
    
          }).catch((error)=> {
            // console.log(error)
          })
    };



    // Get all the Filtered data
    const handleGetFilterData = ()=> {
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
        axiosInstance.post(`/api/v6/admin/filter/merchant/refunds/`, {
            date: filterDate,
            email: filterData.merchant_email,
            currency: filterCurrency,
            amount: filterData.refundAmount,
            start_date: startDate ? startDate : LgStartDateRange,
            end_date: endDate ? endDate : LgEndDateRange

        }).then((res)=> {
            // console.log(res);
            if (res.status === 200 && res.data.success === true) {
                updateMerchantRefunds(res.data.admin_merchant_filter_refunds)
                setFilterError('')
                setTotalRowCount(res.data.paginated_count)
                setFilterActive(true)
            }

        }).catch((error)=> {
            // console.log(error);

            setTimeout(() => {
                setFilterError('');
            }, 2000);

            if (error.response.data.message === 'No transaction found') {
                setFilterError('No data found')
            } else if (error.response.data.message === 'Invalid email address') {
                setFilterError('Invalid email address')
            } else if (error.response.data.message === 'Invalid Currency') {
                setFilterError('Invalid Currency')
            } else {
                setFilterError('')
            };
        })
    };


    
    //// Get filtered data from API
    const GetFilteredPaginatedData = (startDate, endDate, limit, offset)=> {
        axiosInstance.post(`/api/v6/admin/filter/merchant/refunds/?limit=${limit}&offset=${offset}`, {
            date: filterDate,
            email: filterData.merchant_email,
            currency: filterCurrency,
            amount: parseFloat(filterData.refundAmount),
            start_date: startDate ? startDate : LgStartDateRange,
            end_date: endDate ? endDate : LgEndDateRange

        }).then((res)=> {
            // console.log(res);
            if (res.status === 200 && res.data.success === true) {
                updateMerchantRefunds(res.data.admin_merchant_filter_refunds)
                setFilterError('')
                setTotalRowCount(res.data.paginated_count)
                setFilterActive(true)
            }

        }).catch((error)=> {
            // console.log(error);
            setTimeout(() => {
                setFilterError('');
            }, 2000);

            if (error.response.data.message === 'No transaction found') {
                setFilterError('No data found')
            } else if (error.response.data.message === 'Invalid email address') {
                setFilterError('Invalid email address')
            } else if (error.response.data.message === 'Invalid Currency') {
                setFilterError('Invalid Currency')
            } else {
                setFilterError('');
            };
        })
    };

    
    // Reset Filter Inputs Method
    const handleResetFilter = ()=> {
        setFilterDate('');
        setFilterCurrency('');
        updateFilterData({
            merchant_email: '',
            refundAmount: ''
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
                                <b>All Merchant Refunds</b>
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
                                <IconButton aria-label="export" onClick={handleDownloadRefunds}>
                                    <FileDownloadIcon color='primary' />
                                </IconButton>

                                <IconButton aria-label="filter" onClick={()=> setShowFilters(!showFilters)}>
                                    <FilterAltIcon color='primary' />
                                </IconButton>
                            </div>
                            ) : (
                            <div>
                                <Button sx={{ mx: 1 }} onClick={handleDownloadRefunds}>Export</Button>
                                <Button sx={{ mx: 1 }} onClick={()=> setShowFilters(!showFilters)} >Filter</Button>
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
                                placeholder="Merchant Email" 
                                name='merchant_email'
                                value={filterData.merchant_email}
                                onChange={handleUpdateFilterInput}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={2.5}>
                            <FormControl fullWidth>
                                <Select
                                    placeholder='Refund Currency'
                                    id="refundCurrency"
                                    name="refundCurrency"
                                    value={filterCurrency}
                                    onChange={(e, newValue) => setFilterCurrency(newValue)}
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
                                    <Option value="USD">USD</Option>
                                    <Option value="INR">INR</Option>
                                    <Option value="EUR">EUR</Option>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={2.5}>
                            <FormControl fullWidth>
                                <Input 
                                    placeholder="Refund Amount"
                                    name='refundAmount'
                                    value={filterData.refundAmount} 
                                    onChange={handleUpdateFilterInput}
                                    />
                            </FormControl>
                        </Grid>
                        
                        <Grid item xs={6} sm={6} md={1}>
                            <FormControl fullWidth>
                                <JoyButton 
                                onClick={handleGetFilterData}
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
            <Box sx={{ maxHeight: '90rem', overflowY: 'auto' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{position:'sticky', zIndex: 1, top: 0, backgroundColor: '#e2f4fb'}}>
                        <TableRow>
                            <TableCell><b>Sl No.</b></TableCell>
                            <TableCell align="center"><b>Merchant</b></TableCell>
                            <TableCell align="center"><b>Merchant Email</b></TableCell>
                            <TableCell align="center"><b>Date</b></TableCell>
                            <TableCell align="center"><b>Time</b></TableCell>
                            <TableCell align="center"><b>Transaction Amount</b></TableCell>
                            <TableCell align="center"><b>Refund Amount</b></TableCell>
                            <TableCell align="center"><b>Status</b></TableCell>
                            <TableCell align="center"><b>Edit</b></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {merchantRefunds.map((refunds, index) => (
                            <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {/* Sl No. Column */}
                                <TableCell scope="row">
                                    {refunds?.id}
                                </TableCell>

                                {/* Merchant Name Column */}
                                <TableCell scope="row" align='left'>
                                    {refunds?.merchant_name}
                                </TableCell>

                                {/* Merchant Email Column */}
                                <TableCell  scope="row" align='center'>
                                    {refunds?.merchant_email}
                                </TableCell>

                                {/* Date Column */}
                                <TableCell component="th" scope="row" align="center">
                                    {refunds?.createdAt.split('T')[0]}
                                </TableCell>

                                {/* Time Column */}
                                <TableCell component="th" scope="row" align="center">
                                    {refunds?.createdAt.split('T')[1]}
                                </TableCell>

                                {/* Transaction Amount Amount */}
                                <TableCell component="th" scope="row" align="center">
                                    {refunds?.transaction_amount} {refunds?.transaction_currency}
                                </TableCell>
                                
                                {/* Refund Amount */}
                                <TableCell component="th" scope="row" align="center">
                                    {refunds?.amount} {refunds?.currency}
                                </TableCell>

                                {/* Status Column */}
                                <TableCell component="th" scope="row" align="center">
                                    <Chip label={refunds?.status} variant="outlined" color={getStatusColor(refunds.status)} />
                                </TableCell>

                                <TableCell component="th" scope="row" align="center">
                                    <IconButton aria-label="Example" onClick={()=> {handleRedirectUpdateRefund(refunds)}}>
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
            </Box>

            </TableContainer>

            </Paper>
        </Main>
    );
};