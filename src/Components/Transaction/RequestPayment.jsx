import RequestPaymentTable from './RequestPaymentTable';
import {Main, DrawerHeader} from '../Content';




export default function RequestPaymentDetails({open}) {

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
      id: "requested_amount",
      numeric: false,
      disablePadding: false,
      label: "Requested Amount",
    },

    {
      id: "accepted_amount",
      numeric: false,
      disablePadding: false,
      label: "Accepted Amount",
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


const TableName = "All Request Payments"



function createData(id, user, date, requested_amount, accepted_amount, currency, receiver, status) {
    return {
      id,
      user,
      date,
      requested_amount,
      accepted_amount,
      currency,
      receiver,
      status,
    };
  }


const rows = [
    createData(1,  'Mukesh',   '01-02-2024',  '+4250',   '+7',     'USD',   'EUR',   'Success'),
    createData(2,  'Mahesh',   '020-03-2024', '-5,000',   '-1.01',  'INR',   'USD',    'Success'),
    createData(3,  'Ranjit',   '05-04-2023',  '+12',      '-',     'CYN',   'EUR',  'Pending'),
    createData(4,  'Rakesh',   '06-02-2024',  '-11,900',   '-17.8', 'EUR',  'INR',     'Cancelled'),
    createData(5,  'Sandeep',  '01-09-2023',  '+14,000',   '+2',    'INR',  'USD',     'Pending'),
    createData(6,  'Sanjay',   '03-08-2023',  '-0.003294', '+2',    'USD',  'EUR',      'Success'),
    createData(7,  'Jibesh',   '02-06-2024',  '-500',     '-8',     'INR',  'USD',     'Success'),
    createData(8,  'John',     '01-02-2023',  '+500',     '+1.13',  'EUR',  'USD',   'Pending'),
    createData(9,  'Doe',      '04-12-2023',  '-0.003294','-',     'USD',  'EUR',      'Cancelled'),
    createData(10, 'Rajeep',   '08-09-2023',  '+100',     '-1.13',  'CYN',  'INR',     'Pending'),
    createData(11, 'Mithilesh','03-7-2023',   '-5',       '+1.13',  'INR',  'USD',      'Success'),
    createData(12, 'Suresh',   '01-12-2023',  '+5',       '-',     'USD',  'EUR',      'Success'),
    createData(13, 'Ramesh',   '09-05-2023',  '-10',      '-17.8',  'CYN',  'INR',      'Pending'),
  ];


return (
    <>
        <Main open={open}>
        <DrawerHeader />
            <RequestPaymentTable headCells={headCells} rows={rows} TableName={TableName} />
        </Main>
    </>
  );
}



