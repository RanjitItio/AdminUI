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
import SearchIcon from '@mui/icons-material/Search';
import Button from '../../Components/MUIBaseButton/button';
import { useNavigate } from "react-router-dom";
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';



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
    
    const [transferTransaction, setTransferTransaction] = useState([]);  // All Transactions
    const [totalRows, updateTotalRows] = useState(0);     // Paginated Rows
    const [searchQuery, updateSearchQuery] = useState('');  // Search Query state

    const counPagination = Math.ceil(totalRows);   // Total pagination count

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


    // Input Search values
    const handleSearchInputChange = (e)=> {
        updateSearchQuery(e.target.value);
    };


    // Search Transfer Transactions
    const handleSearch = ()=> {
        axiosInstance.get(`api/v4/admin/merchant/withdrawal/search/?query=${searchQuery}`).then((res)=> {
            // console.log(res)

            if (res.status === 200 && res.data.success === true) {
                setTransferTransaction(res.data.transfer_transactions)
            };

        }).catch((error)=> {
            console.log(error)

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
            saveAs(blob, 'withdrawals.xlsx');
        } else {
            console.log('No Data available to Download')
        }
    };


    
    // Download all Transfer Transaction
    const handleDownloadTransfers = ()=> {
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

        axiosInstance.get(`/api/v1/admin/transfer/transactions/?limit=${limit}&offset=${offset}`).then((res)=> {
            // console.log(res)
            if (res.status === 200 && res.data.success === true) {
                setTransferTransaction(res.data.transfer_transactions)
            };

        }).catch((error)=> {
            console.log(error);

        })
    };


    // Method to redirect the user to Edit page
    const handleEditClicked = (transact)=> {
        navigate('/admin/transfers/details/', {state: {transactionID: transact}})
    };


    return (
        <Main open={open}>
            <DrawerHeader />

            <Paper elevation={3} sx={{p:1, borderRadius: '20px'}}> 
                <h5 style={{margin:9}}><b>All Transfers</b></h5>
            <Box 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'start',
                    alignItems: 'center',
                    p:2
                    }}>
                <Input placeholder="Type in here…" onChange={handleSearchInputChange}/>
                <IconButton aria-label="Example" onClick={handleSearch}>
                    <SearchIcon color='primary' />
                </IconButton>
                <Button sx={{mx:1}} onClick={handleDownloadTransfers}>Export</Button>
            </Box>


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