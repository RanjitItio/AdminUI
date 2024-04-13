import MerchantTable from './merchantTable';
import {Main, DrawerHeader} from '../Content';



function MerchantDetails({open}) {

  const headCells = [
    {
      id: "id",
      numeric: false,
      disablePadding: true,
      label: "ID",
    },
    {
      id: "user_id",
      numeric: false,
      disablePadding: true,
      label: "User ID",
    },
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "Name",
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
      disablePadding: false,
      label: "Date",
    },
    {
      id: "type",
      numeric: false,
      disablePadding: false,
      label: "Type",
    },

    {
      id: "group",
      numeric: false,
      disablePadding: false,
      label: "Group",
    },

    {
      id: "url",
      numeric: false,
      disablePadding: false,
      label: "URL",
    },

    {
      id: "logo",
      numeric: false,
      disablePadding: false,
      label: "Logo",
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

const TableName = "Merchant Detail"


function createData(id, user_id, name, user, date, type, group, url, logo, status) {
    return {
      id,
      user_id,
      name,
      user,
      date,
      type,
      group,
      url,
      logo,
      status,
    };
  }


const rows = [
    createData(1,'LDWOFPPW6YEOJ', 'Manjesh', 'Yadav', '8978907654', 'manjesh@mail.com', 'Merchant Regular', 'https://www.google.com/', '/amazon.jpg', 'Active'),
    createData(2, 'Z3IKX4CNC2ULK', 'Rupesh', 'Maharana', '8978907654', 'manjesh@mail.com', 'Merchant Regular', 'https://www.google.com/', '/bay.png', 'Active'),
    createData(3, 'J7OJ4STR4ZMXJ', 'Manjesh', 'Yadav', '8978907654', 'manjesh@mail.com', 'Merchant Regular', 'https://www.google.com/', '/berger.png', 'Active'),
    createData(4, 'X43BS17Y7PL81', 'Manjesh', 'Yadav', '8978907654', 'manjesh@mail.com', 'Merchant Regular', 'https://www.google.com/', '/flipkart.png', 'Active'),
    createData(5, 'J7OJ4STR4ZMXJ', 'Manjesh', 'Yadav', '8978907654', 'manjesh@mail.com', 'Merchant Regular', 'https://www.google.com/', '/vite.svg', 'Active'),
    createData(6, 'Z3IKX4CNC2ULK', 'Manjesh', 'Yadav', '8978907654', 'manjesh@mail.com', 'Merchant Regular', 'https://www.google.com/', '/amazon.jpg', 'Active'),
    createData(7, 'X43BS17Y7PL81', 'Manjesh', 'Yadav', '8978907654', 'manjesh@mail.com', 'Merchant Regular', 'https://www.google.com/', '/bay.png',   'Active'),
    createData(8, 'Z3IKX4CNC2ULK', 'Manjesh', 'Yadav', '8978907654', 'manjesh@mail.com', 'Merchant Regular', 'https://www.google.com/', '/berger.png', 'Active'),
    createData(9, 'J7OJ4STR4ZMXJ', 'Manjesh', 'Yadav', '8978907654', 'manjesh@mail.com', 'Merchant Regular', 'https://www.google.com/', '/flipkart.png', 'Active'),
    createData(10, 'Z3IKX4CNC2ULK', 'Manjesh', 'Yadav', '8978907654', 'manjesh@mail.com', 'Merchant Regular', 'https://www.google.com/', '/vite.svg', 'Active'),
    createData(11, 'Z3IKX4CNC2ULK', 'Manjesh', 'Yadav', '8978907654', 'manjesh@mail.com', 'Merchant Regular', 'https://www.google.com/', '/amazon.jpg', 'Active'),
    createData(12, 'J7OJ4STR4ZMXJ', 'Manjesh', 'Yadav', '8978907654', 'manjesh@mail.com', 'Merchant Regular', 'https://www.google.com/', '/bay.png', 'Active'),
    createData(13, 'X43BS17Y7PL81', 'Manjesh', 'Yadav', '8978907654', 'manjesh@mail.com', 'Merchant Regular', 'https://www.google.com/', '/berger.png', 'Active'),
  ];

  return (
    <>
    <Main open={open}>
    <DrawerHeader />
      <MerchantTable headCells={headCells} rows={rows} TableName={TableName} />
    </Main>
    </>
  );
}

export default MerchantDetails;
