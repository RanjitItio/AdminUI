import { Table, TableBody, TableCell, TableContainer, 
         TableHead, TableRow, Paper, Box } from '@mui/material';
import { Main, DrawerHeader } from '../Content';
import { useEffect, useState } from 'react';
import axiosInstance from '../Authentication/axios';
import ModeEditSharpIcon from '@mui/icons-material/ModeEditSharp';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Pagination from '@mui/material/Pagination';
import FormControlLabel from '@mui/material/FormControlLabel';
import { IOSSwitch } from '../Switch/TestProductionSwitch';
import { useNavigate } from 'react-router-dom';
import { Button as BaseButton, buttonClasses } from '@mui/base/Button';
import { styled } from '@mui/system';
import Input from '@mui/joy/Input';
import SearchIcon from '@mui/icons-material/Search';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { useTheme } from '@mui/material/styles';



const blue = {
    200: '#99CCFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0066CC',
  };
  

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };


const Button = styled(BaseButton)(
    ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    background-color: ${blue[500]};
    padding: 8px 16px;
    border-radius: 8px;
    color: white;
    transition: all 150ms ease;
    cursor: pointer;
    border: 1px solid ${blue[500]};
    box-shadow: 0 2px 1px ${
      theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(45, 45, 60, 0.2)'
    }, inset 0 1.5px 1px ${blue[400]}, inset 0 -2px 1px ${blue[600]};
  
    &:hover {
      background-color: ${blue[600]};
    }
  
    &.${buttonClasses.active} {
      background-color: ${blue[700]};
      box-shadow: none;
      transform: scale(0.99);
    }
  
    &.${buttonClasses.focusVisible} {
      box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
      outline: none;
    }
  
    &.${buttonClasses.disabled} {
      background-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
      color: ${theme.palette.mode === 'dark' ? grey[200] : grey[700]};
      border: 0;
      cursor: default;
      box-shadow: none;
      transform: scale(1);
    }
    `,
  );



// All Transaction Data
export default function AllMerchantPGTransactions({open}) {
    const [transactionData, updateTransactionData] = useState([]); // All Transaction data state
    const [modeName, setModeName] = useState('Production Mode');   // Mode Name
    const [exportData, updateExportData] = useState([]);

    const navigate = useNavigate();
    const theme = useTheme();


    // Call API to fetch all the Transactions
    useEffect(()=> {
        axiosInstance.get(`api/v2/admin/merchant/pg/transactions/`).then((res)=> {
            // console.log(res)

            if (res.status === 200 && res.data.message === 'Transaction fetched successfuly') {
                updateTransactionData(res.data.AdminmerchantPGTransactions)
            };

        }).catch((error)=> {
            console.log(error)
            
        })
    }, []);

    // Method for Test/Production checkbox
    const handleCheckBoxChange = (e)=> {
         const value = e.target.checked

         if (value === false) {
            axiosInstance.get(`/api/v2/admin/merchant/pg/sandbox/transactions/`).then((res)=> {
                // console.log(res)
    
                if (res.status === 200 && res.data.message === 'Transaction fetched successfuly') {
                    updateTransactionData(res.data.AdminmerchantPGSandboxTransactions)
                    setModeName('Test Mode')
                };
    
            }).catch((error)=> {
                console.log(error)
                
            })
         } else if (value === true) {
            axiosInstance.get(`api/v2/admin/merchant/pg/transactions/`).then((res)=> {
                // console.log(res)
    
                if (res.status === 200 && res.data.message === 'Transaction fetched successfuly') {
                    updateTransactionData(res.data.AdminmerchantPGTransactions)
                    setModeName('Production Mode')
                };
    
            }).catch((error)=> {
                console.log(error)
                
            })
         }
    };

    // Change status color according to the transaction status
    const getStatusColor = (status)=> {
        switch (status) {
            case 'PAYMENT_INITIATED':
                 return 'primary'
            case 'PAYMENT_FAILED':
                return 'error'
            case 'PAYMENT_SUCCESS':
                return 'success'
            case 'PAYMENT_PENDING':
                return 'warning'
            default:
                return 'primary'
        }
    };

    // Method to handle Edit Button Clicked
    const handleEditButtonClicked = (event, transaction)=> {
        const transactionData = transaction
        navigate('/admin/update/merchant/pg/transactions/', {state: {tranaction: transactionData, mode: modeName}})
    };

    // Method to Convert the data into Excel file
    const handleExportClicked = ()=> {

        // Download Production Transaction Data
        if (modeName === 'Production Mode') {
            axiosInstance.get(`/api/v2/admin/merchant/pg/export/transactions/`).then((res)=> {
                // console.log(res)
    
                if (res.status === 200 && res.data.message === 'Transaction fetched successfuly') {
                    updateExportData(res.data.ExportmerchantPGTransaction)
                    exportToExcel();
                };
    
            }).catch((error)=> {
                console.log(error)
            })
        }
        // Download Test mode transaction data
        else if (modeName === 'Test Mode') {
            axiosInstance.get(`/api/v2/admin/merchant/pg/sandbox/export/transactions/`).then((res)=> {
                // console.log(res)
    
                if (res.status === 200 && res.data.message === 'Transaction fetched successfuly') {
                    updateExportData(res.data.ExportmerchantPGSBTransaction)
                    exportToExcel();
                };
    
            }).catch((error)=> {
                console.log(error)
            })
        }
    };

    // Convert to Excel File
    const exportToExcel = async ()=> {
        
        if (exportData) {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('sheet1')

            const headers = Object.keys(exportData[0]);

            worksheet.addRow(headers);

            exportData.forEach((item) => {
                worksheet.addRow(Object.values(item));
              });

            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, 'data.xlsx');

            // console.log('downloaded')
        };
        
        updateExportData([])
    };



    return (
        <Main open={open}>
            <DrawerHeader />

            <Paper elevation={3} sx={{p:1, borderRadius: '20px'}}> 

            <Box 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'start',
                    alignItems: 'center',
                    p:2
                    }}>
                <Input placeholder="Type in here…" />
                <IconButton aria-label="Example">
                    <SearchIcon color='primary' />
                </IconButton>
                <Button sx={{mx:1}} onClick={handleExportClicked}>Export</Button>
            </Box>

            <TableContainer>
            <Box sx={{ height: 450, overflowY: 'auto' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{position:'sticky', zIndex: 1, top: 0, backgroundColor: 'white'}}>
                        <TableRow>
                            <TableCell><b>Sl No.</b></TableCell>
                            <TableCell align="center"><b>Transaction ID</b></TableCell>
                            <TableCell align="left"><b>Merchant</b></TableCell>
                            <TableCell align="left"><b>Amount</b></TableCell>
                            <TableCell align="center"><b>Date</b></TableCell>
                            <TableCell align="center"><b>Status</b></TableCell>
                            <TableCell align="right"><b>Edit</b></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {transactionData.map((transactions, index) => (
                            <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell scope="row">
                                    {transactions?.id}
                                </TableCell>

                                <TableCell scope="row" align='left'>
                                    {transactions?.transaction_id}
                                </TableCell>

                                <TableCell  scope="row" align='left'>
                                    {transactions?.merchant?.merchant_name}
                                </TableCell>

                                <TableCell component="th" scope="row">
                                    {transactions?.amount} {transactions?.currency}
                                </TableCell>

                                <TableCell component="th" scope="row">
                                    {transactions?.createdAt}
                                </TableCell>

                                <TableCell component="th" scope="row">
                                    <Chip label={transactions?.status} variant="outlined" color={getStatusColor(transactions?.status)} />
                                </TableCell>

                                <TableCell component="th" scope="row">
                                    <IconButton aria-label="Example" onClick={(event)=> {handleEditButtonClicked(event, transactions)}}>
                                        <ModeEditSharpIcon color='secondary'/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>

            <Box sx={{display:'flex', justifyContent:'space-between'}}>
                <Pagination count={10} color="primary" sx={{mb:2, mt:2}} />

                <FormControlLabel 
                    control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                    label={modeName}
                    onChange={handleCheckBoxChange}
                    />
            </Box>

            </TableContainer>

            </Paper>
        </Main>
    );
};