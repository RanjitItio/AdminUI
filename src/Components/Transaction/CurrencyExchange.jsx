import CurrencyExchangeTable from './CurrencyExchangeTable';
import {Main, DrawerHeader} from '../Content';




function CurrencyExchange({open}) {

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
      id: "rate",
      numeric: false,
      disablePadding: false,
      label: "Rate",
    },
    {
      id: "from",
      numeric: false,
      disablePadding: false,
      label: "From",
    },
    {
      id: "to",
      numeric: false,
      disablePadding: false,
      label: "To",
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


const TableName = "All Exchnages"



function createData(id, user, date, amount, fees, total, rate, from, to, status) {
    return {
      id,
      user,
      date,
      amount,
      fees,
      total,
      rate,
      from,
      to,
      status,
    };
  }


const rows = [
    createData(1,  'Mukesh',   '01-02-2024',  '4,250',   '7',      '+4,250',   '0.85',  'USD',   'EUR',   'Success'),
    createData(2,  'Mahesh',   '020-03-2024', '5,000',   '1.01',   '-5,007',   '1.13',  'INR',   'USD',    'Success'),
    createData(3,  'Ranjit',   '05-04-2023',  '12',      '-',      '+13.01',   '10',    'CYN',   'EUR',  'Pending'),
    createData(4,  'Rakesh',   '06-02-2024',  '11,900',   '17.8',  '+11,900',  '10',    'EUR',  'INR',     'Cancelled'),
    createData(5,  'Sandeep',  '01-09-2023',  '14,000',   '2',     '-14,017.8','0.85',  'INR',  'USD',     'Pending'),
    createData(6,  'Sanjay',   '03-08-2023',  '0.003294', '2',     '-0.003294','0.85',  'USD',  'EUR',      'Success'),
    createData(7,  'Jibesh',   '02-06-2024',  '500',     '8',      '+502',     '0.77',  'INR',  'USD',     'Success'),
    createData(8,  'John',     '01-02-2023',  '500',     '1.13',   '+502',     '0.67',  'EUR',  'USD',   'Pending'),
    createData(9,  'Doe',      '04-12-2023',  '0.003294','-',      '+0.003294','1029',  'USD',  'EUR',      'Cancelled'),
    createData(10, 'Rajeep',   '08-09-2023',  '100',     '1.13',   '-108',     '2.90',  'CYN',  'INR',     'Pending'),
    createData(11, 'Mithilesh','03-7-2023',   '5',       '1.13',   '+5.05',    '0.56',  'INR',  'USD',      'Success'),
    createData(12, 'Suresh',   '01-12-2023',  '5',       '-',      '+5.05',    '0.89',  'USD',  'EUR',      'Success'),
    createData(13, 'Ramesh',   '09-05-2023',  '10',      '17.8',   '+12.15',   '1.90',  'CYN',  'INR',      'Pending'),
  ];


return (
    <>
        <Main open={open}>
        <DrawerHeader />
            <CurrencyExchangeTable headCells={headCells} rows={rows} TableName={TableName} />
        </Main>
    </>
  );
}


export default CurrencyExchange;

