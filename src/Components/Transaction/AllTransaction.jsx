import AllTransactionTable from './AllTransactionTable';
import {Main, DrawerHeader} from '../Content';
import { useState, useEffect } from 'react';
import axiosInstance from '../Authentication/axios';
import Stack from '@mui/material/Stack';
import { Alert } from '@mui/material';




function AllTransactionData({open}) {

  const [allTransactionData, updateAllTransactionData] = useState([]);
  const [error, setError] = useState('');
  const [allTrsactionID, updateAllTransactionID] = useState()
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [status, setStatus] = useState('');


// setStatus
  const setStaus = (status) => {
    setStatus(status);
    setOpenSnackbar(true);
    setTimeout(() => {
      setOpenSnackbar(false);
    }, 1000)};

  // handleTransactionStatusUpdate
  const handleTransactionStatusUpdate = (id, status) => {
    // console.log(allTrsactionID, status);
    setStatus(status);
    updateAllTransactionID(allTrsactionID);
    setOpenSnackbar(true);
  };

  const headCells = [
    {
      id: "sl No",
      numeric: false,
      disablePadding: true,
      label: "Sl No",
    },
    {
      id: "No",
      numeric: false,
      disablePadding: true,
      label: "Transaction No",
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
      id: "type",
      numeric: false,
      disablePadding: false,
      label: "Type",
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
      id: "receiver",
      numeric: false,
      disablePadding: false,
      label: "Receiver",
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


  
useEffect(() => {
  axiosInstance.get(`api/v4/transactions/`).then((res)=> {

    // console.log(allTransactionData)
    if(res.data && res.data.data) {
      // const SortedData = res.data.data.reverse()
      updateAllTransactionData(res.data.data)
      // console.log('Data',SortedData)
    }
    
    // console.log(res.data.data)
  }).catch((error)=> {
    // console.log(error.response)

    if (error.response.data.msg == 'Authentication Failed Please provide auth token') {
        setError("Authentication Failed")

    } else if (error.response.data.msg == 'Token has expired') {
        setError("Session Expired please try to login")
        
    } else if (error.response.data.msg == 'Invalid token') {
        setError("Invalid Session please try to login")
        
    } else if (error.response.data.msg == 'Authentication Failed') {
        setError("Authentication Error")
        
    } else if (error.response.data.msg == 'Only admin can view the Transactions') {
        setError("Only admin can view the Transactions")
        
    } else if (error.response.data.msg == 'Unable to get Admin detail') {
        setError("Unable to fetch admin data")
        
    } else if (error.response.data.msg == 'Transaction is not available') {
        setError("No Available Transactions")
        
    } else if (error.response.data.msg == 'Transaction error') {
        setError("Unknown Transaction error occure please try after sometime")
        
    } else if (error.response.data.msg == 'Requested Currency not found') {
        setError("Currency not found please add a new currency")
        
    } else if (error.response.data.msg == 'Currency error') {
        setError("Unknown currency error please try after sometime")
        
    } else if (error.response.data.msg == 'User not available') {
        setError("User details not found")
        
    } else if (error.response.data.msg == 'User not found') {
        setError("Unknown error occured in user section please try after sometime")
        
    } else if (error.response.data.msg == 'No transactions available to show') {
        setError("No Available Transactions")

    } else if (error.response.data.msg == 'Server error') {
        setError("Server Error")

    } 
    
  })
  }, [])

const TableName = "Transaction Detail"




  return (
    <>
    <Main open={open}>
    <DrawerHeader />
    {error ? (
          <Stack sx={{ width: '100%' }}>
            <Alert severity="warning">{error}</Alert>
          </Stack>
        ) : (
          <AllTransactionTable 
                 headCells={headCells} 
                 rows={allTransactionData} 
                 TableName={TableName} 
                 updateTransactionID={updateAllTransactionID}
                 handleTransactionStatusUpdate={handleTransactionStatusUpdate}
                 setStaus={setStaus}
                 status={status}
                 updateAllTransactionData={updateAllTransactionData}
                 />
        )}
    </Main>
    </>
  );
}

export default AllTransactionData;
