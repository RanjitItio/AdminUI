import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from "react";
import Box from '@mui/material/Box';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "./authProvider";
import { ProtectedRoute } from "./protectedroutes";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Signup from '../Authentication/Signup';
import Signin from '../Authentication/Signin';
import UpperNavbar from '../UpNavbar';
import LeftNavbar from  '../LeftNavbar';
import Dashboard from "../Dashboard";
import UsersData from '../Users/users';
import MerchantDetails from '../Users/merchant';
import AdminDetails from '../Users/Admin';
import UserCreateForm from '../Users/userCreateForm';
import MerchantCreateForm from '../Users/MerchantCreateForm';
import AdminCreateForm from '../Users/AdminCreateForm';
import AllTransactionData from '../Transaction/AllTransaction';
import AllDepositDetail from '../Transaction/Deposit';
import Withdrawls from '../Transaction/Withdrawl';
import TransferDetails from '../Transaction/Transfer';
import CurrencyExchange from '../Transaction/CurrencyExchange';
import RequestPaymentDetails from '../Transaction/RequestPayment';
import MerchantPaymentDetails from '../Transaction/MerchantPayment';
import CryptoSentDetails from  '../Transaction/CryptoSent';
import CryptoReceivedDetails from '../Transaction/CryptoReceived';














const AuthRoutes = () => {
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const { token } = useAuth();
  
    
    const routesForPublic = [
      {
        path: "/service",
        element: <div>Service Page</div>,
      },
      {
        path: "/about-us",
        element: <div>About Us</div>,
      },
    ];
  
   
    const routesForAuthenticatedOnly = [
      {
        path: "*",
        element: <ProtectedRoute />, 
        children: [
          {
            path: "*",
            element: (
              
              
                <Routes>
                    <Route exact path='/signup/' element={<Signup />}></Route>
                    <Route exact path='/signin/' element={<Signin />}></Route>

                    
                  <Route exact path='*' element={
                    <Box sx={{ display: 'flex' }}>

                    <UpperNavbar handleDrawerOpen={handleDrawerOpen} open={open} />
                    <LeftNavbar handleDrawerClose={handleDrawerClose} open={open} />

                      <Routes>
                          <Route exact path='/' element={<Dashboard open={open} />}></Route>
                          <Route exact path="/admin/users/" element={<UsersData open={open} />} ></Route>
                          <Route exact path="/admin/merchant/" element={<MerchantDetails open={open} />} ></Route>
                          <Route exact path="/admin/admin-user/" element={<AdminDetails open={open} />} ></Route>
                          <Route exact path="/admin/create-user/" element={<UserCreateForm open={open} />} ></Route>
                          <Route exact path="/admin/create-merchant/" element={<MerchantCreateForm open={open} />} ></Route>
                          <Route exact path="/admin/create-admin/" element={<AdminCreateForm open={open} />} ></Route>
                          <Route exact path="/admin/all-transaction/" element={<AllTransactionData open={open} />} ></Route>
                          <Route exact path="/admin/deposits/" element={<AllDepositDetail open={open} />} ></Route>
                          <Route exact path="/admin/withdrawls/" element={<Withdrawls open={open} />} ></Route>
                          <Route exact path="/admin/transfers/" element={<TransferDetails open={open} />} ></Route>
                          <Route exact path="/admin/exchanges/" element={<CurrencyExchange open={open} />} ></Route>
                          <Route exact path="/admin/request-payments/" element={<RequestPaymentDetails open={open} />} ></Route>
                          <Route exact path="/admin/merchant-payments/" element={<MerchantPaymentDetails open={open} />} ></Route>
                          <Route exact path="/admin/crypto-sent-transactions/" element={<CryptoSentDetails open={open} />} ></Route>
                          <Route exact path="/admin/crypto-received-transactions/" element={<CryptoReceivedDetails open={open} />} ></Route>
                      </Routes>
                    </Box>
                  }></Route>
                </Routes>
            ),
          },
        ],
      },
    ];
  

    const routesForNotAuthenticatedOnly = [
      {
        path: "/signup/",
        element: <Signup />,
      },
      {
        path: "/signin/",
        element: <Signin />,
      }
    ];
  
    
    const router = createBrowserRouter([
      ...routesForPublic,
      ...(!token ? routesForNotAuthenticatedOnly : []),
      ...routesForAuthenticatedOnly,
    ]);
    
    return <RouterProvider router={router} />;
  
  };



export default AuthRoutes;