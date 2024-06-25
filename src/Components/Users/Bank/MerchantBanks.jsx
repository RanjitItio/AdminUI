// import MerchantBankTable from './MerchantBankTable';
// import {Main, DrawerHeader} from '../../Content';
// import { useEffect, useState } from "react";
// import axiosInstance from '../../Authentication/axios';
// import Alert from '@mui/material/Alert';
// import Stack from '@mui/material/Stack';
// import MerchantBankColumn from "./Column";





// function MerchantBankAccounts({open}) {

//   const headCells = MerchantBankColumn;
//   const [error, setError] = useState('');

//   const TableName = "Merchant Bank Accounts"



// // useEffect(() => {
// //    axiosInstance.get(`api/v1/user/kyc/`).then((res)=> {
// //     // console.log(res.data.all_Kyc)

// //     if(res.data && res.data.all_Kyc) {
// //         // const sortedData = res.data.all_Kyc.reverse()
// //         updateKycData(res.data.all_Kyc)
// //         // console.log(res.data.all_Kyc)
// //     }
    
// //   }).catch((error)=> {
// //     console.log(error.response)

// //     if (error.response.data.msg == 'Only admin can view all the KYC'){
// //         setError("Only admin can view the Users kyc")

// //     } else if (error.response.data.msg == 'Unable to get Admin detail'){
// //         setError("Admin details not found")

// //     } else if (error.response.data.msg == 'Unknown Error occure during kyc process'){
// //         setError("Unknown error during in KYC")

// //     } else if (error.response.data.msg == 'User not available'){
// //         setError("No users available to show")

// //     } else if (error.response.data.msg == 'User not found'){
// //         setError("Error")

// //     } else if (error.response.data.msg == 'No Kyc available'){
// //         setError("No kyc available to show")

// //     } else if (error.response.data.msg == 'Server error'){
// //         setError("Unknow error occured")
// //     };

// //   })
// //   }, [])


// const rows = []


// return (
//     <>
//     <Main open={open}>
//     <DrawerHeader />

//     {error ? 
//       <Stack sx={{ width: '100%' }}>
//         <Alert severity="warning">{error}</Alert>
//       </Stack>
//        : (
//           <MerchantBankTable 
//           headCells={headCells} 
//           rows={rows} 
//           TableName={TableName}
//           />
//        )}
//     </Main>
//     </>
//   );
// }


// export default MerchantBankAccounts;
