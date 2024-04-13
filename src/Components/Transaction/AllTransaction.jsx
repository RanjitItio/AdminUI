import AllTransactionTable from './AllTransactionTable';
import {Main, DrawerHeader} from '../Content';



function AllTransactionData({open}) {

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

const TableName = "Transaction Detail"


function createData(id, user, date, type, amount, fees, total, currency, receiver, status) {
    return {
      id,
      user,
      date,
      type,
      amount,
      fees,
      total,
      currency,
      receiver,
      status,
    };
  }


const rows = [
    createData(1,'Mukesh',     '01-02-2024',  'Exchange To',   '4,250',    '7',     '+4,250',    'EUR', 'Kyla Sarah',     'Success'),
    createData(2, 'Mahesh',    '020-03-2024', 'Exchange From', '5,000',    '1.01',  '-5,007',    'USD', 'Irish Watson',   'Success'),
    createData(3, 'Ranjit',    '05-04-2023',  'Deposit',       '12',       '-',     '+13.01',    'USD', 'Agent Techvill', 'Pending'),
    createData(4, 'Rakesh',    '06-02-2024',  'Exchange To',   '11,900',   '17.8',  '+11,900',   'EUR', 'Agent Techvill', 'Cancelled'),
    createData(5, 'Sandeep',   '01-09-2023',  'Exchange From', '14,000',   '2',     '-14,017.8', 'USD', 'Irish Watson',   'Pending'),
    createData(6, 'Sanjay',    '03-08-2023',  'Withdrawal',    '0.003294', '2',     '-0.003294', 'BTC', 'Kyla Sarah',     'Success'),
    createData(7, 'Jibesh',    '02-06-2024',  'Deposit',       '500',      '8',     '+502',      'USD', 'Agent Techvill', 'Success'),
    createData(8, 'John',      '01-02-2023',  'Deposit',       '500',      '1.13',  '+502',      'BTC', 'Irish Watson',   'Pending'),
    createData(9, 'Doe',       '04-12-2023',  'Crypto Buy',    '0.003294', '-',     '+0.003294', 'EUR', 'Agent Techvill', 'Cancelled'),
    createData(10, 'Rajeep',   '08-09-2023',  'Crypto Buy',    '100',      '1.13',  '-108',      'USD', 'Irish Watson',   'Pending'),
    createData(11, 'Mithilesh','03-7-2023',   'Withdrawal',    '5',        '1.13',  '+5.05',     'BTC', 'Agent Techvill', 'Success'),
    createData(12, 'Suresh',   '01-12-2023',  'Exchange From', '5',        '-',     '+5.05',     'BTC', 'Agent Techvill', 'Success'),
    createData(13, 'Ramesh',   '09-05-2023',  'Deposit',       '10',       '17.8',  '+12.15',    'BTC', 'Irish Watson',   'Pending'),
  ];

  return (
    <>
    <Main open={open}>
    <DrawerHeader />
      <AllTransactionTable headCells={headCells} rows={rows} TableName={TableName} />
    </Main>
    </>
  );
}

export default AllTransactionData;
