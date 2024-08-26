import { Main, DrawerHeader } from "../Content";
import { Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Paper, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import axiosInstance from "../Authentication/axios";
import ModeEditSharpIcon from '@mui/icons-material/ModeEditSharp';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Pagination from '@mui/material/Pagination';
import Input from '@mui/joy/Input';
import SearchIcon from '@mui/icons-material/Search';
import Button from "../MUIBaseButton/button";
import { useNavigate } from "react-router-dom";
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';





// All Merchant Withdrawal transactions of PG
export default function Revenues({open}) {
    const [revenueData, updateRevenuesData] = useState([]);  // All merchant withdrawals


    
    const pipeNames  = revenueData.flatMap(obj => Object.keys(obj))

    // Fetch all Revenues
    useEffect(() => {
      axiosInstance.get(`/api/v6/admin/revenues/`).then((res)=> {
        // console.log(res)
        if (res.status === 200 && res.data.success === true) {
          const RevenueData = Array.isArray(res.data.pipe_wise_transactions) ? res.data.pipe_wise_transactions : [res.data.pipe_wise_transactions]
          updateRevenuesData(RevenueData)
        };

      }).catch((error)=> {
        console.log(error)

      })
    }, []);


    
    return (
        <Main open={open}>
            <DrawerHeader />

            <Paper elevation={3} sx={{p:1, borderRadius: '20px'}}> 
                <h5 style={{margin:9}}><b>All Revenues</b></h5>
            <Box 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'start',
                    alignItems: 'center',
                    p:2
                    }}>
                <Input placeholder="Type in here…" />
                <IconButton aria-label="Example" >
                    <SearchIcon color='primary' />
                </IconButton>
            </Box>

            <TableContainer>
            <Box sx={{ height: 450, overflowY: 'auto' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{position:'sticky', zIndex: 1, top: 0, backgroundColor: '#e2f4fb'}}>
                        <TableRow>
                            <TableCell align="center"><b>Gateway ID</b></TableCell>
                            <TableCell align="center"><b>PIPE</b></TableCell>
                            <TableCell align="center"><b>Fee</b></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {revenueData.map((row, index) => (
                          
                            <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              
                                <TableCell scope="row" >
                                   
                                </TableCell>
                             
                                
                                <TableCell scope="row">
                                    Name
                                </TableCell>

                                <TableCell scope="row">
                                    Fee
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>

            <Box sx={{display:'flex', justifyContent:'space-between'}}>
                <Pagination 
                    count={1}
                    color="primary" 
                    sx={{mb:2, mt:2}} 
                    />
            </Box>

            </TableContainer>

            </Paper>
        </Main>
    );
}