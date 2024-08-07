import UpperNavbar from './UpNavbar';
import LeftNavbar from './LeftNavbar';
import { useState } from 'react';








export default function MainNavbar({handleDrawerOpen, handleDrawerClose, open}) {
//   const theme = useTheme();
const dashboardContent = localStorage.getItem('isMerchantDashboard')

const [merchantContent, setMerchantContent] = useState(dashboardContent === 'true' ? true : dashboardContent === 'false' ? false : true); // Merchant and Default user clicked data

// Method to handel User and merchant, User swicth clicked
const handleMerchantUserSwitch = (event)=> {
    setMerchantContent(event)

    if (event === false) {
      localStorage.setItem('isMerchantDashboard', event)
    } else {
      localStorage.setItem('isMerchantDashboard', event)
    };
};


  return (
    <>
      {/* App Bar */}
      <UpperNavbar 
            handleDrawerOpen={handleDrawerOpen} 
            open={open} 
            handleMerchantUserSwitch={handleMerchantUserSwitch}
            merchantContent={merchantContent}
          />

      {/* Drawer */}
      <LeftNavbar 
            handleDrawerClose={handleDrawerClose} 
            open={open}
            merchantContent={merchantContent} 
            /> 
    </>
  );
};
