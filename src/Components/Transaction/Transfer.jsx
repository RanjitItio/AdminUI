import TransferTable from './TransferTable';
import {Main, DrawerHeader} from '../Content';
import { useState, useEffect } from 'react';
import axiosInstance from '../Authentication/axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';



function TransferDetails({open}) {

  const [transferData, updateTransferData] = useState([]);
  const [error, setError] = useState('');
  const [transferID, updateTransferID] = useState('')
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Transaction Status
  const [status, setStaus] = useState('');

  // console.log(transferData)

  const headCells = [
    {
      id: "sl no",
      numeric: false,
      disablePadding: true,
      label: "Sl No",
    },
    {
      id: "transaction id",
      numeric: false,
      disablePadding: true,
      label: "Transaction ID",
    },
    {
      id: "sender",
      numeric: false,
      disablePadding: false,
      label: "Sender",
    },
    {
        id: "date",
        numeric: false,
        disablePadding: true,
        label: "Date",
      },
    {
      id: "send amount",
      numeric: false,
      disablePadding: false,
      label: "Send Amount",
    },

    {
      id: "fees",
      numeric: false,
      disablePadding: false,
      label: "Fees",
    },

    {
      id: "total amount",
      numeric: false,
      disablePadding: false,
      label: "Total Amount",
    },

    {
      id: "currency",
      numeric: false,
      disablePadding: false,
      label: "Currency",
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


const TableName = "All Transfers"


// Fetch data from API

useEffect(() => {
  axiosInstance.get(`api/v1/transfer/transactions`).then((res)=> {

    if(res.data && res.data.data) {
      updateTransferData(res.data.data)
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

    } else if (error.response.data.msg == 'Transaction error') {
        setError("Unknown Transaction Error please try after sometime")

    } else if (error.response.data.msg == 'Currency not available') {
        setError("Requested currency not available please create new currency")

    } else if (error.response.data.msg == 'User is not available') {
        setError("Requested user is not available")
    } else if (error.response.data.msg == 'Currency error'){
        setError("Unable to get the currency")

    } else if (error.response.data.msg == 'User not found'){
        setError("Unable to get the user details")

    } else if (error.response.data.msg == 'No Transaction available to show'){
        setError("No Transactions")

    };
  })
  }, [])


  
const handleTransactionStatusUpdate = ()=> {
    // value = event.target.value;

    axiosInstance.put(`api/v4/transactions/`, {
      status: status,
      transaction_id: transferID 

    }).then((res)=> {
      // console.log(res)

    }).catch((error)=> {
      console.log(error.response)
      if (error.response.data.msg == 'Transaction is completed') {
          setOpenSnackbar(true);
      }
    })
};



return (
    <>
        <Main open={open}>
        <DrawerHeader />

        {error ? (
          <Stack sx={{ width: '100%' }}>
            <Alert severity="warning">{error}</Alert>
          </Stack>

        ) : (
            <TransferTable 
                headCells={headCells} 
                rows={transferData} 
                TableName={TableName}
                updateTransferID={updateTransferID}
                handleTransactionStatusUpdate={handleTransactionStatusUpdate}
                status={status} 
                setStaus={setStaus}
                updateTransferData={updateTransferData}
          />
        )}
        </Main>
    </>
  );
};



export default TransferDetails;

