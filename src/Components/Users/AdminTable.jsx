import { Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Box } from '@mui/material';
import { Main, DrawerHeader } from '../Content';
import { useEffect, useState } from 'react';
import axiosInstance from '../Authentication/axios';
import ModeEditSharpIcon from '@mui/icons-material/ModeEditSharp';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Pagination from '@mui/material/Pagination';
import { useNavigate } from 'react-router-dom';
import Button from '../MUIBaseButton/button';
import Input from '@mui/joy/Input';
import SearchIcon from '@mui/icons-material/Search';








// All Admin users
export default function AllAdminUsers({open}) {
const navigate = useNavigate();
const [adminUsers, updateAdminUsers] = useState([]); // All Admin users


// Call API to fetch all the Transactions
useEffect(()=> {
    axiosInstance.get(`api/v2/admin/users/`).then((res)=> {
        // console.log(res)
        if (res.status === 200 && res.data.all_admin_users) {
            updateAdminUsers(res.data.all_admin_users)
        }

    }).catch((error)=> {
        console.log(error)
 
    })
}, []);


// Change status color according to the transaction status
const getStatusColor = (status)=> {
 switch (status) {
     case true:
          return 'success'
     case false:
         return 'error'
     case null:
         return 'warning'
     default:
         return 'primary'
 }
};





return (
 <Main open={open}>
     <DrawerHeader />

     <Paper elevation={3} sx={{p:1, borderRadius: '20px'}}> 
         <h5 style={{margin:9}}><b>All Merchant Transactions</b></h5>
     <Box 
         sx={{ 
             display: 'flex', 
             justifyContent: 'start',
             alignItems: 'center',
             p:2
             }}>
         <Input placeholder="Type in here…"/>
         <IconButton aria-label="Example">
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
                     <TableCell align="center"><b>Name</b></TableCell>
                     <TableCell align="left"><b>Email</b></TableCell>
                     <TableCell align="left"><b>Mobile No.</b></TableCell>
                     <TableCell align="center"><b>Group</b></TableCell>
                     <TableCell align="center"><b>Status</b></TableCell>
                     <TableCell align="right"><b>Edit</b></TableCell>
                 </TableRow>
             </TableHead>

             <TableBody>
                 {adminUsers.map((user, index) => (
                     <TableRow
                     key={index}
                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                     >
                         <TableCell scope="row">
                             {user?.id}
                         </TableCell>

                         <TableCell scope="row" align='left'>
                             {user?.full_name}
                         </TableCell>

                         <TableCell  scope="row" align='left'>
                             {user?.email}
                         </TableCell>

                         <TableCell component="th" scope="row">
                             {user?.mobile_number}
                         </TableCell>

                         <TableCell component="th" scope="row">
                             {user?.group}
                         </TableCell>

                         <TableCell component="th" scope="row">
                             <Chip label={user.status ? (user.status ? 'Active' : 'Inactive') : 'NA'} variant="outlined" color={getStatusColor(user?.status)} />
                         </TableCell>

                         <TableCell component="th" scope="row" align='right'>
                             <IconButton aria-label="Example">
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
            //  count={countPagination}
            //  onChange={(e, value)=> {handlePaginatedData(e, value);}}
             color="primary"
             sx={{mb:2, mt:2}}
             />
     </Box>

     </TableContainer>

     </Paper>
 </Main>
);
};