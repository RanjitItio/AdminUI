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


/// All FIAT Withdrawals
export default function FiatWithdrawals({open}) {

    const navigate      = useNavigate();
    const theme         = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    
    const [withdrawals, updateWithdrawals] = useState([]);  // All Transactions
    const [totalRows, updateTotalRows] = useState(0);     // Paginated Rows
    const [searchQuery, updateSearchQuery] = useState('');  // Search Query state
    const [showFilters, setShowFilters]      = useState(false);  // Filter fileds state
    const [filterDate, setFilterDate]        = useState('');  // Filter date state field
    const [filterError, setFilterError]      = useState('');  // Error message of filter
    const [filterData, updateFilterData]     = useState({
        merchant_email: '',
        WithdrawalCurrency: '',
        withdrawalAmount: ''
    });

    const counPagination = Math.ceil(totalRows);   // Total pagination count

    /// Open close Filter fields
    const handleToggleFilters = () => {
        setShowFilters(!showFilters);
    };

    // Fetch all the Withdrawals
    useEffect(() => {
        axiosInstance.get(`/api/v5/admin/fiat/withdrawals/`).then((res)=> {
          // console.log(res)
          if (res.status === 200 && res.data.success === true) {
                updateWithdrawals(res.data.all_admin_fiat_withdrawals)
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
            saveAs(blob, 'withdrawals.xlsx');
        } else {
            console.log('No Data available to Download')
        }
    };



    // Download all Deposit transactions
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

        axiosInstance.get(`/api/v5/admin/fiat/withdrawals/?limit=${limit}&offset=${offset}`).then((res)=> {
            // console.log(res)
            if (res.status === 200 && res.data.success === true) {
                updateWithdrawals(res.data.all_admin_fiat_withdrawals)
            };

        }).catch((error)=> {
            console.log(error);

        })
    };


    // Method to redirect the user to Edit page
    const handleEditClicked = (withdraw)=> {
        navigate('/admin/withdrawls/update/', {state: {withdrawal: withdraw}})
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
                            <b>All FIAT Withdrawals</b>
                        </Typography>
                       
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
                                    // onChange={(e, newValue) => handleFilterDateChange(e, newValue)}
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
                                    // value={filterData.merchant_email}
                                    // onChange={handleFilterInputChange}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} md={2.5}>
                                <FormControl fullWidth>
                                    <Input 
                                        name='Status'
                                        // value={filterData.WithdrawalCurrency}
                                        // onChange={handleFilterInputChange}
                                        placeholder="Status" 
                                        />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} md={2.5}>
                                <FormControl fullWidth>
                                    <Input 
                                        placeholder="Amount"
                                        name='Amount'
                                        // value={filterData.withdrawalAmount} 
                                        // onChange={handleFilterInputChange}
                                        />
                                </FormControl>
                            </Grid>
                            
                            <Grid item xs={6} sm={6} md={1}>
                                <FormControl fullWidth>
                                    <JoyButton 
                                    // onClick={handleFilterData}
                                    >
                                        Submit
                                    </JoyButton>
                                </FormControl>
                            </Grid>

                            <Grid item xs={6} sm={6} md={1}>
                                <FormControl fullWidth>
                                    <JoyButton 
                                    // onClick={handleFilterData}
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
                                    <TableCell align="center"><b>Withdrawal Amount</b></TableCell>
                                    <TableCell align="center"><b>Date</b></TableCell>
                                    <TableCell align="center"><b>Time</b></TableCell>
                                    <TableCell align="center"><b>Status</b></TableCell>
                                    <TableCell align="center"><b>Edit</b></TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {withdrawals.map((transaction, index) => (
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
                                            {transaction?.user_name}
                                        </TableCell>

                                        {/* Merchant Email Column */}
                                        <TableCell  scope="row" align='center'>
                                            {transaction?.user_email}
                                        </TableCell>

                                        {/* Withdrawal Amount Column */}
                                        <TableCell  scope="row" align='center'>
                                            {transaction?.amount} {transaction?.withdrawal_currency}
                                        </TableCell>

                                        {/* Date Column */}
                                        <TableCell component="th" scope="row" align="center">
                                            {transaction?.created_At?.split('T')[0] || ''}
                                        </TableCell>

                                        {/* Time Column */}
                                        <TableCell component="th" scope="row" align="center">
                                            {transaction?.created_At?.split('T')[1] || ''}
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