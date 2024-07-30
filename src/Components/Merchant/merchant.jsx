import MerchantTable from './merchantTable';
import {Main, DrawerHeader} from '../Content';
import { merchantTableColumnNames } from './ColumName';
import { useState, useEffect } from 'react';
import axiosInstance from '../Authentication/axios';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';



function MerchantDetails({open}) {

    const [merchantData, updateMerchantData] = useState([]);
    const [loader, setLoader]                = useState(true);
    const [offSet, setOffset]                = useState(0);
    const [rerender, setRerender]            = useState(false);

    const headCells = merchantTableColumnNames;

    const TableName = "Merchant Detail"

    // console.log(offSet)
    // console.log(merchantData)

    const fetchMerchantData = ()=> {
    
        axiosInstance.get(`api/admin/all/merchant/?limit=25&offset=${offSet}`).then((res)=> {
            // console.log(res.data.data)
            if (res.data.data) {
                updateMerchantData(res.data.data)
                setLoader(false) 
            
            }

        }).catch((error)=> {
            console.log(error.response)

        })
    };

    // Call API to fetch the Merchants when the page loads
    useEffect(() => {
        fetchMerchantData();
    }, [])


   if (loader) {
    return (
        <Main open={open}>
        <DrawerHeader />
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20%'}}>
                <CircularProgress />
            </Box>
        </Main>
    )
};

if (merchantData.length === 0) {
    return (
        <Main open={open}>
        <DrawerHeader />
           <h2 className='d-flex justify-content-center my-5'>Nothing to show</h2>
        </Main>
    )
}


  return (
    <>
    <Main open={open}>
    <DrawerHeader />
      <MerchantTable 
           headCells={headCells} 
           rows={merchantData} 
           TableName={TableName} 
           updateMerchantData={updateMerchantData}
           setOffset={setOffset}
        //    fetchMerchantData={fetchMerchantData}
           rerender={rerender}
           setRerender={setRerender}
           />
    </Main>
    </>
  );
}

export default MerchantDetails;
