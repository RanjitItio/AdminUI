import { Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Paper, Box } from '@mui/material';
import { Main, DrawerHeader } from '../Content';
import { useEffect, useState } from 'react';
import axiosInstance from '../Authentication/axios';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import { useNavigate } from 'react-router-dom';
import Button from '../MUIBaseButton/button';
import Input from '@mui/joy/Input';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';




// All Merchant created Business table
export default function MerchantBusinessTable({open}) {
    const navigate = useNavigate();
    const [merchantBusinessData, updateMerchantBusinessData] = useState([]);  // Busienss Data
    const [totalRows, updateTotalRows] = useState(0); // Total business rows
    const [searchedText, updateSearchedText] = useState('');


    const countPagination = Math.ceil(totalRows);

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


    return (
        <Main open={open}>
            <DrawerHeader />

            <Paper elevation={3} sx={{p:1, borderRadius: '20px'}}> 
                <h5 style={{padding:5, marginLeft:5, marginTop:6}}><b>All Business Data</b></h5>
            <Box 
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

                <Button sx={{mx:1}}>Export</Button>
            </Box>

            <TableContainer>
            <Box sx={{ height: 450, overflowY: 'auto' }}>
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
                                    <IconButton color="success" style={{float: 'left'}} >
                                        <EditIcon 
                                            style={{color:'#0e3080'}} 
                                            onClick={(event)=> {handleMerchantEdit(row.merchant, row.user, row.group, row.currency)}} 
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