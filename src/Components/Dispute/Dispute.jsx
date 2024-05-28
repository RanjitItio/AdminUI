import DisputeTable from './DisputeTable';
import {Main, DrawerHeader} from '../Content';




function Dispute({open}) {

  const headCells = [
   

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
      label: "Dispute ID",
    },

    {
      id: "title",
      numeric: false,
      disablePadding: false,
      label: "Title",
    },

    {
      id: "claimant",
      numeric: false,
      disablePadding: false,
      label: "Claimant",
    },

    {
      id: "defendant",
      numeric: false,
      disablePadding: false,
      label: "Defendant",
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


const TableName = "All Revenues"



function createData(date, dispute_id ,title ,claimant,defendant,transaction_id,status) {
    return {
     date,
     dispute_id,
     title,
     claimant,
     defendant,
     transaction_id,
     status
    };
  }


const rows = [
    createData("30-08-2023 1:31 PM",	"DIS-656MEZ",	"Description does not match with product",	"Kyla Sarah",	"Irish Watson",	"9HNQSGQSIWL3Q",	"Closed"),
    createData("02-09-2023 1:31 PM",	"DIS-WUTUZP",	"Product received isssue",	"Kyla Sarah",	"Irish Watson"	,"CJIGRGEWD28HB"	,"Solved"
    ),

  ];


return (
    <>
        <Main open={open}>
        <DrawerHeader />
            <DisputeTable headCells={headCells} rows={rows} TableName={TableName} />
        </Main>
    </>
  );
}


export default Dispute;

