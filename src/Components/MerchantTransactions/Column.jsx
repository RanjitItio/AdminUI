

const MerchantPaymentTableColumn = [
    {
      id: "transaction_id",
      numeric: false,
      disablePadding: true,
      label: "Transaction ID",
    },
    {
        id: "date",
        numeric: false,
        disablePadding: true,
        label: "Date",
      },
    {
      id: "user",
      numeric: false,
      disablePadding: false,
      label: "User",
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


export default MerchantPaymentTableColumn;