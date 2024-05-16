import DataTable from "../DataTable";
import {Main, DrawerHeader} from '../Content';
import { useEffect, useState } from "react";
import axiosInstance from "../Authentication/axios";





function UsersData({open}) {

  const [kycData, updateKycData] = useState([]);
  const [kycID, updateKycID] = useState('')

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
      setTimeout(() => {
        updateKycData(res.data.all_Kyc)
      }, 1000); 
    }
    
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

    } else if (error.response.data.msg == 'Only admin can view all the KYC'){
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


  const handleKYCStatusUpdate = ()=> {
    // value = event.target.value;

    axiosInstance.put(`api/v1/user/kyc/`, {
      status: status,
      kyc_id: kycID 

    }).then((res)=> {
      console.log(res)

    }).catch((error)=> {
      console.log(error.response)
      if (error.response.data.msg == 'Transaction is completed') {
          // setOpenSnackbar(true);
      }
    })
};



return (
    <>
    <Main open={open}>

    <DrawerHeader />
       <DataTable 
          headCells={headCells} 
          rows={kycData} 
          TableName={TableName}
          status={status} 
          setStaus={setStaus}
          updateKycID={updateKycID}
          handleKYCStatusUpdate={handleKYCStatusUpdate}
          />
    </Main>
    </>
  );
}

export default UsersData;
