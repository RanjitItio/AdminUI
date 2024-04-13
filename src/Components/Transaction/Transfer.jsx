import TransferTable from './TransferTable';
import {Main, DrawerHeader} from '../Content';



function TransferDetails({open}) {

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


const TableName = "All Transfers"



function createData(id, user, date, amount, fees, total, currency, receiver, status) {
    return {
      id,
      user,
      date,
      amount,
      fees,
      total,
      currency,
      receiver,
      status,
    };
  }


const rows = [
    createData(1,'Mukesh',     '01-02-2024',   '4,250',  '7',   '+4,250',     'USD',   'manjesh',   'Success'),
    createData(2, 'Mahesh',    '020-03-2024', '5,000',   '1.01', '-5,007',    'INR',   'Rupesh',    'Success'),
    createData(3, 'Ranjit',    '05-04-2023',   '12',     '-',   '+13.01',     'CYN',   'Akhilesh',  'Pending'),
    createData(4, 'Rakesh',    '06-02-2024', '11,900',   '17.8',  '+11,900',   'EUR',  'Manju',     'Cancelled'),
    createData(5, 'Sandeep',   '01-09-2023', '14,000',   '2',     '-14,017.8', 'INR',  'Johny',     'Pending'),
    createData(6, 'Sanjay',    '03-08-2023', '0.003294', '2',     '-0.003294', 'USD',  'Lara',      'Success'),
    createData(7, 'Jibesh',    '02-06-2024',  '500',     '8',     '+502',      'INR',  'Abdul',     'Success'),
    createData(8, 'John',      '01-02-2023',  '500',     '1.13',  '+502',      'EUR',  'Jeeshan',   'Pending'),
    createData(9, 'Doe',       '04-12-2023',  '0.003294','-',     '+0.003294', 'USD',  'Ajit',      'Cancelled'),
    createData(10, 'Rajeep',   '08-09-2023',  '100',     '1.13',  '-108',      'CYN',  'Doval',     'Pending'),
    createData(11, 'Mithilesh','03-7-2023',   '5',       '1.13',  '+5.05',     'INR',  'Bank',      'Success'),
    createData(12, 'Suresh',   '01-12-2023',  '5',       '-',     '+5.05',     'USD',  'Bank',      'Success'),
    createData(13, 'Ramesh',   '09-05-2023',  '10',      '17.8',  '+12.15',    'CYN',  'Bank',      'Pending'),
  ];


return (
    <>
        <Main open={open}>
        <DrawerHeader />
            <TransferTable headCells={headCells} rows={rows} TableName={TableName} />
        </Main>
    </>
  );
}


export default TransferDetails;

