import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import axiosInstance from '../../Components/Authentication/axios';



export default function UserDelete({open, handleClose, setStaus, status, deleteUserID}) {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [successMessage, setSuccessMessage] = React.useState('');

  const handleDeleteuser = () => {
      axiosInstance.post(`api/v1/admin/del/user/`, {
        user_id: deleteUserID

      }).then((res)=> {
          if (res.status === 200) {
            setSuccessMessage("User Deleted Successfully")

            // Close the Dialoge box
            setTimeout(() => {
              handleClose();
            }, 2000);
          }

      }).catch((error)=> {
        console.log(error.response)
      })
  };


  return (
    <React.Fragment>
      
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Delete User"}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText> */}

          <Box sx={{ minWidth: 120, color: 'warning.main' }}>
            <p>Are you sure, You want to delete the user.</p>
            <p>Everything related to the user Wallet, Transactions, KYC details will be deleted</p>
            
            </Box>

          {/* </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}  >
            Cancel
          </Button>
          <Button onClick={()=> {handleDeleteuser()}} autoFocus sx={{color: 'error.main'}}>
            Confirm
          </Button>
        </DialogActions>
          {successMessage && <p className='text-success d-flex justify-content-center'>{successMessage}</p> }
      </Dialog>
    </React.Fragment>
  );
}
