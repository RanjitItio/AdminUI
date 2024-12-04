import { Main, DrawerHeader } from "../Content";
import { Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Paper, Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axiosInstance from "../Authentication/axios";
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Pagination from '@mui/material/Pagination';
import Input from '@mui/joy/Input';
import SearchIcon from '@mui/icons-material/Search';
import Button from "../MUIBaseButton/button";
import { useNavigate } from "react-router-dom";
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PipeDeleteModal from './PipeDeleteModal';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Tooltip from '@mui/material/Tooltip';





// All Merchant Withdrawal transactions of PG
export default function AllPipeTable({open}) {
    const navigate = useNavigate();
    const theme    = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [pipeData, updatePipeData]          = useState([]);  // All merchant withdrawals
    const [searchQuery, updateSearchQuery]    = useState('');  // Search Query state
    const [exportData, updateExportData]      = useState([]); // Excel Data
    const [totalRows, updateTotalRows]        = useState(0);  // Total Pipe rows
    const [pipeDeleteOpen, setPipeDeleteOpne] = useState(false);   // States to open pipe delete modal
    const [pipeID, updatePipeID]              = useState(0);  

    const counPagination = Math.ceil(totalRows);   // Total pagination count

    // Fetch all the pipes
    useEffect(() => {
      axiosInstance.get(`api/v5/admin/pipes/`).then((res)=> {
        // console.log(res)
        if (res.status === 200 && res.data.all_pipes_data) {
            updatePipeData(res.data.all_pipes_data)
            updateTotalRows(res.data.total_row_count)
        };

      }).catch((error)=> {
        console.log(error)

      })
    }, []);


    // Change status color according to the transaction status
    const getStatusColor = (status)=> {
        switch (status) {
            case 'Hold':
                 return 'primary'
            case 'Active':
                return 'success'
            case 'Inactive':
                return 'error'
            case 'Pending':
                return 'warning'
            default:
                return 'primary'
        }
    };


    // Search Withdrawal Transactions
    const handleSearch = ()=> {
        axiosInstance.get(`api/v5/admin/search/pipe/?query=${searchQuery}`).then((res)=> {
            // console.log(res)

            if (res.status === 200 && res.data.all_searched_pipes_) {
                updatePipeData(res.data.all_searched_pipes_)
            };

        }).catch((error)=> {
            console.log(error)

        })
    };


    // Input Search values
    const handleSearchInputChange = (e)=> {
        updateSearchQuery(e.target.value);
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
            saveAs(blob, 'pipeData.xlsx');
        } else {
            console.log('No Data available to Download')
        }
    };


    // Download all withdrawal requests
    const handleDownloadPipes = ()=> {
        axiosInstance.get(`/api/v5/admin/export/pipe/`).then((res)=> {
            // console.log(res)
    
            if (res.status === 200 && res.data.success === true) {
                updateExportData(res.data.export_pipe_data);
                
                setTimeout(() => {
                    exportToExcel();
                }, 1000);
            };
    
          }).catch((error)=> {
            console.log(error)
    
          })
    };

 
    // Get the paginated data
    const handleDownloadPaginatedData = (e, value)=> {
        let limit = 15;
        let offset = (value - 1) * limit;

        axiosInstance.get(`api/v5/admin/pipes/?limit=${limit}&offset=${offset}`).then((res)=> {
            // console.log(res)
            if (res.status === 200 && res.data.all_pipes_data) {
                updatePipeData(res.data.all_pipes_data)
            }

        }).catch((error)=> {
            console.log(error);

        })
    };

    // Edit Button Clicked
    const handleEditButtonClicked = (pipe_data)=> {
        navigate('/admin/update/pipe/', {state: {pipe_data: pipe_data}})
    };

    // Method to open Delete modal
  const handleDeleteButtonClicked = (pipe_id)=> {
        setPipeDeleteOpne(true);
        updatePipeID(pipe_id)
    };

    
    return (
        <>
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
                            <b>All Available Pipes</b>
                    </Typography>
                
                    {isSmallScreen ? (
                        <></>
                    ) : (
                        <div style={{display:'flex', justifyContent:'center'}}>
                            <Input placeholder="Type in here…" onChange={handleSearchInputChange}/>
                            <IconButton aria-label="Example" onClick={handleSearch}>
                                <SearchIcon color='primary' />
                            </IconButton>
                            <Button sx={{mx:1}} onClick={handleDownloadPipes}>Export</Button>
                            <Button sx={{mx:1}} onClick={()=> {navigate('/admin/add/pipe/')}}>Add</Button>
                        </div>
                    )}
               
            </Box>

            {isSmallScreen && (
                <div style={{display:'flex', justifyContent:'center', marginBottom:10}}>
                    <Input placeholder="Type in here…" onChange={handleSearchInputChange}/>
                    <IconButton aria-label="Example" onClick={handleSearch}>
                        <SearchIcon color='primary' />
                    </IconButton>

                    <Tooltip title="Export">
                        <IconButton aria-label="Example" onClick={handleDownloadPipes}>
                            <FileUploadIcon color='primary' />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Add new pipe">
                        <IconButton aria-label="Example" onClick={()=> {navigate('/admin/add/pipe/')}}>
                            <AddCircleIcon color='primary' />
                        </IconButton>
                    </Tooltip>
                </div>
            )}


            <TableContainer>
            <Box sx={{ maxHeight: '90rem', overflowY: 'auto' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{position:'sticky', zIndex: 1, top: 0, backgroundColor: '#e2f4fb'}}>
                        <TableRow>
                            <TableCell align="center"><b>Gateway ID</b></TableCell>
                            <TableCell align="center"><b>Pipe Name</b></TableCell>
                            <TableCell align="center"><b>Date Created</b></TableCell>
                            <TableCell align="center"><b>Process Mode</b></TableCell>
                            <TableCell align="center"><b>Currency</b></TableCell>
                            <TableCell align="center"><b>Status</b></TableCell>
                            <TableCell align="center"><b>Action</b></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {pipeData.map((row, index) => (
                            <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {/* Gateway ID Column */}
                                <TableCell scope="row" align="center">
                                    {row?.id}
                                </TableCell>

                                {/* Pipe Name Column */}
                                <TableCell scope="row" align='center'>
                                    {row.name}
                                </TableCell>

                                {/* Created Date Column */}
                                <TableCell  scope="row" align='center'>
                                    {row.created_at}
                                </TableCell>

                                {/* Processing Mode Column */}
                                <TableCell component="th" scope="row" align="center">
                                    {row.process_mode}
                                </TableCell>

                                {/* Currency Column */}
                                <TableCell component="th" scope="row" align="center">
                                    {row.process_curr?.name}
                                </TableCell>

                                {/* Status Column */}
                                <TableCell component="th" scope="row" align="center">
                                    <Chip label={row?.status} variant="outlined" color={getStatusColor(row?.status)} />
                                </TableCell>

                                <TableCell align="left">
                                    <IconButton aria-label="Example" onClick={()=> {handleEditButtonClicked(row);}} >
                                        <EditIcon color="" style={{color:'#0e3080'}}  />
                                    </IconButton>

                                    <IconButton aria-label="Example" onClick={()=> {handleDeleteButtonClicked(row.id)}}>
                                        <DeleteIcon style={{color:'#b23344'}} />
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
                    onChange={(e, value)=> {handleDownloadPaginatedData(e, value)}}
                    color="primary" 
                    sx={{mb:2, mt:2}} 
                    />
            </Box>

            </TableContainer>

            </Paper>
    </Main>

        <PipeDeleteModal open={pipeDeleteOpen} setOpen={setPipeDeleteOpne} pipe_id={pipeID} />
        </>
    );
}