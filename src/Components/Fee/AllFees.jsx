import { Main, DrawerHeader } from '../Content';
import { Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Paper, Box, Grid, 
    Typography} from '@mui/material';
import { useEffect, useState } from 'react';
import axiosInstance from "../Authentication/axios";
import ModeEditSharpIcon from '@mui/icons-material/ModeEditSharp';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Pagination from '@mui/material/Pagination';
import Button from "../MUIBaseButton/button";
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useMediaQuery } from '@mui/material';






// All available Fees
export default function AllFees({open}) {

    const navigate = useNavigate();
    const theme    = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [fees, updateFees] = useState([]);  // All Fees data
    const [totalRows, updateTotalRows]   = useState(0);  // Paginated value

    const counPagination = Math.floor(totalRows);   // Total pagination count


    // Fetch all the merchant withdrawals
    useEffect(() => {
      axiosInstance.get(`/api/v3/admin/fees/`).then((res)=> {
        // console.log(res)
        if (res.status === 200 && res.data.success === true) {
            updateFees(res.data.fee_structure_data)
        };

      }).catch((error)=> {
        // console.log(error)

      })
    }, []);


    // Method to redirect to update page
    const handleEditClicked = (fees)=> {
        navigate('/admin/update/fees/', {state: {fees: fees}})
    };


    // Get the paginated data
    const handlePaginatedData = (e, value)=> {
        let limit = 10;
        let offset = (value - 1) * limit;

        axiosInstance.get(`/api/v3/admin/fees/limit=${limit}&offset=${offset}`).then((res)=> {
            // console.log(res)
            if (res.status === 200 && res.data.success === true) {
                updateFees(res.data.fee_structure_data)
            };

        }).catch((error)=> {
            // console.log(error);

        })  
    };





     return (
    <>
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
                                <b>All Available Fees</b>
                            </Typography>

                    {/* For small screen sizes */}
                    {isSmallScreen ? (
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <IconButton aria-label="export" onClick={()=> navigate('/admin/add/fees/')}>
                                    <FileDownloadIcon color='primary'/>
                                </IconButton>
                            </div>
                            ) : (
                            <div>
                                <Button sx={{ mx: 1 }} onClick={()=> navigate('/admin/add/fees/')}>Add</Button>
                            </div>
                        )}
                </Box>

            <TableContainer>
            <Box sx={{ maxHeight: '130rem', overflowY: 'auto' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{position:'sticky', zIndex: 1, top: 0, backgroundColor: '#e2f4fb'}}>
                        <TableRow>
                            <TableCell align="center"><b>Name</b></TableCell>
                            <TableCell align="center"><b>Type</b></TableCell>
                            <TableCell align="center"><b>Tax Rate</b></TableCell>
                            <TableCell align="center"><b>Fixed Value</b></TableCell>
                            <TableCell align="center"><b>Date Updated</b></TableCell>
                            <TableCell align="center"><b>Edit</b></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {fees.map((fee, index) => (
                            <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {/* Sl No. Column */}
                                <TableCell scope="row" align='center'>
                                    {fee?.name}
                                </TableCell>

                                {/* Merchant Name Column */}
                                <TableCell scope="row" align='center'>
                                    {fee?.fee_type}
                                </TableCell>

                                {/* Merchant Email Column */}
                                <TableCell  scope="row" align='center'>
                                    {fee?.tax_rate || 0}
                                </TableCell>

                                {/* Withdrawal Amount */}
                                <TableCell component="th" scope="row" align="center">
                                    {fee?.min_value || 0}
                                </TableCell>

                                {/* Date Column */}
                                <TableCell component="th" scope="row" align="center">
                                    {fee?.created_at.split('T')[0] || ''}
                                </TableCell>

                                <TableCell component="th" scope="row" align="center">
                                    <IconButton aria-label="Example" onClick={()=> {handleEditClicked(fee)}}>
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

    </>
     );
};