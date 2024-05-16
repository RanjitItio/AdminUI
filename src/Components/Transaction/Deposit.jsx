import DepositTable from './DepositTable';
import {Main, DrawerHeader} from '../Content';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../Authentication/axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';



function AllDepositDetail({open}) {

  const [transactionData, updateTransactionData] = useState([]);
  const [error, setError] = useState('');
  const [trsactionID, updateTransactionID] = useState('')
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  // Transaction Status
  const [status, setStaus] = React.useState('');


  const headCells = [
    {
      id: "id",
      numeric: false,
      disablePadding: true,
      label: "ID",
    },
    {
      id: "user",
      numeric: false,
      disablePadding: false,
      label: "User",
    },
    {
        id: "date",
        numeric: false,
        disablePadding: true,
        label: "Date",
      },
    {
      id: "amount",
      numeric: false,
      disablePadding: false,
      label: "Amount",
    },

    {
      id: "fees",
      numeric: false,
      disablePadding: false,
      label: "Fees",
    },

    {
      id: "total",
      numeric: false,
      disablePadding: false,
      label: "Total",
    },

    {
      id: "currency",
      numeric: false,
      disablePadding: false,
      label: "Currency",
    },
    {
      id: "payment_method",
      numeric: false,
      disablePadding: false,
      label: "Payment Method",
    },
    {
      id: "status",
      numeric: false,
      disablePadding: false,
      label: "Status",
    },
    {
      id: "action",
      numeric: false,
      disablePadding: false,
      label: "Action",
    },

  ];

const TableName = "All Deposits"


useEffect(() => {
  axiosInstance.get(`api/v1/deposits/`).then((res)=> {

    if(res.data && res.data.data) {
      updateTransactionData(res.data.data)
      // console.log(transactionData)
    }
    
    // console.log(res.data.data)
  }).catch((error)=> {
    // console.log(error.response)

    if (error.response.data.msg == 'Authentication Failed Please provide auth token') {
        setError("Authentication Failed")

    } else if (error.response.data.msg == 'Token has expired') {
        setError("Session Expired please try to login")
        
    } else if (error.response.data.msg == 'Invalid token'){
      setError("Invalid session please try to login")

    } else if(error.response.data.msg == 'Authentication Failed') {
      setError("Authentication Failed")

    } else if (error.response.data.msg == 'Only admin can view the Transactions'){
        setError("Only admin can view the Transactions")

    } else if (error.response.data.msg == 'Unable to get Admin detail'){
        setError("Admin details not found")

    } else if (error.response.data.msg == 'Currency error'){
        setError("Unable to get the currency")

    } else if (error.response.data.msg == 'User not found'){
        setError("Unable to get the user details")

    } else if (error.response.data.msg == 'No Transaction available to show'){
        setError("No Transaction is available to show")

    };

    
  })
  }, [])


  const handleTransactionStatusUpdate = ()=> {
      // value = event.target.value;

      axiosInstance.put(`api/v4/transactions/`, {
        status: status,
        transaction_id: trsactionID 

      }).then((res)=> {
        // console.log(res)

      }).catch((error)=> {
        // console.log(error.response)
        if (error.response.data.msg == 'Transaction is completed') {
            setOpenSnackbar(true);
        }
      })
  };


  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const action = (
    <React.Fragment>
      {/* <Button color="secondary" size="small" onClick={handleSnackBarClose}>
        UNDO
      </Button> */}
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackBarClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );




  return (
    <>
        <Main open={open}>
        <DrawerHeader />

        {error ? (
          <Stack sx={{ width: '100%' }}>
            <Alert severity="warning">{error}</Alert>
          </Stack>
        ) : (
          <>
          <DepositTable headCells={headCells} 
                        rows={transactionData} 
                        TableName={TableName} 
                        updateTransactionID={updateTransactionID} 
                        handleTransactionStatusUpdate={handleTransactionStatusUpdate} 
                        status={status} 
                        setStaus={setStaus} 
                      />

          <div>
            {/* <Button onClick={handleClick}>Open Snackbar</Button> */}
            <Snackbar
              open={openSnackbar}
              autoHideDuration={6000}
              onClose={handleSnackBarClose}
              message="Transaction already completed"
              action={action}
            />
          </div>
          </>
        )}
            
        </Main>
    </>
  );
}


export default AllDepositDetail;

