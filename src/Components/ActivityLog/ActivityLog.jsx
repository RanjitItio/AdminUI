import ActivitylogsTable from './ActivityLogTable';
import {Main, DrawerHeader} from '../Content';




function ActivityLogData({open}) {

  const headCells = [
   

    {
        id: "date",
        numeric: false,
        disablePadding: true,
        label: "Date",
      },
    {
      id: "user_type",
      numeric: false,
      disablePadding: false,
      label: "User Type",
    },

    {
      id: "username",
      numeric: false,
      disablePadding: false,
      label: "Username",
    },

    

    {
      id: "ip_address",
      numeric: false,
      disablePadding: false,
      label: "IP address",
    },
    {
      id: "browser_platform",
      numeric: false,
      disablePadding: false,
      label: "Browser | Platform",
    },
   
  

  ];


const TableName = "Activity Logs"



function createData(date, user_type ,username ,ip_address,browser_platform) {
    return {
     date,
     user_type,
     username,
     ip_address,
     browser_platform,
     
    };
  }


const rows = [
    createData("29-05-2024 2:40 PM",	"User",	"Test User",	"220.158.205.202",	"Unknown 4.9. | Unknown"),
    createData("29-05-2024 2:08 PM",	"User"	,"BULENT ATAN"	,"178.233.42.100"	,"Google Chrome 109. | Windows")
    

  ];


return (
    <>
        <Main open={open}>
        <DrawerHeader />
            <ActivitylogsTable headCells={headCells} rows={rows} TableName={TableName} />
        </Main>
    </>
  );
}


export default ActivityLogData;

