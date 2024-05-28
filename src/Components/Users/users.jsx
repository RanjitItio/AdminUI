import DataTable from "../DataTable";
import {Main, DrawerHeader} from '../Content';
import { useEffect, useState } from "react";
import axiosInstance from "../Authentication/axios";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';





function UsersData({open}) {

  const [kycData, updateKycData] = useState([]);
  const [kycID, updateKycID] = useState('');
  const [error, setError] = useState('');

  // Transaction Status
  const [status, setStaus] = useState('');

  const headCells = [
    {
      id: "id",
      numeric: true,
      disablePadding: true,
      label: "ID",
    },
    {
      id: "first_name",
      numeric: false,
      disablePadding: true,
      label: "First Name",
    },
    {
      id: "last_name",
      numeric: false,
      disablePadding: false,
      label: "Last Name",
    },

    {
      id: "phone",
      numeric: false,
      disablePadding: false,
      label: "Phone",
    },
    {
      id: "email",
      numeric: false,
      disablePadding: false,
      label: "Email",
    },

    {
      id: "group",
      numeric: false,
      disablePadding: false,
      label: "Group",
    },

    {
      id: "last_login",
      numeric: false,
      disablePadding: false,
      label: "Last Login",
    },

    {
      id: "ip",
      numeric: false,
      disablePadding: false,
      label: "IP",
    },

    {
      id: "status",
      numeric: false,
      disablePadding: false,
      label: "Status",
    },
    {
      id: "action",
      numeric: true,
      disablePadding: false,
      label: "Action",
    },
  ];



const TableName = "Users KYC Detail"



useEffect(() => {
   axiosInstance.get(`api/v1/user/kyc/`).then((res)=> {
    // console.log(res.data.all_Kyc)

    if(res.data && res.data.all_Kyc) {
        const sortedData = res.data.all_Kyc.reverse()
        updateKycData(sortedData)
    }
    
  }).catch((error)=> {
    // console.log(error.response)

    if (error.response.data.msg == 'Authentication Failed Please provide auth token') {
        setError("Authentication Failed")

    } else if (error.response.data.msg == 'Token has expired') {
        setError("Session Expired please try to login")
        
    } else if (error.response.data.msg == 'Invalid token'){
      setError("Invalid session please try to login")

    } else if(error.response.data.msg == 'Authentication Failed please login') {
      setError("Authentication Failed")

    } else if (error.response.data.msg == 'Only admin can view all the KYC'){
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
  }, [])



// const handleKYCStatusUpdate = ()=> {
//     // value = event.target.value;

//     axiosInstance.put(`api/v1/user/kyc/`, {
//       status: status,
//       kyc_id: kycID 

//     }).then((res)=> {
//       console.log(res)

//     }).catch((error)=> {
//       console.log(error.response)

//     if (error.response.data.msg == 'Authentication Failed Please provide auth token') {
//         setError("Authentication Failed")

//     } else if (error.response.data.msg == 'Token has expired') {
//         setError("Session Expired please try to login")
        
//     } else if (error.response.data.msg == 'Invalid token'){
//       setError("Invalid session please try to login")

//     } else if (error.response.data.msg == 'Only Admin can update the Kyc'){
//       setError("Only admin can view the Users kyc")

//     } else if (error.response.data.msg == 'Authentication Failed'){
//         setError("Authentication Failed")

//     } else if (error.response.data.msg == 'Unable to get Admin detail'){
//         setError("Admin details not found")

//     } else if (error.response.data.msg == 'Unable to locate kyc'){
//         setError("Unknowc kyc error")

//     } else if (error.response.data.msg == 'Error while fetching user detail'){
//         setError("Unknow user detail error")

//     } else if (error.response.data.msg == 'Error while updating KYC details'){
//         setError("Unknow kyc update error")

//     } else if (error.response.data.msg == 'Kyc not found'){
//         setError("Kyc detail not found")

//     } else if (error.response.data.msg == 'Error while updating the user'){
//         setError("Unknown user error")

//     } else if (error.response.data.msg == 'Server error'){
//         setError("Server error")
        
//     } else {
//       setError("")
//     }

//     })
// };



return (
    <>
    <Main open={open}>
    <DrawerHeader />

    {error ? 
      <Stack sx={{ width: '100%' }}>
        <Alert severity="warning">{error}</Alert>
      </Stack>
       : (
          <DataTable 
          headCells={headCells} 
          rows={kycData} 
          TableName={TableName}
          status={status} 
          setStaus={setStaus}
          updateKycID={updateKycID}
          />
       )}
    </Main>
    </>
  );
}

export default UsersData;
