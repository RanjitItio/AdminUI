import { Main, DrawerHeader } from '../../Components/Content';
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
import Tooltip from '@mui/material/Tooltip';



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


// All users wallet requests
export default function UserWalletRequests({open}) {
    const navigate = useNavigate();
    const theme    = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [cryptoWallets, updateCryptoWallets] = useState([]);  // All merchant withdrawals
    const [exportData, updateExportData]       = useState([]); // Excel Data
    const [totalRows, updateTotalRows]         = useState(0);  // Paginated value
    const [showFilters, setShowFilters]        = useState(false);  // Filter fileds state
    const [filterDate, setFilterDate]          = useState('');  // Filter date state field
    const [filterError, setFilterError]        = useState('');  // Error message of filter
    const [filterData, updateFilterData]       = useState({
        user_email: '',
        crypto_name: '',
        status: ''
    });  // Filter filed data state

    const counPagination = Math.ceil(totalRows);   // Total pagination count


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


    // Fetch all the merchant withdrawals
    useEffect(() => {
      axiosInstance.get(`/api/v2/admin/crypto/wallets/`).then((res)=> {
        // console.log(res)
        if (res.status === 200 && res.data.success === true) {
            updateCryptoWallets(res.data.all_user_crypto_wallets)
            updateTotalRows(res.data.total_rows)
        };

      }).catch((error)=> {
        console.log(error)

      })
    }, []);


    // Method to redirect the user to Edit page
    const handleEditClicked = (Wallet)=> {
        navigate('/admin/user/update/crypto/wallets/', {state: {Wallet: Wallet}})
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
            saveAs(blob, 'Wallet.xlsx');
        } else {
            console.log('No Data available to Download')
        }
    };


    // Download all withdrawal requests
    const handleDownloadCryptoWallets = ()=> {
        axiosInstance.get(`/api/v2/admin/export/crypto/wallets/`).then((res)=> {
            // console.log(res)
            if (res.status === 200) {
                updateExportData(res.data.export_wallets_data)

                exportToExcel();
            }

        }).catch((error)=> {
            // console.log(error)

        })
    };


    // Get the paginated data
    const handlePaginatedData = (e, value)=> {
        let limit = 10;
        let offset = (value - 1) * limit;

        axiosInstance.get(`/api/v2/admin/crypto/wallets/?limit=${limit}&offset=${offset}`).then((res)=> {
            // console.log(res)
            if (res.status === 200 && res.data.success === true) {
                updateCryptoWallets(res.data.all_user_crypto_wallets)
            }

        }).catch((error)=> {
            console.log(error);

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


    // Get Filter data
    const handleFilterData = ()=> {
        axiosInstance.post(`/api/v2/admin/crypto/wallets/`, {
            date_range: filterDate,
            email: filterData.user_email,
            crypto_name: filterData.crypto_name,
            status: filterData.status

        }).then((res)=> {
            // console.log(res);

            if(res.status === 200) {
                updateCryptoWallets(res.data.all_user_crypto_wallets)
            }

        }).catch((error)=> {
            // console.log(error)

            setTimeout(() => {
                setFilterError('')
            }, 2000);

            if (error.response.data.message === 'Unauthorized') {
                navigate('/signin/')
            } else if (error.response.data.message === 'Invalid Email') {
                setFilterError('Invalid Email address')
            } else if (error.response.data.message === 'No wallet found') {
                setFilterError('No data found')
            }
        })
    };


    return (
        <Main open={open}>
            <DrawerHeader />

            <Paper elevation={3} sx={{p:1, borderRadius: '20px'}}> 
                <Box 
                    sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p:2
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
                                <b>All Crypto Wallets</b>
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
                                <Button sx={{ mx: 1 }} onClick={handleDownloadCryptoWallets}>Export</Button>
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
                                onChange={handleFilterInputChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={2.5}>
                            <FormControl fullWidth>
                                <Input 
                                    name='crypto_name'
                                    value={filterData.crypto_name}
                                    onChange={handleFilterInputChange}
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
                            <TableCell align="center"><b>Date</b></TableCell>
                            <TableCell align="center"><b>Time</b></TableCell>
                            <TableCell align="center"><b>User</b></TableCell>
                            <TableCell align="center"><b>Email</b></TableCell>
                            <TableCell align="center"><b>Crypto</b></TableCell>
                            <TableCell align="center"><b>Status</b></TableCell>
                            <TableCell align="center"><b>Edit</b></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {cryptoWallets.map((wallet, index) => (
                            <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {/* Date Column */}
                                <TableCell scope="row">
                                    {wallet.created_At ? wallet.created_At.split('T')[0] : ''}
                                </TableCell>

                                {/* Time Column */}
                                <TableCell scope="row" align='left'>
                                    {wallet.created_At ? wallet.created_At.split('T')[1] : ''}
                                </TableCell>

                                {/* User Name Column */}
                                <TableCell  scope="row" align='center'>
                                    {wallet?.user_name || ''}
                                </TableCell>

                                {/* Email Column */}
                                <TableCell component="th" scope="row" align="center">
                                    {wallet?.user_email || ''}
                                </TableCell>

                                {/* Crypto Column */}
                                <TableCell component="th" scope="row" align="center">
                                    <Tooltip title={wallet?.crypto_name || ''}>
                                        <img 
                                            src={getCryptoIcons(wallet?.crypto_name || '')} 
                                            alt={wallet?.crypto_name || ''} 
                                            style={{width:'30px', height:'30px'}}
                                        />
                                    </Tooltip>
                                </TableCell>

                                {/* Status Column */}
                                <TableCell component="th" scope="row" align="center">
                                    <Chip label={wallet?.status || ''} variant="outlined" color={getStatusColor(wallet?.status || '')} />
                                </TableCell>

                                <TableCell component="th" scope="row" align="center">
                                    <IconButton aria-label="Example" onClick={()=> {handleEditClicked(wallet)}}>
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