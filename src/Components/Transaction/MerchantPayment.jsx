import MerchantPaymentTable from './MerchantPaymentTable';
import {Main, DrawerHeader} from '../Content';




export default function MerchantPaymentDetails({open}) {

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
        id: "merchant",
        numeric: false,
        disablePadding: true,
        label: "Merchant",
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
      id: "payment_method",
      numeric: false,
      disablePadding: false,
      label: "Payment Method",
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


const TableName = "All Merchant Payments"



function createData(id, date, user,  merchant, amount, fees, total, currency, payment_method, status) {
    return {
      id,
      date,
      user,
      merchant,
      amount,
      fees,
      total,
      currency,
      payment_method,
      status,
    };
  }



const rows = [
    createData(1,  '01-02-2024',  'Mukesh', 'Mukesh',   '4,250',    '7',      '+4,250',    'USD',  'Bank',  'Success'),
    createData(2,  '020-03-2024', 'Mahesh', 'Ranjit',   '5,000',    '1.01',   '-5,007',    'INR',  'Stripe',  'Success'),
    createData(3,  '05-04-2023',  'Ranjit',  'Rakesh',  '12',       '-',      '+13.01',    'CYN',  'Paypal',  'Pending'),
    createData(4,  '06-02-2024',  'Rakesh', 'Ranjit',   '11,900',   '17.8',   '+11,900',   'EUR',  'Card',  'Cancelled'),
    createData(5,  '01-09-2023',  'Sandeep', 'Ranjit',   '14,000',   '2',      '-14,017.8', 'INR',  'UPI',  'Pending'),
    createData(6,  '03-08-2023',  'Sanjay',  'Sandeep',  '0.003294', '2',      '-0.003294', 'USD',  'Bank',  'Success'),
    createData(7,  '02-06-2024',  'Jibesh',  'Sanjay',   '500',      '8',      '+502',      'INR',  'Razorpay',  'Success'),
    createData(8,  '01-02-2023',  'John',    'Jibesh',   '500',      '1.13',   '+502',      'EUR',  'Paytm',  'Pending'),
    createData(9,  '04-12-2023',  'Doe',     'Doe',      '0.003294', '-',      '+0.003294', 'USD',  'Bank',  'Cancelled'),
    createData(10, '08-09-2023',  'Rajeep',  'Doe',      '100',      '1.13',   '-108',      'CYN',  'Paypal',  'Pending'),
    createData(11, '03-7-2023',   'Mithilesh','Rajeep',  '5',        '1.13',   '+5.05',     'INR',  'Stripe',  'Success'),
    createData(12, '01-12-2023',  'Suresh',  'Rajeep',   '5',        '-',      '+5.05',     'USD',  'PayU',  'Success'),
    createData(13, '09-05-2023',  'Ramesh',  'Suresh',   '10',       '17.8',   '+12.15',    'CYN',  'Bank',  'Pending'),
  ];



return (
    <>
        <Main open={open}>
        <DrawerHeader />
            <MerchantPaymentTable headCells={headCells} rows={rows} TableName={TableName} />
        </Main>
    </>
  );
}





