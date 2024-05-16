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
      // console.log(error.response)
      if (error.response.data.msg == 'Transaction is completed') {
          setOpenSnackbar(true);
      }
    })
};

// function createData(id, user, date, amount, fees, total, currency, receiver, status) {
//     return {
//       id,
//       user,
//       date,
//       amount,
//       fees,
//       total,
//       currency,
//       receiver,
//       status,
//     };
//   }


// const rows = [
//     createData(1,'Mukesh',     '01-02-2024',   '4,250',  '7',   '+4,250',     'USD',   'manjesh',   'Success'),
//     createData(2, 'Mahesh',    '020-03-2024', '5,000',   '1.01', '-5,007',    'INR',   'Rupesh',    'Success'),
//     createData(3, 'Ranjit',    '05-04-2023',   '12',     '-',   '+13.01',     'CYN',   'Akhilesh',  'Pending'),
//     createData(4, 'Rakesh',    '06-02-2024', '11,900',   '17.8',  '+11,900',   'EUR',  'Manju',     'Cancelled'),
//     createData(5, 'Sandeep',   '01-09-2023', '14,000',   '2',     '-14,017.8', 'INR',  'Johny',     'Pending'),
//     createData(6, 'Sanjay',    '03-08-2023', '0.003294', '2',     '-0.003294', 'USD',  'Lara',      'Success'),
//     createData(7, 'Jibesh',    '02-06-2024',  '500',     '8',     '+502',      'INR',  'Abdul',     'Success'),
//     createData(8, 'John',      '01-02-2023',  '500',     '1.13',  '+502',      'EUR',  'Jeeshan',   'Pending'),
//     createData(9, 'Doe',       '04-12-2023',  '0.003294','-',     '+0.003294', 'USD',  'Ajit',      'Cancelled'),
//     createData(10, 'Rajeep',   '08-09-2023',  '100',     '1.13',  '-108',      'CYN',  'Doval',     'Pending'),
//     createData(11, 'Mithilesh','03-7-2023',   '5',       '1.13',  '+5.05',     'INR',  'Bank',      'Success'),
//     createData(12, 'Suresh',   '01-12-2023',  '5',       '-',     '+5.05',     'USD',  'Bank',      'Success'),
//     createData(13, 'Ramesh',   '09-05-2023',  '10',      '17.8',  '+12.15',    'CYN',  'Bank',      'Pending'),
//   ];


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
                    />
                    
        )}
        </Main>
    </>
  );
};



export default TransferDetails;

