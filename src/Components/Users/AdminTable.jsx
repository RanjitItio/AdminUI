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
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';








// All Admin users
export default function AllAdminUsers({open}) {
    const navigate = useNavigate();
    const [adminUsers, updateAdminUsers] = useState([]); // All Admin users
    const [exportData, updateExportData] = useState([]); // Excel Data
    const [searchedText, updateSearchedText] = useState('');  // Searched Text


    // Update Searched text value
    const handleChangeSearchedText = (e)=> {
        updateSearchedText(e.target.value)
    };


    // Search Admin users
    const handleSearch = ()=> {
        axiosInstance.get(`api/v2/search/admin/users/?query=${searchedText}`).then((res)=> {
            // console.log(res)
            if (res.status === 200 && res.data.success === true) {
                updateAdminUsers(res.data.searched_admin_users)
            }

        }).catch((error)=> {
            console.log(error)
        })
    };


    // Call API to fetch all Admin users
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
            saveAs(blob, 'admin.xlsx');
        } else {
            console.log('No Data available to Download')
        }
    };

    
    // Download all withdrawal requests
    const handleDownloadAdminData = ()=> {
        axiosInstance.get(`/api/v2/export/admin/users/`).then((res)=> {
            // console.log(res)
    
            if (res.status === 200 && res.data.success === true) {
                updateExportData(res.data.export_admin_data);
                
                setTimeout(() => {
                    exportToExcel();
                }, 1000);
            };
    
          }).catch((error)=> {
            console.log(error)
          })
    };



return (
 <Main open={open}>
     <DrawerHeader />

     <Paper elevation={3} sx={{p:1, borderRadius: '20px'}}> 
         <h5 style={{margin:9}}><b>All Admin Users</b></h5>
     <Box 
         sx={{ 
             display: 'flex', 
             justifyContent: 'start',
             alignItems: 'center',
             p:2
             }}>
         <Input placeholder="Type in here…" onChange={handleChangeSearchedText}/>
         
         <IconButton aria-label="Example" onClick={handleSearch}>
             <SearchIcon color='primary' />
         </IconButton>

         <Button sx={{mx:1}} onClick={()=> {handleDownloadAdminData(); }}>Export</Button>
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