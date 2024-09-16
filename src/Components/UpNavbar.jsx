import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CssBaseline from '@mui/material/CssBaseline';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import React from 'react';
import { Link } from 'react-router-dom';
import { Switch } from 'antd'




const drawerWidth = 240;


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


const settings = [
            //  {text: '-Profile', url: '/'},
            //  {text: '-Account', url: '/'},
            {text: 'Dashboard', url: '/'},
            {text: 'Logout', url: '/signout/' }
          ];

// Up Navbar
function UpperNavbar({handleDrawerOpen, open, handleMerchantUserSwitch, merchantContent}){
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  return(
    <>
    <CssBaseline />
      <AppBar position="fixed" open={open} style={{backgroundColor: '#0f3785'}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge='start'
            sx={{ mr: 0, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Itio Innovex
          </Typography>
          &nbsp;

          <Switch 
              checkedChildren="Merchant" 
              unCheckedChildren="User" 
              defaultChecked 
              value={merchantContent}
              onChange={(event)=> {handleMerchantUserSwitch(event)}}
              />


           {/* Avatar Section */}
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end'}}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <MenuItem key={index} onClick={handleCloseUserMenu}>
                  <Link to={setting.url} textalign="center" style={{textDecoration: 'none'}}>{setting.text}</Link>
                </MenuItem>
              ))}
            </Menu>

          </Box>

        </Toolbar>
      </AppBar>
    </>
  )
}



export default UpperNavbar;

