import { Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Paper, Box } from '@mui/material';
import { Main, DrawerHeader } from '../../Components/Content';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Pagination from '@mui/material/Pagination';
import { Button as BaseButton, buttonClasses } from '@mui/base/Button';
import { styled } from '@mui/system';
import Input from '@mui/joy/Input';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import axiosInstance from '../../Components/Authentication/axios';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import MenuButton from '@mui/joy/MenuButton';
import { useNavigate } from 'react-router-dom';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';



const IS_DEVELOPMENT = import.meta.env.VITE_IS_DEVELOPMENT;
const PG_DOMAIN      = import.meta.env.PG_DOMAIN_NAME;
let redirectUrl = '';


if (IS_DEVELOPMENT === 'True') {
    redirectUrl = 'http://localhost:5173'
 } else {
    redirectUrl = PG_DOMAIN
 };



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




// View all available merchant by Admin
export default function AllMerchantTable({open}) {
    const navigate = useNavigate();
    const [error, setError]                  = useState('');
    const [kycData, updateKycData]           = useState([]);  // All merchant kyc
    const [userData, updateUserData]         = useState([]);  // All merchant data
    const [totalRows, updateTotalRows]       = useState(0);    // paginated rows
    const [deleteOpen, setDeleteOpen]        = useState(false);  // Delete popup state
    const [accessToken, setAccessToken]      = useState(null);   // Access Token
    const [loginError, setLoginError]        = useState('');
    const [refreshToken, setRefreshToken]    = useState(null);  // Refresh Token 
    const [searchQuery, updateSearchQuery]   = useState('');  // Search Query state
    const [isMerchant, setIsMerchant]             = useState('') // To redirect to merchant page
    const [deleteUserID, updateDeleteUserID]      = useState(0)  // Delete user ID
    const [merchantFullName, setMerchantFullName] = useState(''); // To redirect to merchant page
    const [exportMerchantData, updateExportMerchantData] = useState([]); // Merchant Excel Data
    const [exportKycData, updateExportKycData] = useState([]); // Kyc Excel Data

    const counPagination = Math.floor(totalRows);   // Total pagination count
    

    // Fetch all the merchant Available merchants
    useEffect(() => {
      axiosInstance.get(`api/v1/user/kyc/`).then((res)=> {
        // console.log(res.data)
        if (res.status === 200 && res.data.all_Kyc) {
            updateKycData(res.data.all_Kyc)
            updateUserData(res.data.all_users)
            updateTotalRows(res.data.total_row_count)
        };

      }).catch((error)=> {
        // console.log(error)

        if (error.response.data.msg == 'Only admin can view all the KYC'){
            setError("Only admin can view the Users kyc")
    
        } else if (error.response.data.msg == 'Unable to get Admin detail'){
            setError("Admin details not found")
    
        } else if (error.response.data.msg == 'Unknown Error occure during kyc process'){
            setError("Unknown error during in KYC")
    
        } else if (error.response.data.msg == 'User not available'){
            setError("No users available to show")
    
        } else if (error.response.data.msg == 'User not found'){
            setError("Error")
    
        } else if (error.response.data.msg == 'No Kyc available'){
            setError("No kyc available to show")
    
        } else if (error.response.data.msg == 'Server error'){
            setError("Unknow error occured")
        } else {
            setError('')
        }
      })
    }, []);



    // Change status color according to the transaction status
    function getStatusColor(status) {
        switch(status) {
          case 'Active':
            return 'success';
          case 'Inactive':
            return 'danger';
          case 'Pending':
            return 'warning';
        }
      };


    // Search Merchant users
    const handleSearch = ()=> {
        axiosInstance.get(`api/v1/admin/user/search/?query=${searchQuery}`).then((res)=> {
            // console.log(res)
            if (res.status === 200) {
                updateKycData(res.data.all_Kyc)
                updateUserData(res.data.all_users)
            };

        }).catch((error)=> {
            console.log(error)
        })
    };


    // Input Search values
    const handleSearchInputChange = (e)=> {
        updateSearchQuery(e.target.value);
    };

 
    // Get the paginated data
    const handlePaginatedData = (e, value)=> {
        let limit = 20;
        let offset = (value - 1) * limit;

        axiosInstance.get(`api/v1/user/kyc/?limit=${limit}&offset=${offset}`).then((res)=> {
            // console.log(res);

            if (res.status === 200) {
                updateKycData(res.data.all_Kyc)
                updateUserData(res.data.all_users)
            };

        }).catch((error)=> {
            console.log(error);

        })
    };

    // Update user details
    const handleActionClicked = (text, user) => {

        let kycDetail =  kycData.find((kyc)=> kyc.user_id === user.user_id);

        if (text === 'Edit') {
            navigate('/admin/users/details/', {state: {kycID: kycDetail || null, userID: user}})

        } else if (text === 'Delete') {
            updateDeleteUserID(user.user_id);
            setDeleteOpen(true);   

        } else if (text === 'Login') {
            // Call api for token
            axiosInstance.get(`/api/v6/admin/merchant/login/${user.user_id}`).then((res)=> {
                // console.log(res)

                if (res.status === 200 && res.data.success === true) {
                    setAccessToken(res.data.access)
                    setRefreshToken(res.data.refresh)
                    setMerchantFullName(res.data.user_name)
                    setIsMerchant(res.data.is_merchant)
                };
            }).catch((error)=> {
                
                if (error.response.data.message === 'Inactiv user') {
                    setLoginError('User is not active');

                    setTimeout(() => {
                        setLoginError('')
                    }, 2000);
                }
            })
        }
    };


    // Redirect to merchat home page
    useEffect(() => {
        if (accessToken && refreshToken) {
            window.location.replace(`${redirectUrl}/admin/merchant/login/?access=${accessToken}&refresh=${refreshToken}&name=${merchantFullName}&ismerchant=${isMerchant}`);
        };
    }, [accessToken, refreshToken])


    // Export merchant data to Excel
    const exportMerchantToExcel = async ()=> {
        if (exportMerchantData && exportMerchantData.length > 0) {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('sheet1')

            const headers = Object.keys(exportMerchantData[0])

            worksheet.addRow(headers)

            exportMerchantData.forEach((item)=> {
                worksheet.addRow(Object.values(item))
            })

            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, 'merchant.xlsx');
        } else {
            console.log('No Data available to Download')
        }
    };

    // Export merchant kyc to excel
    const exportKycToExcel = async ()=> {
        if (exportKycData && exportKycData.length > 0) {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('sheet1')

            const headers = Object.keys(exportKycData[0])

            worksheet.addRow(headers)

            exportKycData.forEach((item)=> {
                worksheet.addRow(Object.values(item))
            })

            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, 'kyc.xlsx');
        } else {
            console.log('No Data available to Download')
        }
    };

    
    // Download all withdrawal requests
    const handleDownloadMerchantData = ()=> {
        axiosInstance.get(`/api/v1/admin/export/merchants/`).then((res)=> {
            // console.log(res)
    
            if (res.status === 200 && res.data.success === true) {
                updateExportMerchantData(res.data.all_users);
                updateExportKycData(res.data.all_Kyc)
                
                setTimeout(() => {
                    exportMerchantToExcel();
                    exportKycToExcel();
                }, 1000);
            };
    
          }).catch((error)=> {
            console.log(error)
          })
    };



    return (
        <>
        <Main open={open}>
            <DrawerHeader />

            <p style={{color:'red'}}>{loginError && loginError}</p>
            <Paper elevation={3} sx={{p:1, borderRadius: '20px'}}>
            <Box 
            sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                p:2,
                flexWrap: 'wrap'
            }}>

            <h5><b>All Merchant Users</b></h5>
            <Box 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'end',
                    alignItems: 'center',
                    p:2
                    }}>
                <Input placeholder="Type in here…" onChange={handleSearchInputChange} />
                <IconButton aria-label="Example" onClick={handleSearch}>
                    <SearchIcon color='primary' />
                </IconButton>

                <Button sx={{mx:1}} onClick={()=> {handleDownloadMerchantData();}}>Export</Button>
            </Box>
            </Box>

            <TableContainer>
            <Box sx={{ maxHeight: '95rem', overflowY: 'auto' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{position:'sticky', zIndex: 1, top: 0, backgroundColor: '#e2f4fb'}}>
                        <TableRow>
                            <TableCell><b>Sl No.</b></TableCell>
                            <TableCell align="center"><b>First Name</b></TableCell>
                            <TableCell align="left"><b>Last Name</b></TableCell>
                            <TableCell align="left"><b>Phone</b></TableCell>
                            <TableCell align="center"><b>Email</b></TableCell>
                            <TableCell align="center"><b>Group</b></TableCell>
                            <TableCell align="center"><b>Last Login</b></TableCell>
                            <TableCell align="center"><b>IP</b></TableCell>
                            <TableCell align="center"><b>Status</b></TableCell>
                            <TableCell align="right"><b>Action</b></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {userData.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                {/* ID Column */}
                               <TableCell component="th" scope="row">
                                    <b>{row?.user_id || 0}</b>
                                </TableCell>

                                {/* First Name Column */}
                                <TableCell align="left" style={{fontFamily: 'Platypi', fontSize: '15px'}}>
                                    <b>{row?.firstname || 'NA'}</b>
                                </TableCell>

                                {/* Last Name Column */}
                                <TableCell align="left" style={{fontFamily: 'Platypi', fontSize: '15px'}}>
                                    <b>{row?.lastname || 'NA'}</b>
                                </TableCell>

                                {/* Phone Number Column */}
                                <TableCell align="left" style={{fontFamily: 'sedan', fontSize: '15px'}}>
                                    <b>{row?.phoneno || 'NA'}</b>
                                </TableCell>

                                {/* Email Column */}
                                <TableCell align="left" style={{fontFamily: 'sedan', fontSize: '15px'}}>
                                    <b>{row?.email || 'NA'}</b>
                                </TableCell>

                                {/* Group Column */}
                                <TableCell align="left" style={{fontFamily: 'sedan', fontSize: '15px'}}>
                                <b>{
                                    row?.group_name || 'NA'
                                    }
                                </b>
                                </TableCell>

                                {/* Last Login Column */}
                                <TableCell align="left" style={{fontFamily: 'sedan', fontSize: '15px'}}>
                                    <b>{row.lastlogin ? new Date(row.lastlogin).toLocaleTimeString() : '0:00:00'}</b>
                                </TableCell>

                                {/* IP Address Column */}
                                <TableCell align="left" style={{fontFamily: 'sedan', fontSize: '15px'}}>
                                    <b>{row?.ip_address || '0.0.0.0'}</b>
                                </TableCell>

                                {/* Status Column */}
                                <TableCell align="left">
                                    <button type="button" className={`btn btn-outline-${getStatusColor(row.active ? 'Active' : "Inactive")} my-2`}>
                                        <b>{row.active ? 'Active' : 'Inactive'}</b>
                                    </button>
                                </TableCell>

                                {/* Action Column */}
                                <TableCell component="th" scope="row">
                                    <Dropdown>
                                        <MenuButton aria-label="Example">
                                            <FontAwesomeIcon icon={faEllipsisV} />
                                        </MenuButton>
                                        <Menu>
                                            <MenuItem onClick={() => handleActionClicked('Edit', row)}>Edit</MenuItem>
                                            <MenuItem onClick={() => handleActionClicked('Login', row)}>Login</MenuItem>
                                            {/* <MenuItem variant="soft" color="danger" onClick={() => handleActionClicked('Delete', row)}>
                                                Delete
                                            </MenuItem> */}
                                        </Menu>
                                    </Dropdown>
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

        {/* <UserDelete deleteUserID={deleteUserID} open={deleteOpen} handleClose={handleCloseDeletePopUp}/> */}
        </>
    );
};