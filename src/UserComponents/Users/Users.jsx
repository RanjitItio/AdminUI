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
import UserDelete from './UserDelete';



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





export default function UsersTable({open}) {
    const navigate = useNavigate();
    const [kycData, updateKycData]           = useState([]);  // All kyc data state
    const [deleteUserID, updateDeleteUserID] = useState(0)  // Delete user ID
    const [deleteOpen, setDeleteOpen]        = useState(false);  // Delete popup state


    // Fetch all the available Kyc of None Merchant users
    useEffect(() => {
        axiosInstance.get(`/api/v2/kyc/user/`).then((res)=> {
    
        if(res.status === 200 && res.data.allKyc) {
            updateKycData(res.data.allKyc)
        };
        
    }).catch((error)=> {
        console.log(error)
    
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
        };
    
    })
    }, []);

    
    // Update user details
    const handleActionClicked = (text, kyc, user, userID) => {

        if (text === 'Edit') {
            navigate('/admin/users/details/', {state: {kycID: kyc, userID: user}})
        } else if (text === 'Delete') {
            updateDeleteUserID(userID);
            setDeleteOpen(true);    // Open delete popup
        };
        
    };

    // Close the delete popup
    const handleCloseDeletePopUp = ()=> {
        setDeleteOpen(false);
    };

    // Change user status color
    const getStatusColor = (status)=> {
        switch (status) {
            case 'Active':
                 return 'success'
            case 'Inactive':
                return 'error'
            default:
                return 'primary'
        }
    };


    return (
        <>
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
                <Button sx={{mx:1}} >Export</Button>
            </Box>

            <TableContainer>
            <Box sx={{ height: 450, overflowY: 'auto' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{position:'sticky', zIndex: 1, top: 0, backgroundColor: 'white'}}>
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
                        {kycData.map((kyc, index) => (
                            <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell scope="row">
                                    {kyc.user_kyc_details?.id}
                                </TableCell>

                                <TableCell scope="row" align='left'>
                                    {kyc.user_kyc_details?.firstname}
                                </TableCell>

                                <TableCell  scope="row" align='left'>
                                    {kyc.user_kyc_details?.lastname}
                                </TableCell>

                                <TableCell component="th" scope="row">
                                    {kyc.user_kyc_details?.phoneno}
                                </TableCell>

                                <TableCell component="th" scope="row" align='center'>
                                    {kyc.user_kyc_details?.email}
                                </TableCell>

                                <TableCell component="th" scope="row">
                                    {kyc.user?.group_name}
                                </TableCell>

                                <TableCell component="th" scope="row">
                                    {kyc.user.lastlogin ? new Date(kyc.user.lastlogin).toLocaleDateString() : '0:00:00'} &nbsp;
                                    {kyc.user.lastlogin ? new Date(kyc.user.lastlogin).toLocaleTimeString() : '0:00:00'}
                                </TableCell>

                                <TableCell component="th" scope="row">
                                    {kyc.user?.ip_address}
                                </TableCell>

                                <TableCell component="th" scope="row">
                                    <Chip label={kyc.user.verified ? 'Active' : 'Inactive'} variant="outlined" color={getStatusColor(kyc.user.verified ? 'Active' : 'Inactive')} />
                                </TableCell>

                                <TableCell component="th" scope="row">
                                    <Dropdown>
                                        <MenuButton aria-label="Example">
                                            <FontAwesomeIcon icon={faEllipsisV} />
                                        </MenuButton>
                                        <Menu>
                                            <MenuItem onClick={() => handleActionClicked('Edit', kyc.user_kyc_details, kyc.user)}>Edit</MenuItem>
                                            <MenuItem onClick={() => handleActionClicked('Login')}>Login</MenuItem>
                                            <MenuItem variant="soft" color="danger" onClick={() => handleActionClicked('Delete', kyc.user_kyc_details, kyc.user, kyc.user_kyc_details.user_id)}>
                                                Delete
                                            </MenuItem>
                                        </Menu>
                                    </Dropdown>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>

            <Box sx={{display:'flex', justifyContent:'space-between'}}>
                <Pagination count={10} color="primary" sx={{mb:2, mt:2}} />
            </Box>

            </TableContainer>

            </Paper>
        </Main>

        <UserDelete deleteUserID={deleteUserID} open={deleteOpen} handleClose={handleCloseDeletePopUp}/>
        </>
    );
};

