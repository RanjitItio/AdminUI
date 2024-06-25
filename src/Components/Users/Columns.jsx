
export const TicketTableColumns = [
    {
        id: "date",
        numeric: false,
        disablePadding: true,
        label: "Date",
    },
    {
        id: "subject",
        numeric: false,
        disablePadding: false,
        label: "Subject",
    },
    {
        id: "status",
        numeric: false,
        disablePadding: true,
        label: "Status",
    },
    {
        id: "priority",
        numeric: false,
        disablePadding: false,
        label: "Priority",
    },

    {
        id: "lastreply",
        numeric: false,
        disablePadding: false,
        label: "Last Reply",
    },

    {
        id: "action",
        numeric: false,
        disablePadding: false,
        label: "Action",
    },


];


export const WalletTableColumns = [
    {
        id: "ID",
        numeric: false,
        disablePadding: true,
        label: "ID",
    },
    {
        id: "Date Created",
        numeric: false,
        disablePadding: false,
        label: "Date Created",
    },
    {
        id: "Currency",
        numeric: false,
        disablePadding: true,
        label: "Currency",
    },
    {
        id: "Balance",
        numeric: false,
        disablePadding: false,
        label: "Balance",
    },
    {
        id: "Status",
        numeric: false,
        disablePadding: false,
        label: "Status",
    },


];


export const TransactionTableColumns = [
    {
        id: "Transaction ID",
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
        id: "Sender",
        numeric: false,
        disablePadding: false,
        label: "Sender",
    },
    {
        id: "Type",
        numeric: false,
        disablePadding: true,
        label: "Type",
    },
    {
        id: "Amount",
        numeric: false,
        disablePadding: false,
        label: "amount",
    },
    {
        id: "fees",
        numeric: false,
        disablePadding: false,
        label: "Fees",
    },
    {
        id: "Total Amount",
        numeric: false,
        disablePadding: false,
        label: "Total Amount",
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


export const DisputeTableColumn = [
    {
        id: "date",
        numeric: false,
        disablePadding: true,
        label: "Date",
    },
    {
        id: "dispute_id",
        numeric: false,
        disablePadding: false,
        label: "Disputes",
    },
    {
        id: "title",
        numeric: false,
        disablePadding: true,
        label: "Title",
    },
    {
        id: "claimant",
        numeric: false,
        disablePadding: false,
        label: "Claimant",
    },
    {
        id: "transaction_id",
        numeric: false,
        disablePadding: false,
        label: "Transaction ID",
    },

    {
        id: "status",
        numeric: false,
        disablePadding: false,
        label: "Status",
    },


];




export const TicketTableName = "Tickets"
export const WalletsTableName = " Wallets"
export const TransactionTableName = "Transactions"
export const DisputeTableName = "Dispute"

