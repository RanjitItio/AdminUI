import { Main, DrawerHeader } from "../../Components/Content";
import { Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Paper, Box } from '@mui/material';
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
import { useMediaQuery } from '@mui/material';
import { Typography, Grid } from "@mui/material";
import { Button as JoyButton, FormControl  } from "@mui/joy";
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { selectClasses } from '@mui/joy/Select';
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




// All the transfer transactions
export default function AllTransferTransactions({open}) {
    const navigate = useNavigate();
    const theme         = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));  // Screen size measurement
    
    const [transferTransaction, setTransferTransaction] = useState([]);  // All Transactions
    const [exportData, updateExportData]    = useState([]);    // Export Data
    const [totalRows, updateTotalRows]      = useState(0);     // Paginated Rows
    const [showFilters, setShowFilters]     = useState(false);  // Filter fileds state
    const [filterDate, setFilterDate]       = useState('');  // Filter date state field
    const [filterError, setFilterError]     = useState('');  // Error message of filter
    const [filterStatus, setFilterStatus]   = useState('');  // Filter statue
    const [filterCurrency, setFilterCurrency] = useState('');
    const [currencies, setCurrencies]         = useState([]);  // All Currencies

    const [filterActive, setFilterActive]         = useState(false); /// Filter active state
    const [LgStartDateRange, setLgStartDateRange] = useState('');  // Large Screen Start date
    const [LgEndDateRange, setLgEndDateRange]     = useState('');  // Large Screen End Date
    const [ShStartDateRange, setShStartDateRange] = useState('');  // Small screen Start date
    const [ShEndDateRange, setShEndDateRange]     = useState('');  // Small Screen End date
    const [filterData, updateFilterData]    = useState({
        user_email: ''
    });

    const counPagination = Math.ceil(totalRows);   // Total pagination count

    
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


    // update filter input field data
    const handleFilterInputChange = (e)=> {
        const { name,  value } = e.target;

        updateFilterData({
            ...filterData,
            [name]: value
        })
    };

    // Fetch all the available currency from API
    useEffect(() => {
        axiosInstance.get(`api/v2/currency/`).then((res)=> {
          // console.log(res.data.currencies)
          if (res.data && res.data.currencies){
            setCurrencies(res.data.currencies)
          }
  
        }).catch((error)=> {
        //   console.log(error.response)
        });
  
      }, []);


    // Fetch all the Transfers
    useEffect(() => {
        axiosInstance.get(`/api/v1/admin/transfer/transactions/`).then((res)=> {
        //   console.log(res)
          if (res.status === 200 && res.data.success === true) {
              setTransferTransaction(res.data.transfer_transactions)
              updateTotalRows(res.data.total_row_count)
          };
  
        }).catch((error)=> {
            console.log(error)
  
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
            saveAs(blob, 'transfers.xlsx');
        } else {
            console.log('No Data available to Download')
        }
    };


    // Download all Deposit transactions
    const handleDownloadTransferTransactions = ()=> {
        axiosInstance.get(`/api/v4/admin/export/transfer/transaction/`).then((res)=> {
            // console.log(res)
    
            if (res.status === 200 && res.data.success === true) {
                updateExportData(res.data.export_transfer_transaction_data);
                
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

            axiosInstance.get(`/api/v1/admin/transfer/transactions/?limit=${limit}&offset=${offset}`).then((res)=> {
                // console.log(res)
                if (res.status === 200 && res.data.success === true) {
                    setTransferTransaction(res.data.transfer_transactions);
                    updateTotalRows(res.data.total_row_count);
                };
    
            }).catch((error)=> {
                // console.log(error);
            })
        }
    };


    // Method to redirect the user to Edit page
    const handleEditClicked = (transact)=> {
        navigate('/admin/transfers/details/', {state: {transactionID: transact}})
    };


    /// Get filter data
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
            setFilterError('');
            GetFilteredData();
        }
   };

   
    //// Get filtered data from API
    const GetFilteredData = (startDate, endDate)=> {
        axiosInstance.post(`/api/v4/admin/filter/transfer/transaction/`, {
            date_time: filterDate,
            email: filterData.user_email,
            status: filterStatus,
            currency: filterCurrency,
            start_date: startDate ? startDate : LgStartDateRange,
            end_date: endDate ? endDate : LgEndDateRange

        }).then((res)=> {
            // console.log(res);
            if (res.status === 200 && res.data.success === true) {
                setTransferTransaction(res.data.filtered_transaction_data)
                updateTotalRows(res.data.paginated_count);
                setFilterActive(true);
            }

        }).catch((error)=> {
            // console.log(error);
            setTimeout(() => {
                setFilterError('');
            }, 2000);
 
            if (error.response.data.message === 'Invalid email') {
                setFilterError('Invalid Email Address');
            } else if (error.response.data.message === 'No transaction found') {
                setFilterError('No data found')
            } else if (error.response.data.message === 'Currency not available') {
                setFilterError('Invalid Currency')
            } else if (error.response.data.message === 'User not available') {
                setFilterError('Invalid User')
            } else {
                setFilterError('')
            };
        })
    };


    
    //// Get filtered paginated data from API
    const GetFilteredPaginatedData = (startDate, endDate, limit, offset)=> {
        axiosInstance.post(`/api/v4/admin/filter/transfer/transaction/?limit=${limit}&offset=${offset}`, {
            date_time: filterDate,
            email: filterData.user_email,
            status: filterStatus,
            currency: filterCurrency,
            start_date: startDate ? startDate : LgStartDateRange,
            end_date: endDate ? endDate : LgEndDateRange

        }).then((res)=> {
            // console.log(res);
            if (res.status === 200 && res.data.success === true) {
                setTransferTransaction(res.data.filtered_transaction_data)
                updateTotalRows(res.data.paginated_count);
                setFilterActive(true);
            }

        }).catch((error)=> {
            // console.log(error);
            setTimeout(() => {
                setFilterError('');
            }, 2000);
 
            if (error.response.data.message === 'Invalid email') {
                setFilterError('Invalid Email Address');
            } else if (error.response.data.message === 'No transaction found') {
                setFilterError('No data found')
            } else if (error.response.data.message === 'Currency not available') {
                setFilterError('Invalid Currency')
            } else if (error.response.data.message === 'User not available') {
                setFilterError('Invalid User')
            } else {
                setFilterError('')
            };
        })
    };


   // Reset Filter Method
   const handleResetFilter = ()=> {
       setFilterStatus('');
       setFilterDate('');
       setFilterError('');
       setFilterCurrency('');
       updateFilterData({
           user_email:''
       })
       setFilterActive(false);
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
                        <b>All Transfer Transactions</b>
                    </Typography>

                    {/* For small screen sizes */}
                    {isSmallScreen ? (
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <IconButton aria-label="export" onClick={handleDownloadTransferTransactions}>
                                    <FileDownloadIcon color='primary' />
                                </IconButton>

                                <IconButton aria-label="filter" onClick={()=> setShowFilters(!showFilters)}>
                                    <FilterAltIcon color='primary' />
                                </IconButton>
                            </div>
                            ) : (
                            <div>
                                <Button sx={{ mx: 1 }} onClick={handleDownloadTransferTransactions}>Export</Button>
                                <Button sx={{ mx: 1 }} onClick={()=> setShowFilters(!showFilters)} >Filter</Button>
                            </div>
                        )}
                </Box>

                {/* Hidden Filter fields */}
                {showFilters && (
                    <>
                    <Grid container p={2} justifyContent="flex-end" spacing={2}>
                        <Grid item xs={12} sm={6} md={2.5}>
                            <FormControl >
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
                            <Input 
                                placeholder="User Email" 
                                name='user_email'
                                value={filterData.user_email}
                                onChange={handleFilterInputChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={2.5}>
                            <FormControl>
                                <Select
                                    label="status"
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
                                    <Option value="Cancelled">Cancelled</Option>
                                    <Option value="Hold">On Hold</Option>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={2.5}>
                            <FormControl>
                                <Select
                                    label="Currency"
                                    placeholder='Currency'
                                    id="Currency"
                                    name="Currency"
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
                                    {currencies.map((curr, index)=> (
                                        <Option key={index} value={curr.name}>{curr.name}</Option>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
        
                        <Grid item xs={6} sm={6} md={1}>
                            <FormControl>
                                <JoyButton 
                                onClick={handleGetFilterData}
                                >
                                    Submit
                                </JoyButton>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} sm={6} md={1}>
                            <FormControl >
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
                            <TableCell align="center"><b>Sl No</b></TableCell>
                            <TableCell align="center"><b>User</b></TableCell>
                            <TableCell align="center"><b>Email</b></TableCell>
                            <TableCell align="center"><b>Date</b></TableCell>
                            <TableCell align="center"><b>Time</b></TableCell>
                            <TableCell align="center"><b>Amount</b></TableCell>
                            <TableCell align="center"><b>Status</b></TableCell>
                            <TableCell align="center"><b>Edit</b></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {transferTransaction.map((transact, index) => (
                            <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {/* Sl No. Column */}
                                <TableCell scope="row">
                                    {transact?.transaction?.id}
                                </TableCell>

                                {/* Merchant Name Column */}
                                <TableCell scope="row" align='left'>
                                    {transact?.user?.first_name} {transact?.user?.lastname}
                                </TableCell>

                                {/* Merchant Email Column */}
                                <TableCell  scope="row" align='center'>
                                    {transact?.user?.email}
                                </TableCell>

                                {/* Date Column */}
                                <TableCell component="th" scope="row" align="center">
                                    {transact?.transaction?.created_At.split('T')[0] || ''}
                                </TableCell>

                                {/* Time Column */}
                                <TableCell component="th" scope="row" align="center">
                                    {transact?.transaction?.created_At.split('T')[1] || ''}
                                </TableCell>

                                {/* Transfer Amount */}
                                <TableCell component="th" scope="row" align="center">
                                    {transact?.transaction?.amount} {transact.sender_currency?.name}
                                </TableCell>

                                {/* Status Column */}
                                <TableCell component="th" scope="row" align="center">
                                    <Chip label={transact?.transaction?.status} variant="outlined" color={getStatusColor(transact?.transaction?.status)} />
                                </TableCell>

                                <TableCell component="th" scope="row" align="center">
                                    <IconButton aria-label="Example" onClick={()=> {handleEditClicked(transact)}}>
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