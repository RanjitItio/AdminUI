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

    if(res.data && res.data.all_Kyc) {

        updateKycData(res.data.all_Kyc)
        // console.log(res.data.all_Kyc)
    }
    
  }).catch((error)=> {
    console.log(error.response)

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
  }, [])




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
          updateKycData={updateKycData}
          updateKycID={updateKycID}
          />
       )}
    </Main>
    </>
  );
}

export default UsersData;
