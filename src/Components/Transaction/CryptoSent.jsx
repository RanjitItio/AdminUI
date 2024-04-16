import CryptoSentTable from './CryptoSentTable';
import {Main, DrawerHeader} from '../Content';




export default function CryptoSentDetails({open}) {

  const headCells = [
    {
      id: "id",
      numeric: false,
      disablePadding: true,
      label: "ID",
    },
    {
        id: "date",
        numeric: false,
        disablePadding: true,
        label: "Date",
      },
    {
      id: "sender",
      numeric: false,
      disablePadding: false,
      label: "Sender",
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
      id: "crypto_currency",
      numeric: false,
      disablePadding: false,
      label: "Crypto Currency",
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


const TableName = "All Crypto Sent Transactions"



function createData(id, date, sender,  amount, fees, total, crypto_currency, receiver, status) {
    return {
      id,
      date,
      sender,
      amount,
      fees,
      total,
      crypto_currency,
      receiver,
      status,
    };
  }



const rows = [
    createData(1,  '01-02-2024',  'Mukesh', '4,250',    '7',      '+4,250',       'DOGETEST', 'Mukesh',   'Success'),
    createData(2,  '020-03-2024', 'Mahesh', '5,000',    '1.01',   '-5,007',       'LTCTEST',  'Ranjit',    'Success'),
    createData(3,  '05-04-2023',  'Ranjit',  '12',       '-',      '+13.01',      'BITCOIN',  'Jibesh',   'Pending'),
    createData(4,  '06-02-2024',  'Rakesh',  '11,900',   '17.8',   '+11,900',     'ETHERIUM', 'Doe',      'Cancelled'),
    createData(5,  '01-09-2023',  'Sandeep', '14,000',   '2',      '-14,017.8',   'DOGETEST', 'Sanjay',   'Pending'),
    createData(6,  '03-08-2023',  'Sanjay',   '0.003294', '2',      '-0.003294',  'LTCTEST',  'Jibesh',   'Success'),
    createData(7,  '02-06-2024',  'Jibesh',  '500',      '8',      '+502',        'ETHERIUM', 'Rajeep',   'Success'),
    createData(8,  '01-02-2023',  'John',     '500',      '1.13',   '+502',       'DOGETEST', 'Mithilesh', 'Pending'),
    createData(9,  '04-12-2023',  'Doe',      '0.003294', '-',      '+0.003294',  'ETHERIUM', 'Suresh',    'Cancelled'),
    createData(10, '08-09-2023',  'Rajeep',   '100',      '1.13',   '-108',       'BITCOIN',  'Ramesh',    'Pending'),
    createData(11, '03-7-2023',   'Mithilesh', '5',        '1.13',   '+5.05',     'DOGETEST', 'Jibesh',    'Success'),
    createData(12, '01-12-2023',  'Suresh',    '5',        '-',      '+5.05',     'ETHERIUM', 'Ramesh',    'Success'),
    createData(13, '09-05-2023',  'Ramesh',   '10',       '17.8',   '+12.15',     'ETHERIUM', 'Doe',       'Pending'),
  ];



return (
    <>
        <Main open={open}>
        <DrawerHeader />
            <CryptoSentTable headCells={headCells} rows={rows} TableName={TableName} />
        </Main>
    </>
  );
}





