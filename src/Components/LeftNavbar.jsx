import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import React from 'react';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import NorthOutlinedIcon from '@mui/icons-material/NorthOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import SwapHorizOutlinedIcon from '@mui/icons-material/SwapHorizOutlined';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import GoogleIcon from '@mui/icons-material/Google';
import ContactlessIcon from '@mui/icons-material/Contactless';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import { ConfirmationNumberOutlined } from '@mui/icons-material';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import { el } from 'date-fns/locale';




const UserNavContent = [
  { text: 'Dashboard', subItems: [
    {text: 'Dashboard', icon: <DashboardCustomizeOutlinedIcon />, url: '/user/dashboard/'}
  ],
  icon: <DashboardCustomizeOutlinedIcon />
},

  { text: 'Users', subItems: [
    {text:'Users', icon: <Person2OutlinedIcon />, url: '/admin/users/data/'}, 
    {text: 'Admins', icon: <SupervisorAccountOutlinedIcon />, url: '/admin/admin-user/'}, 
  ],
  icon: <AccountCircleOutlinedIcon />},

  { text: 'Transactions', subItems: [
    {text: 'All Transactions', icon: <HistoryOutlinedIcon />, url: '/admin/all/uat/transaction/'},
    {text: 'Deposits', icon: <NorthOutlinedIcon />, url: '/admin/deposits/'},
    {text: 'Transfers', icon: <SwapHorizOutlinedIcon />, url: '/admin/transfers/'},
    {text: '-Withdrawls', icon: <ArrowDownwardOutlinedIcon />, url: '/admin/withdrawls/'},
  ],
  icon: <ReceiptLongOutlinedIcon />},

  { text: 'Crypto Transactions', subItems: [
      {text: 'All Transactions', icon: <HistoryOutlinedIcon />, url: '/admin/all/uat/transaction/'},
      {text: 'Deposits', icon: <NorthOutlinedIcon />, url: '/admin/deposits/'},
      {text: 'Transfers', icon: <SwapHorizOutlinedIcon />, url: '/admin/transfers/'},
      
    ],
    icon: <CurrencyBitcoinIcon />
  },

  { text: 'Crypto', subItems: [
      {text: 'Crypto Provider', icon: <HistoryOutlinedIcon />, url: ''},
      {text: 'Setting', icon: <HistoryOutlinedIcon />, url: ''},
      {text: 'Currencies', icon: <HistoryOutlinedIcon />, url: ''},
      
    ],
    icon: <CurrencyBitcoinIcon />
  },
  { text: 'Addons', subItems: [
      {text: 'Crypto Exchange', icon: <HistoryOutlinedIcon />, url: ''},
      {text: 'Investments', icon: <HistoryOutlinedIcon />, url: ''},
    ],
    icon: <ReceiptIcon />
  },
  { text: '-Revenues', subItems: [
    {text: '-Revenues', icon: <AccountBalanceOutlinedIcon />, url: '/admin/revenues/'},],
    icon: <AccountBalanceOutlinedIcon />
  },
  { text: '-Disputes', subItems: [
    {text: '-Disputes', icon: <ConfirmationNumberOutlined />, url: '/admin/dispute/'},],
    icon: <ConfirmationNumberOutlined />
  },
];



