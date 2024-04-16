import DataTable from "../DataTable";
import {Main, DrawerHeader} from '../Content';



function UsersData({open}) {

  const headCells = [
    {
      id: "id",
      numeric: true,
      disablePadding: true,
      label: "ID",
    },
    {
      id: "first_name",
      numeric: false,
      disablePadding: true,
      label: "First Name",
    },
    {
      id: "last_name",
      numeric: false,
      disablePadding: false,
      label: "Last Name",
    },

    {
      id: "phone",
      numeric: false,
      disablePadding: false,
      label: "Phone",
    },
    {
      id: "email",
      numeric: false,
      disablePadding: false,
      label: "Email",
    },

    {
      id: "group",
      numeric: false,
      disablePadding: false,
      label: "Group",
    },

    {
      id: "last_login",
      numeric: false,
      disablePadding: false,
      label: "Last Login",
    },

    {
      id: "ip",
      numeric: false,
      disablePadding: false,
      label: "IP",
    },

    {
      id: "status",
      numeric: false,
      disablePadding: false,
      label: "Status",
    },

    {
      id: "action",
      numeric: true,
      disablePadding: false,
      label: "Action",
    },
  ];

const TableName = "Users Detail"


function createData(id, first_name, last_name, phone, email, group, last_login, ip, status, action) {
    return {
      id,
      first_name,
      last_name,
      phone,
      email,
      group,
      last_login,
      ip,
      status,
      action
    };
  }

const rows = [
    createData(1, 'Manjesh', 'Yadav', '8978907654', 'manjesh@mail.com', 'Merchant Regular', '11 Minute ago', '123.65.765', 'Active', 'dd'),
    createData(2, 'Rupesh', 'Maharana', '8978907654', 'manjesh@mail.com', 'Merchant Regular', '11 Minute ago', '123.65.765', 'Inactive', 'dd'),
    createData(3, 'Manjesh', 'Yadav', '8978907654', 'manjesh@mail.com', 'Merchant Regular', '11 Minute ago', '123.65.765', 'Pending', 'dd'),
    createData(4, 'Manjesh', 'Yadav', '8978907654', 'manjesh@mail.com', 'Merchant Regular', '11 Minute ago', '123.65.765', 'Active', 'dd'),
    createData(5, 'Manjesh', 'Yadav', '8978907654', 'manjesh@mail.com', 'Merchant Regular', '11 Minute ago', '123.65.765', 'Inactive', 'dd'),
    createData(6, 'Manjesh', 'Yadav', '8978907654', 'manjesh@mail.com', 'Merchant Regular', '11 Minute ago', '123.65.765', 'Active', 'dd'),
    createData(7, 'Manjesh', 'Yadav', '8978907654', 'manjesh@mail.com', 'Merchant Regular', '11 Minute ago', '123.65.765', 'Active', 'dd'),
    createData(8, 'Manjesh', 'Yadav', '8978907654', 'manjesh@mail.com', 'Merchant Regular', '11 Minute ago', '123.65.765', 'Active', 'dd'),
    createData(9, 'Manjesh', 'Yadav', '8978907654', 'manjesh@mail.com', 'Merchant Regular', '11 Minute ago', '123.65.765', 'Active', 'dd'),
    createData(10, 'Manjesh', 'Yadav', '8978907654', 'manjesh@mail.com', 'Merchant Regular', '11 Minute ago', '123.65.765', 'Active', 'dd'),
    createData(11, 'Manjesh', 'Yadav', '8978907654', 'manjesh@mail.com', 'Merchant Regular', '11 Minute ago', '123.65.765', 'Active', 'dd'),
    createData(12, 'Manjesh', 'Yadav', '8978907654', 'manjesh@mail.com', 'Merchant Regular', '11 Minute ago', '123.65.765', 'Active', 'dd'),
    createData(13, 'Manjesh', 'Yadav', '8978907654', 'manjesh@mail.com', 'Merchant Regular', '11 Minute ago', '123.65.765', 'Active', 'dd'),
  ];

  return (
    <>
    <Main open={open}>
    <DrawerHeader />
      <DataTable headCells={headCells} rows={rows} TableName={TableName} />
    </Main>
    </>
  );
}

export default UsersData;
