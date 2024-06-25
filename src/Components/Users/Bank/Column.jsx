

const MerchantBankColumn = [
    {
      id: "id",
      numeric: true,
      disablePadding: true,
      label: "ID",
    },
    {
      id: "user",
      numeric: false,
      disablePadding: true,
      label: "User",
    },
    {
      id: "email",
      numeric: false,
      disablePadding: true,
      label: "Email",
    },
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: "Name",
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


export const MerchantBankAccountTableName = 'Merchant Bank Accounts'


export default MerchantBankColumn;
