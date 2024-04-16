import CryptoReceivedTable from './CryptoReceivedTable';
import {Main, DrawerHeader} from '../Content';




export default function CryptoReceivedDetails({open}) {

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
      id: "action",
      numeric: false,
      disablePadding: false,
      label: "Action",
    },

  ];


const TableName = "All Crypto Received Transactions"



function createData(id, date, sender,  amount, crypto_currency, receiver) {
    return {
      id,
      date,
      sender,
      amount,
      crypto_currency,
      receiver,
    };
  }



const rows = [
    createData(1,  '01-02-2024',  'Mukesh', '4,250',    'DOGETEST', 'Mukesh', ),
    createData(2,  '020-03-2024', 'Mahesh', '5,000',    'LTCTEST',  'Ranjit',),
    createData(3,  '05-04-2023',  'Ranjit',  '12',      'BITCOIN',  'Jibesh',),
    createData(4,  '06-02-2024',  'Rakesh',  '11,900',  'ETHERIUM', 'Doe',),
    createData(5,  '01-09-2023',  'Sandeep', '14,000',  'DOGETEST', 'Sanjay',),
    createData(6,  '03-08-2023',  'Sanjay',   '0.003294','LTCTEST',  'Jibesh',),
    createData(7,  '02-06-2024',  'Jibesh',  '500',      'ETHERIUM', 'Rajeep',),
    createData(8,  '01-02-2023',  'John',     '500',     'DOGETEST', 'Mithilesh',),
    createData(9,  '04-12-2023',  'Doe',      '0.003294','ETHERIUM', 'Suresh',),
    createData(10, '08-09-2023',  'Rajeep',   '100',     'BITCOIN',  'Ramesh',),
    createData(11, '03-7-2023',   'Mithilesh', '5',      'DOGETEST', 'Jibesh',),
    createData(12, '01-12-2023',  'Suresh',    '5',      'ETHERIUM', 'Ramesh',),
    createData(13, '09-05-2023',  'Ramesh',   '10',      'ETHERIUM', 'Doe',),
  ];



return (
    <>
        <Main open={open}>
        <DrawerHeader />
            <CryptoReceivedTable headCells={headCells} rows={rows} TableName={TableName} />
        </Main>
    </>
  );
}





