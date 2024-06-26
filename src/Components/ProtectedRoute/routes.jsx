import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
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
import MerchantDetails from '../Merchant/merchant';
import AdminDetails from '../Users/Admin';
import UserCreateForm from '../Users/userCreateForm';
import MerchantCreateForm from '../Merchant/MerchantCreateForm';
import AdminCreateForm from '../Users/AdminCreateForm';
import AllTransactionData from '../Transaction/AllTransaction';
import AllDepositDetail from '../Transaction/Deposit';
import Withdrawls from '../Transaction/Withdrawl';
import TransferDetails from '../Transaction/Transfer';
import CurrencyExchange from '../Transaction/CurrencyExchange';
import RequestPaymentDetails from '../Transaction/RequestPayment';
import MerchantPaymentDetails from '../MerchantTransactions/merchantPayment.jsx';
import CryptoSentDetails from  '../Transaction/CryptoSent';
import CryptoReceivedDetails from '../Transaction/CryptoReceived';
import Logout from '../Authentication/Logout';
import DepositUpdate from "../Transaction/DepositUpdate";
import WithdrawUpdate from "../Transaction/WithdrawUpdate";
import CurrencyTable from "../Currency/Currency";
import AddCurrency from "../Currency/AddCurrency";
import TicketTable from "../Ticket/Ticket";
import Crypto from "../Crypto/Crypto";
import AddBlockio from "../Crypto/AddFormBlockio";
import AddTatumio from "../Crypto/AddFormTatumio";
import Profile from "../Users/profileedit.jsx";
import UserTransactionDetail from '../Users/UserTransactionDetails.jsx';
import AdminUpdateForm from '../Users/AdminUpdateForm.jsx';
import Revenues from '../Revenues/Revenues.jsx';
import Dispute from '../Dispute/Dispute.jsx';
import DisputeDiscussion from '../Dispute/DisputeDiscussion.jsx';
import AllTransactionDetail from '../Transaction/AllTransactionDetails.jsx';
import TicketAddForm from '../Ticket/TicketAdd.jsx';
import TicketUpdateForm from '../Ticket/TicketUpdate.jsx';
import ActivityLogData from '../ActivityLog/ActivityLog.jsx';
import TransferTransactionDetail from '../Transaction/TransferDetails.jsx';
import MerchantProfile from '../Merchant/MerchantProfile.jsx';
import MerchantPaymentUpdate from '../MerchantTransactions/paymentUpdate.jsx';
import MerchantBankDetail from '../Users/Bank/BankDetails.jsx';














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
                    <Route exact path='/signout/' element={<Logout />}></Route>

                    
                  <Route exact path='*' element={
                    <Box sx={{ display: 'flex' }}>

                    <UpperNavbar handleDrawerOpen={handleDrawerOpen} open={open} />
                    <LeftNavbar handleDrawerClose={handleDrawerClose} open={open} />

                      <Routes>
                          <Route exact path='/' element={<Dashboard open={open} />}></Route>
                          <Route exact path="/admin/users/" element={<UsersData open={open} />} ></Route>
                          <Route exact path="/admin/create-merchant/" element={<MerchantCreateForm open={open} />} ></Route>
                          <Route exact path="/admin/merchant/" element={<MerchantDetails open={open} />} ></Route>
                          <Route exact path="/admin/merchant/details/" element={<MerchantProfile open={open} />} ></Route>
                          <Route exact path="/admin/merchant/payment/update/" element={<MerchantPaymentUpdate open={open} />} ></Route>
                          <Route exact path="/admin/merchant/payment/detail/" element={<MerchantBankDetail open={open} />} ></Route>
                          {/* <Route exact path="/admin/merchant/bank/account/" element={<MerchantBankAccounts open={open} />} ></Route> */}
                          <Route exact path="/admin/merchant-payments/" element={<MerchantPaymentDetails open={open} />} ></Route>
                          <Route exact path="/admin/admin-user/" element={<AdminDetails open={open} />} ></Route>
                          <Route exact path="/admin/create-user/" element={<UserCreateForm open={open} />} ></Route>
                          <Route exact path="/admin/create-admin/" element={<AdminCreateForm open={open} />} ></Route>
                          <Route exact path="/admin/all-transaction/" element={<AllTransactionData open={open} />} ></Route>
                          <Route exact path="/admin/all-transaction/detial/" element={<AllTransactionDetail open={open} />} ></Route>
                          <Route exact path="/admin/deposits/" element={<AllDepositDetail open={open} />} ></Route>
                          <Route exact path="/admin/withdrawls/" element={<Withdrawls open={open} />} ></Route>
                          <Route exact path="/admin/transfers/" element={<TransferDetails open={open} />} ></Route>
                          <Route exact path="/admin/transfers/details/" element={<TransferTransactionDetail open={open} />} ></Route>
                          <Route exact path="/admin/exchanges/" element={<CurrencyExchange open={open} />} ></Route>
                          <Route exact path="/admin/request-payments/" element={<RequestPaymentDetails open={open} />} ></Route>
                          <Route exact path="/admin/crypto-sent-transactions/" element={<CryptoSentDetails open={open} />} ></Route>
                          <Route exact path="/admin/crypto-received-transactions/" element={<CryptoReceivedDetails open={open} />} ></Route>
                          <Route exact path="/admin/deposits/update/" element={<DepositUpdate open={open} />} ></Route>
                          <Route exact path="/admin/withdrawls/update/" element={<WithdrawUpdate open={open} />} ></Route>
                          <Route exact path="/currencies/" element={<CurrencyTable open={open} />} ></Route>
                          <Route exact path="/currencies/add/" element={<AddCurrency open={open} />} ></Route>
                          <Route exact path="/tickets/" element={<TicketTable open={open} />} ></Route>
                          <Route exact path="/tickets/add/" element={<TicketAddForm open={open} />} ></Route>
                          <Route exact path="/tickets/update/" element={<TicketUpdateForm open={open} />} ></Route>
                          <Route exact path="/crypto/" element={<Crypto open={open} />} ></Route>
                          <Route exact path="/crypto/blockio/add/" element={<AddBlockio open={open} />} ></Route>
                          <Route exact path="/crypto/tatumio/add/" element={<AddTatumio open={open} />} ></Route>
                          <Route exact path="/admin/users/details/" element={<Profile open={open} />} ></Route>
                          <Route exact path="/admin/users/transaction/details/" element={<UserTransactionDetail open={open} />} ></Route>
                          {/* <Route exact path="/admin/users/add/" element={<Profile open={open} />} ></Route> */}
                          <Route exact path="/admin/update/" element={<AdminUpdateForm open={open} />} ></Route>
                          <Route exact path="/admin/revenues/" element={<Revenues open={open} />} ></Route>
                          <Route exact path="/admin/dispute/" element={<Dispute open={open} />} ></Route>
                          <Route exact path="/admin/dispute/discussion/" element={<DisputeDiscussion open={open} />} ></Route>
                          <Route exact path="/admin/activitylogs/" element={<ActivityLogData open={open} />} ></Route>
                          
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