import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



export default function CryptoReceivedTableEditModal({open, handleClose, handleTransactionStatusUpdate, setStaus, status}) {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  // const [status, setStaus] = React.useState('');

  const handleStatusChange = (event) => {
    setStaus(event.target.value);
  };


  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open responsive dialog
      </Button> */}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Change Transaction Status"}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText> */}

          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="transaction-status-select">Status</InputLabel>
                <Select
                labelId="transaction-status-select"
                id="transaction-status-select"
                value={status}
                label="Status"
                onChange={handleStatusChange}
                >
                <MenuItem value={'Success'}>Success</MenuItem>
                <MenuItem value={'Pending'}>Pending</MenuItem>
                <MenuItem value={'Cancel'}>Cancel</MenuItem>
                </Select>
            </FormControl>
            </Box>

          {/* </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} >
            Cancel
          </Button>
          <Button onClick={()=> {handleClose(); handleTransactionStatusUpdate();}} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