const MerchantNavContent = [
  { text: 'Dashboard', subItems: [
    {text: 'Dashboard', icon: <DashboardCustomizeOutlinedIcon />, url: '/'}
  ],
  icon: <DashboardCustomizeOutlinedIcon />
},

  { text: 'Merchants', subItems: [
    {text:'Merchants', icon: <Person2OutlinedIcon />, url: '/admin/merchants/'}, 
    {text: 'Admins', icon: <SupervisorAccountOutlinedIcon />, url: '/admin/admin-user/'}, 
  ],
  icon: <AccountCircleOutlinedIcon />},

  { text: 'Business', subItems: [
    {text: 'Businesses', icon: <StorefrontOutlinedIcon />, url: '/admin/merchant/businesses/'},   
  ],
  icon: <StorefrontOutlinedIcon />},

  { text: 'Pipe', subItems: [
    {text:'All Pipes', icon: <ContactlessIcon />, url: '/admin/pipes/'},  
  ],
  icon: <ContactlessIcon />},


  { text: 'Transactions', subItems: [
    {text: 'All Transactions', icon: <HistoryOutlinedIcon />, url: '/admin/all-transaction/'},
    {text: 'Withdrawls', icon: <ArrowDownwardOutlinedIcon />, url: '/admin/merchant/withdrawals/'},
    {text: 'Refunds', icon: <AutorenewIcon />, url: '/admin/merchant/refunds/'},
    // {text: '-Currency Exchange', icon: <PaymentsOutlinedIcon />, url: '/admin/exchanges/'},
    // {text: '-Request Payments', icon: <CalculateOutlinedIcon />, url: '/admin/request-payments/'},
    // {text: 'Merchant Payment', icon: <PaymentsOutlinedIcon />, url: '/admin/merchant-payments/'},
    // {text: '-Crypto Sent', icon: <KeyboardDoubleArrowRightOutlinedIcon />, url: '/admin/crypto-sent-transactions/'},
    // {text: '-Crypto Received', icon: <KeyboardDoubleArrowLeftOutlinedIcon />, url: "/admin/crypto-received-transactions"},
   
  ],
  icon: <ReceiptLongOutlinedIcon />},
    { text: 'Revenues', subItems: [
      {text: 'Revenues', icon: <AccountBalanceOutlinedIcon />, url: '/admin/revenues/'},],
      icon: <AccountBalanceOutlinedIcon />
    },
    { text: '-Disputes', subItems: [
      {text: '-Disputes', icon: <ConfirmationNumberOutlined />, url: '/admin/dispute/'},],
      icon: <ConfirmationNumberOutlined />
    },
    // { text: 'Tickets', subItems: [
    //   {text: 'Tickets', icon: <LocalActivityOutlinedIcon />, url: '/tickets/'}],
    //   icon: <LocalActivityOutlinedIcon />
    // },
    // { text: '-Activity Logs', subItems: [
    //   {text: '-Activity Logs', icon: <RemoveRedEyeOutlinedIcon />, url: '/admin/activitylogs/'}],
    //   icon: <RemoveRedEyeOutlinedIcon />
    // },
    // { text: '-Verifications', subItems: [
    //   {text: '-Identity Verification', icon: <FingerprintOutlinedIcon />, url: 'https://cssgradient.io/'}, 
    //   {text: '-Address Verification', icon: <ContactsOutlinedIcon />, url: 'https://cssgradient.io/'}],
    //   icon: <VerifiedOutlinedIcon /> 
    // }
];


// const Configurations = ['-Currencies', '-Crypto Provider', '-Settings']
// const Configurations = []
// const Addons = []
// const Addons = ['-Crypto Exchange', '-Investment']



const drawerWidth = 240;


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));




