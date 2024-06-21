import MerchantPaymentTable from './merchantPaymentTable';
import {Main, DrawerHeader} from '../Content';
import MerchantPaymentTableColumn from './Column'
import { useEffect, useState } from 'react';
import axiosInstance from '../Authentication/axios'




export default function MerchantPaymentDetails({open}) {

    const TableName = "All Business Payments"
    const headCells = MerchantPaymentTableColumn
    const [businessTransactionData, updateBusinessTransactionData] = useState([]);
    const [loadTable, setLoadTable]  = useState(true);

    // print(businessTransactionData)
    // Fetch all the available Business transaction
    useEffect(() => {
        axiosInstance.get(`api/v4/admin/merchant/payments/`).then((res)=> {
            // console.log(res.data.data)
            const sortedData = res.data.data.sort((a, b) => new Date(b.business_transaction.id) - new Date(a.business_transaction.id));
            updateBusinessTransactionData(sortedData)
            setLoadTable(false)

        }).catch((error)=> {
            console.log(error)

        })
    }, [])

    // console.log(loadTable)

return (
    <>
        <Main open={open}>
        <DrawerHeader />
            <MerchantPaymentTable 
                  headCells={headCells} 
                  rows={businessTransactionData}
                  TableName={TableName} 
                  loadTable={loadTable}
                  />
        </Main>
    </>
  );
}





