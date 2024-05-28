import RevenuesTable from './RevenuesTable';
import {Main, DrawerHeader} from '../Content';




function Revenues({open}) {

  const headCells = [
   

    {
        id: "date",
        numeric: false,
        disablePadding: true,
        label: "Date",
      },
    {
      id: "transaction_type",
      numeric: false,
      disablePadding: false,
      label: "Transaction Type",
    },

    {
      id: "percentage_charge",
      numeric: false,
      disablePadding: false,
      label: "Percentage Charge",
    },

    {
      id: "fixed_charge",
      numeric: false,
      disablePadding: false,
      label: "Fixed Charge",
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
   
  

  ];


const TableName = "All Revenues"



function createData(date, transaction_type ,percentage_charge ,fixed_charge,total,currency) {
    return {
     date,
     transaction_type,
     percentage_charge,
     fixed_charge,
     total,
     currency,
    };
  }


const rows = [
    createData('20-03-2024', 'Deposit', '0.9', '1','1.13',  'INR'),
    createData('20-03-2024', 'Deposit', '0.9', '1','1.13',  'INR'),
    createData('05-04-2023', 'Deposit', '0.9', '1','10',    'CYN'),
    createData('01-02-2024', 'Deposit', '0.9', '1','0.85',  'USD'),
    createData('06-02-2024', 'Deposit', '0.9', '1','10',    'EUR'),
    createData('01-09-2023', 'Deposit', '0.9', '1','0.85',  'INR'),
    createData('03-08-2023', 'Deposit', '0.9', '1','0.85',  'USD'),
    createData('02-06-2024', 'Deposit', '0.9', '1','0.77',  'INR'),
    createData('01-02-2023', 'Deposit', '0.9', '1','0.67',  'EUR'),
    createData('04-12-2023', 'Deposit', '0.9', '1','1029',  'USD'),
    createData('08-09-2023', 'Deposit', '0.9', '1','2.90',  'CYN'),
    createData('03-07-2023', 'Deposit', '0.9', '1', '0.56',  'INR'),
    createData('01-12-2023', 'Deposit', '0.9', '1','0.89',  'USD'),
    createData('09-05-2023', 'Deposit', '0.9', '1','1.90',  'CYN'),
  ];


return (
    <>
        <Main open={open}>
        <DrawerHeader />
            <RevenuesTable headCells={headCells} rows={rows} TableName={TableName} />
        </Main>
    </>
  );
}


export default Revenues;

