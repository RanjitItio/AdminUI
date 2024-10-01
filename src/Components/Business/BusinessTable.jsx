import { Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Paper, Box, Typography, Grid } from '@mui/material';
import { Main, DrawerHeader } from '../Content';
import { useEffect, useState } from 'react';
import axiosInstance from '../Authentication/axios';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import { useNavigate } from 'react-router-dom';
import Button from '../MUIBaseButton/button';
import Input from '@mui/joy/Input';
import EditIcon from '@mui/icons-material/Edit';
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





// All Merchant created Business table
export default function MerchantBusinessTable({open}) {
    const navigate = useNavigate();
    const theme    = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [merchantBusinessData, updateMerchantBusinessData] = useState([]);  // Busienss Data
    const [totalRows, updateTotalRows] = useState(0); // Total business rows
    const [searchedText, updateSearchedText] = useState('');  // Searched Data
    const [exportData, updateExportData] = useState([]); // Excel Data

    const [showFilters, setShowFilters]      = useState(false);  // Filter fileds state
    const [filterDate, setFilterDate]        = useState('');  // Filter date state field
    const [filterError, setFilterError]      = useState('');  // Error message of filter
    const [filterData, updateFilterData]     = useState({
        status: '',
        merchantName: '',
        business_name: '',
    });  // Filter filed data state

    const countPagination = Math.ceil(totalRows);

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


    // Fetch all the available businesses of merchant
    useEffect(() => {

        axiosInstance.get(`api/admin/all/merchant/`).then((res)=> {
            // console.log(res.data.data)
            if (res.data.data) {
                updateMerchantBusinessData(res.data.data)
                updateTotalRows(res.data.total_business_count)
                // setLoader(false)
            }

        }).catch((error)=> {
            console.log(error.response)

        })
    }, []);


    // Status Color
    function getStatusColor(status) {
        switch (status) {
            case 'Moderation':
                return 'orange'
            case 'Approved':
                return 'green'
            case 'Cancelled':
                return 'red'
        }
      };


    /// Method to handle Edit button click event
    const handleMerchantEdit = (merchant, user, group, currency)=> {
        const merchant_detail  = merchant
        const user_details     = user
        const group_details    = group
        const currency_details = currency

        navigate('/admin/merchant/details/', {state: {merchant: merchant_detail, user: user_details, group: group_details, currency: currency_details}})
    };

    
    // Input search field
    const handleSearchedText = (e)=> {
            updateSearchedText(e.target.value);
    };


    // Fetch searched data
    const handleSearchedData = ()=> {
        axiosInstance.get(`api/v2/admin/search/merchant/?query=${searchedText}`).then((res)=> {
            console.log(res);

            if (res.status === 200 && res.data.data) {
                updateMerchantBusinessData(res.data.data)
            };

        }).catch((error)=> {
            console.log(error);

        })
    };


    // Get all the pagination data
    const handlePaginationData = (e, value)=> {
        let limit = 15;
        let offset = (value - 1) * limit;

        axiosInstance.get(`api/admin/all/merchant/?limit=${limit}&offset=${offset}`).then((res)=> {
            // console.log(res)
            if (res.status === 200 && res.data.data) {
                updateMerchantBusinessData(res.data.data)
            };

        }).catch((error)=> {
            console.log(error);

        })
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
            saveAs(blob, 'business.xlsx');
        } else {
            console.log('No Data available to Download')
        }
    };

    // Download all withdrawal requests
    const handleDownloadBusiness = ()=> {
        axiosInstance.get(`/api/v2/admin/export/business/`).then((res)=> {
            // console.log(res)
    
            if (res.status === 200 && res.data.success === true) {
                updateExportData(res.data.merchant_business_export);
                
                setTimeout(() => {
                    exportToExcel();
                }, 1000);
            };
    
          }).catch((error)=> {
            console.log(error)

          })
    };

    // Reset Filter inputs
    const handelFilterReset = ()=> {
        setFilterDate('');
        updateFilterData({
            status: '',
            merchantName: '',
            business_name: ''
        })
        handlePaginationData('e', 1);
    };


    // Get Filter data
    const handleFilterData = ()=> {
        axiosInstance.post(`/api/v2/admin/filter/merchant/business/`, {
            date: filterDate,
            merchant_name: filterData.merchantName,
            business_name: filterData.business_name,
            status: filterData.status

        }).then((res)=> {
            // console.log(res)

            if (res.status === 200 && res.data.success === true) {
                updateMerchantBusinessData(res.data.filtered_business)
                setFilterError('')
            }

        }).catch((error)=> {
            // console.log(error)

            if (error.response.data.message === 'Invalid merchant name') {
                setFilterError('Invalid Merchant Name')
            } else if (error.response.data.message === 'No business found') {
                setFilterError('No data found')
            } else if (error.response.data.message === 'No data found') {
                setFilterError('No data found')
            } else {
                setFilterError('')
            };
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
                            <b>All Merchant Business</b>
                        </Typography>

                        {isSmallScreen ? (
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <IconButton aria-label="export" onClick={handleDownloadBusiness}>
                                    <FileDownloadIcon color='primary' />
                                </IconButton>

                                <IconButton aria-label="filter" onClick={handleToggleFilters}>
                                    <FilterAltIcon color='primary' />
                                </IconButton>
                            </div>
                            ) : (
                            <div>
                                <Button sx={{ mx: 1 }} onClick={handleDownloadBusiness}>Export</Button>
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
                                    placeholder="Merchant Name" 
                                    name='merchantName'
                                    value={filterData.merchantName}
                                    onChange={handleFilterInputChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={2.5}>
                            <FormControl fullWidth>
                                <Input 
                                    name='business_name'
                                    value={filterData.business_name}
                                    onChange={handleFilterInputChange}
                                    placeholder="Business Name" 
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
                                onClick={handelFilterReset}
                                >
                                    Reset
                                </JoyButton>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <small style={{color:'red'}}>{filterError && filterError}</small>
                </>
                )}
            {/* <Box 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'start',
                    alignItems: 'center',
                    p:2
                    }}>
                <Input placeholder="Type in here…" onChange={handleSearchedText} />

                <IconButton aria-label="Example" onClick={handleSearchedData}>
                    <SearchIcon color='primary' />
                </IconButton>

                <Button sx={{mx:1}} onClick={()=> {handleDownloadBusiness(); }}>Export</Button>
            </Box> */}

            <TableContainer>
            <Box sx={{ maxHeight:'90rem', overflowY: 'auto' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{position:'sticky', zIndex: 1, top: 0, backgroundColor: '#e2f4fb'}}>
                        <TableRow>
                            <TableCell><b>Sl No.</b></TableCell>
                            <TableCell align="center"><b>Merchant</b></TableCell>
                            <TableCell align="left"><b>Business</b></TableCell>
                            <TableCell align="left"><b>Date</b></TableCell>
                            <TableCell align="center"><b>Group</b></TableCell>
                            <TableCell align="center"><b>URL</b></TableCell>
                            <TableCell align="right"><b>Logo</b></TableCell>
                            <TableCell align="right"><b>Status</b></TableCell>
                            <TableCell align="right"><b>Action</b></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {merchantBusinessData.map((row, index) => (
                            <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {/* Sl No */}
                                <TableCell component="th"  scope="row" >
                                    {row.merchant.id}
                                </TableCell>

                                {/* User Full Name */}
                                <TableCell component="th" scope="row" align='center'>
                                    {row.user.full_name}
                                </TableCell>

                                {/* Merchant Name */}
                                <TableCell align="left">
                                    {row.merchant.bsn_name}
                                </TableCell>

                                {/* Created Date */}
                                <TableCell align="left">
                                    {row.merchant.created_date}
                                </TableCell>

                                {/* Group Name */}
                                <TableCell align="left">
                                    {row.group ? row.group.name : 'NA'}
                                </TableCell>

                                {/* Merchant URL */}
                                <TableCell align="left">
                                    <a href={row.merchant.bsn_url}>{row.merchant.bsn_url}</a>
                                </TableCell>

                                {/* Merchant Logo */}
                                <TableCell align="left">
                                    <img src={row.merchant.logo} alt="Merchant Logo" style={{maxWidth: '50px', maxHeight: '50px'}}/>
                                </TableCell>

                                
                                <TableCell align="left" style={{color: getStatusColor(row.merchant.status)}}>
                                    {row.merchant.status === 'Cancelled' ? 'Rejected': row.merchant.status}
                                </TableCell>

                                <TableCell align="right">
                                    <IconButton 
                                        color="success" 
                                        style={{float: 'left'}} 
                                        onClick={(event)=> {handleMerchantEdit(row.merchant, row.user, row.group, row.currency)}} 
                                        >
                                        <EditIcon 
                                            style={{color:'#0e3080'}} 
                                            />
                                    
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
                    onChange={(e, value)=> {handlePaginationData(e, value);}}
                    color="primary"
                    sx={{mb:2, mt:2}}
                    />

            </Box>

            </TableContainer>

            </Paper>
        </Main>
    );
};