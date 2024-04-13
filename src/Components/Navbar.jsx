import * as React from 'react';
import Box from '@mui/material/Box';
import UpperNavbar from './UpNavbar';
import LeftNavbar from './LeftNavbar';
import ContentArea from './Content';







export default function MainNavbar() {
//   const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <Box sx={{ display: 'flex' }}>
        {/* App Bar */}
      <UpperNavbar handleDrawerOpen={handleDrawerOpen} open={open} />

      {/* Drawer */}
      <LeftNavbar handleDrawerClose={handleDrawerClose} open={open} />

      {/* Content Area */}
        <ContentArea open={open} />      
    </Box>
  );
}