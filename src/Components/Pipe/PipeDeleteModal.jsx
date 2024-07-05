import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import axiosInstance from '../Authentication/axios';
import { useState } from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function PipeDeleteModal({open, setOpen, pipe_id}) {

  const [successMessage, setSuccessMessage] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

// Call API to delete the pipe
  const handleDeletePipe = ()=> {
    axiosInstance.delete(`api/v5/admin/pipe/delete/?query=${pipe_id}`).then((res)=> {
        console.log(res)

        if (res.status === 200) {
            setSuccessMessage('Deleted Successfully')

            setTimeout(() => {
                setOpen(false)
            }, 1000);
        }

    }).catch((error)=> {
        console.log(error.response)

    })
  };


  return (
    <React.Fragment>
      
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete Pipe"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
             Are you sure, You want to delete the pipe <br />
             This can delete all its related data
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleDeletePipe}>Agree</Button>
        </DialogActions>

        {successMessage ? <small className='text-success d-flex justify-content-center'>{successMessage}</small> : ''}
      </Dialog>
    </React.Fragment>
  );
}