// Leftbar
export default function LeftNavbar({handleDrawerClose, open, merchantContent}) {
  const theme = useTheme();
  const [dropDown, setDropdown] = React.useState({});

  const handleClick = (index) => {
    setDropdown(prevOpen => ({ ...prevOpen, [index]: !prevOpen[index] }));
  };



  return(
    <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        
        <DrawerHeader style={{backgroundColor: '#0f3785', color: 'white'}}>
          <GoogleIcon /> &nbsp;&nbsp;<p className='my-3'><b>Itio Innovex</b></p>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />

        {merchantContent ? 
           <div style={{height:'200%', backgroundColor:'#0f3785'}}>
           
           <List style={{backgroundColor: '#0f3785', color: '#e7ebf2'}}>
                {MerchantNavContent.map((item, index) => (
                <React.Fragment key={item.text}>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => {
                      if (item.text === 'Dashboard') {
                        window.location.href = item.subItems[0].url;
                      } else {
                        handleClick(index);
                      }
                    }} >
                      <ListItemIcon style={{color: '#e7ebf2'}}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.text} />
                        {item.text !== 'Dashboard' && (dropDown[index] ? <ExpandLess /> : <ExpandMore />)}
                    </ListItemButton>
                  </ListItem>
            
                  {item.text !== 'Dashboard' && (
                  <Collapse in={dropDown[index]} timeout="auto" unmountOnExit >
                    <List component="div" disablePadding >
                      {item.subItems.map((subItem, subIndex) => (
                        <ListItem key={subIndex} disablePadding >
                          <ListItemButton component="a" href={subItem.url} rel="noopener noreferrer">
                          <ListItemIcon style={{ marginLeft: '1rem', color: 'white' }}>
                            {subItem.icon}
                          </ListItemIcon>
                            <ListItemText primary={subItem.text} />
                          </ListItemButton>
                        </ListItem>
                      ))}
              </List>
            </Collapse>
                  )}
        </React.Fragment>
      ))}
        </List>
           </div>
        : 
          <div style={{height:'200%', backgroundColor:'#0f3785'}}>
            
          <List style={{backgroundColor: '#0f3785', color: '#e7ebf2'}}>
                {UserNavContent.map((item, index) => (
                <React.Fragment key={item.text}>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() =>{
                      if (item.text === 'Dashboard') {
                        window.location.href = item.subItems[0].url;
                      } else {
                        handleClick(index)
                      }
                    }}>
                      <ListItemIcon style={{color: '#e7ebf2'}}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.text} />
                          {item.text !== 'Dashboard' && (dropDown[index] ? <ExpandLess /> : <ExpandMore />)}
                    </ListItemButton>
                  </ListItem>
                
                  <Collapse in={dropDown[index]} timeout="auto" unmountOnExit >
                    <List component="div" disablePadding >
                      {item.subItems.map((subItem, subIndex) => (
                        <ListItem key={subIndex} disablePadding >
                          <ListItemButton component="a" href={subItem.url} rel="noopener noreferrer">
                          <ListItemIcon style={{ marginLeft: '1rem', color: 'white' }}>
                            {subItem.icon}
                          </ListItemIcon>
                            <ListItemText primary={subItem.text} />
                          </ListItemButton>
                        </ListItem>
                      ))}
              </List>


            </Collapse>
        </React.Fragment>
      ))}
        </List>
          </div>
        }
              
        {/* <Divider/> */}

        {/* <List style={{backgroundColor: '#0f3785', color: '#e7ebf2'}}>
          {Configurations.map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon style={{color: '#e7ebf2'}}>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
        {/* <Divider /> */}

        {/* <List style={{backgroundColor: '#0f3785', color: 'white'}}>
          {Addons.map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon style={{color: 'white'}}>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </Drawer>

  )
};






























// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
// import UpperNavbar from './UpNavbar';
// import Collapse from '@mui/material/Collapse';
// import ExpandLess from '@mui/icons-material/ExpandLess';
// import ExpandMore from '@mui/icons-material/ExpandMore';



// const NavContent = [
//     {text: 'Dashboard', subItems: ['1', '2', '3']}, 
//     {text: 'Users', subItems: ['u1', 'u2', 'u3']},
//     {text: 'Transactions', subItems: ['T1', 'T2', 'T3'] },
//     {text: 'Revenues', subItems: ['R1', 'R2', 'R3']},
//     {text: 'Disputes', subItems: ['D1', 'D2', 'D3']}, 
//     {text: 'Tickets', subItems: ['T1', 'T2', 'T3']}, 
//     {text: 'Activity Logs', subItems: ['A1', 'A2', 'A3']}
// ]

// const Configuration = ['Currencies', 'Crypto Providers', 'Templates', 'Settings', 'System Update']
// const Addons = ['Agent', 'Crypto Exchange', 'investment', 'Addon Manager', 'Cache Clear']



// export default function LeftNavbar() {
//   const [open, setOpen] = React.useState(false);
//   const [dropDown, setDropDown] = React.useState({})

//   const handleClick = (index) => {
//     setOpen(prevOpen => ({ ...prevOpen, [index]: !prevOpen[index] }));
//   };

//   const toggleDrawer = (newOpen) => () => {
//     setOpen(newOpen);
//   };


//   const DrawerList = (
//     <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
//       <List>
//         {NavContent.map((item, index) => (
//             <>
//           <ListItem key={index} disablePadding>
//             <ListItemButton onClick={() => handleClick(index)}>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon>
//               <ListItemText primary={item.text} />
//               {open[index] ? <ExpandLess /> : <ExpandMore />}
//             </ListItemButton>
//           </ListItem>

//         <Collapse in={open[index]} timeout="auto" unmountOnExit>
//         <List component="div" disablePadding>
//             {item.subItems.map((subItem, subIndex) => (
//             <ListItem key={subIndex} disablePadding>
//             <ListItemButton>
//                 <ListItemText primary={subItem} />
//             </ListItemButton>
//             </ListItem>
//         ))}
//         </List>
//         </Collapse>
//         </>
//         ))}
//       </List>
//       <Divider />

//       <List>
//         {Configuration.map((text, index) => (
//           <ListItem key={text} disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//       <Divider />

//       <List>
//         {Addons.map((text, index) => (
//           <ListItem key={text} disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>

//     </Box>
//   );

//   return (
//     <div>
//         <UpperNavbar toggleDrawer={toggleDrawer(true)} />
//         <Drawer open={open} onClose={toggleDrawer(false)}>
//         {DrawerList}
//       </Drawer>
//     </div>
//   );
// }