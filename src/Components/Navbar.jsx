import UpperNavbar from './UpNavbar';
import LeftNavbar from './LeftNavbar';
import { useState } from 'react';








export default function MainNavbar({handleDrawerOpen, handleDrawerClose, open}) {
//   const theme = useTheme();
const [merchantContent, setMerchantContent] = useState(true) // Merchant and Default user clicked data

// Method to handel User and merchant, User swicth clicked
const handleMerchantUserSwitch = (event)=> {
    setMerchantContent(event)
};




  return (
    <>
      {/* App Bar */}
      <UpperNavbar 
            handleDrawerOpen={handleDrawerOpen} 
            open={open} 
            handleMerchantUserSwitch={handleMerchantUserSwitch}
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
