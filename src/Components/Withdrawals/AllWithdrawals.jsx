import { Main, DrawerHeader } from "../Content";
import { Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Paper, Box, Grid, 
    Typography} from '@mui/material';
import { useEffect, useState } from 'react';
import axiosInstance from "../Authentication/axios";
import ModeEditSharpIcon from '@mui/icons-material/ModeEditSharp';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Pagination from '@mui/material/Pagination';
import Input from '@mui/joy/Input';
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






// All Merchant Withdrawal transactions of PG
export default function AllMerchantPGWithdrawals({open}) {
    const navigate = useNavigate();
    const theme    = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [merchantWithdrawals, updateMerchantWithdrawals] = useState([]);  // All merchant withdrawals
    const [searchQuery, updateSearchQuery] = useState('');  // Search Query state
    const [exportData, updateExportData] = useState([]); // Excel Data
    const [totalRows, updateTotalRows]   = useState(0);  // Paginated value

    const [showFilters, setShowFilters]      = useState(false);  // Filter fileds state
    const [filterDate, setFilterDate]        = useState('');  // Filter date state field
    const [filterError, setFilterError]      = useState('');  // Error message of filter
    const [filterStatus, setFilterStatus]    = useState('');  // Filter status state
    const [LgStartDateRange, setLgStartDateRange] = useState('');  // Large Screen Start date
    const [LgEndDateRange, setLgEndDateRange]     = useState('');  // Large Screen End Date
    const [ShStartDateRange, setShStartDateRange] = useState('');  // Small screen Start date
    const [ShEndDateRange, setShEndDateRange]     = useState('');  // Small Screen End date
    const [filterActive, setFilterActive]         = useState(false);      //// Filter Active Status
    const [filterData, updateFilterData]     = useState({
        merchant_email: '',
        withdrawalAmount: ''
    });  // Filter filed data state

    const counPagination = Math.floor(totalRows);   // Total pagination count

    
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


    // Fetch all the merchant withdrawals
    useEffect(() => {
      axiosInstance.get(`/api/v4/admin/merchant/pg/withdrawals/`).then((res)=> {
        // console.log(res)
        if (res.status === 200 && res.data.success === true) {
            updateMerchantWithdrawals(res.data.AdminMerchantWithdrawalRequests)
            updateTotalRows(res.data.total_row_count)
        };

      }).catch((error)=> {
        // console.log(error)

      })
    }, []);


    // Method to redirect the user to Edit page
    const handleEditClicked = (withdrawalRequests)=> {
        navigate('/admin/merchant/update/withdrawals/', {state: {withdrawal: withdrawalRequests}})
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
            saveAs(blob, 'withdrawals.xlsx');
        } else {
            console.log('No Data available to Download')
        }
    };


    // Download all withdrawal requests
    const handleDownloadWithdrawals = ()=> {
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
            axiosInstance.get(`api/v4/admin/merchant/pg/withdrawals/?limit=${limit}&offset=${offset}`).then((res)=> {
                // console.log(res)
                if (res.status === 200 && res.data.success === true) {
                    updateMerchantWithdrawals(res.data.AdminMerchantWithdrawalRequests)
                    updateTotalRows(res.data.total_row_count)
                };
    
            }).catch((error)=> {
                // console.log(error);
            });
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
        axiosInstance.post(`/api/v4/admin/filter/merchant/withdrawals/`, {
            date: filterDate,
            email: filterData.merchant_email,
            status: filterStatus,
            amount: filterData.withdrawalAmount,
            start_date: startDate ? startDate : LgStartDateRange,
            end_date: endDate ? endDate : LgEndDateRange

        }).then((res)=> {
            // console.log(res);
            if (res.status === 200 && res.data.success === true) {
                updateMerchantWithdrawals(res.data.AdminMerchantWithdrawalRequests)
                setFilterError('')
                updateTotalRows(res.data.paginated_count)
                setFilterActive(true)
            }

        }).catch((error)=> {
            // console.log(error);

            setTimeout(() => {
                setFilterError('');
            }, 2000);

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

    
    //// Get filtered data from API
    const GetFilteredPaginatedData = (startDate, endDate, limit, offset)=> {
        axiosInstance.post(`/api/v4/admin/filter/merchant/withdrawals/?limit=${limit}&offset=${offset}`, {
            date: filterDate,
            email: filterData.merchant_email,
            status: filterStatus,
            amount: parseFloat(filterData.withdrawalAmount),
            start_date: startDate ? startDate : LgStartDateRange,
            end_date: endDate ? endDate : LgEndDateRange

        }).then((res)=> {
            // console.log(res);
            if (res.status === 200 && res.data.success === true) {
                updateMerchantWithdrawals(res.data.AdminMerchantWithdrawalRequests)
                setFilterError('')
                updateTotalRows(res.data.paginated_count)
                setFilterActive(true)
            }

        }).catch((error)=> {
            // console.log(error);
            setTimeout(() => {
                setFilterError('');
            }, 2000);

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


    // Reset Filter Method
    const handleResetFilter = ()=> {
        setFilterDate('');
        setFilterStatus('');
        updateFilterData({
            merchant_email:'',
            withdrawalAmount: ''
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
                {/* <h5 style={{margin:9}}><b>All Merchant Withdrawals</b></h5> */}
                
                <Box 
                    sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p:2,
                        // flexDirection:{
                        //     xs:'column', 
                        //     sm:'row',
                        //     }
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
                                <b>All Merchant Withdrawals</b>
                            </Typography>

                    {/* For small screen sizes */}
                    {isSmallScreen ? (
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <IconButton aria-label="export" onClick={handleDownloadWithdrawals}>
                                    <FileDownloadIcon color='primary' />
                                </IconButton>

                                <IconButton aria-label="filter" onClick={()=> setShowFilters(!showFilters)}>
                                    <FilterAltIcon color='primary' />
                                </IconButton>
                            </div>
                            ) : (
                            <div>
                                <Button sx={{ mx: 1 }} onClick={handleDownloadWithdrawals}>Export</Button>
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
                                onChange={handleFilterInputChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={2.5}>
                            <FormControl fullWidth>
                                <Select
                                    placeholder='Status'
                                    id="status"
                                    name="status"
                                    value={filterStatus}
                                    onChange={(e, newValue) => setFilterStatus(newValue)}
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
                                    <Option value="Approved">Approved</Option>
                                    <Option value="Pending">Pending</Option>
                                    <Option value="Rejected">Rejected</Option>
                                    <Option value="Hold">On Hold</Option>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={2.5}>
                            <FormControl fullWidth>
                                <Input 
                                    placeholder="Withdrawal Amount"
                                    name='withdrawalAmount'
                                    value={filterData.withdrawalAmount} 
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
            <Box sx={{ maxHeight: '130rem', overflowY: 'auto' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{position:'sticky', zIndex: 1, top: 0, backgroundColor: '#e2f4fb'}}>
                        <TableRow>
                            <TableCell><b>Sl No.</b></TableCell>
                            <TableCell align="center"><b>Merchant</b></TableCell>
                            <TableCell align="center"><b>Merchant Email</b></TableCell>
                            <TableCell align="center"><b>Withdrawal Amount</b></TableCell>
                            <TableCell align="center"><b>Date</b></TableCell>
                            <TableCell align="center"><b>Time</b></TableCell>
                            <TableCell align="center"><b>Status</b></TableCell>
                            <TableCell align="center"><b>Edit</b></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {merchantWithdrawals.map((transaction, index) => (
                            <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {/* Sl No. Column */}
                                <TableCell scope="row">
                                    {transaction?.id}
                                </TableCell>

                                {/* Merchant Name Column */}
                                <TableCell scope="row" align='left'>
                                    {transaction?.merchant_name}
                                </TableCell>

                                {/* Merchant Email Column */}
                                <TableCell  scope="row" align='center'>
                                    {transaction?.merchant_email}
                                </TableCell>

                                {/* Withdrawal Amount */}
                                <TableCell component="th" scope="row" align="center">
                                    {transaction?.withdrawalAmount} {transaction?.withdrawalCurrency}
                                </TableCell>

                                {/* Date Column */}
                                <TableCell component="th" scope="row" align="center">
                                    {transaction?.createdAt.split('T')[0]}
                                </TableCell>

                                {/* Time Column */}
                                <TableCell component="th" scope="row" align="center">
                                    {transaction?.createdAt.split('T')[1]}
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
}