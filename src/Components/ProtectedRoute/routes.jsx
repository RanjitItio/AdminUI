import React, {Suspense, useEffect} from "react";
import { Route, Routes } from 'react-router-dom';
import CssBaseline from "@mui/material/CssBaseline"; /// Donot remove this component
import Box from '@mui/material/Box';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "./authProvider";
import { ProtectedRoute } from "./protectedroutes";
import { AdditionalAuthenticatedRoutes } from "../../UserComponents/ProtectedRoute/routes";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
// import Signup from '../Authentication/Signup';
// import Signin from '../Authentication/Signin';
// import UpperNavbar from '../UpNavbar';
// import LeftNavbar from  '../LeftNavbar';
// import Dashboard from "../Dashboard";
// import UsersData from '../Users/users';
// import MerchantDetails from '../Merchant/merchant';
// import AdminDetails from '../Users/Admin';
// import UserCreateForm from '../Users/userCreateForm';
// import MerchantCreateForm from '../Merchant/MerchantCreateForm';
// import AdminCreateForm from '../Users/AdminCreateForm';
// import AllTransactionData from '../Transaction/AllTransaction';
// import AllDepositDetail from '../Transaction/Deposit';
// import Withdrawls from '../Transaction/Withdrawl';
// import TransferDetails from '../Transaction/Transfer';
// import CurrencyExchange from '../Transaction/CurrencyExchange';
// import RequestPaymentDetails from '../Transaction/RequestPayment';
// import MerchantPaymentDetails from '../MerchantTransactions/merchantPayment.jsx';
// import CryptoSentDetails from  '../Transaction/CryptoSent';
// import CryptoReceivedDetails from '../Transaction/CryptoReceived';
// import Logout from '../Authentication/Logout';
// import DepositUpdate from "../Transaction/DepositUpdate";
// import WithdrawUpdate from "../Transaction/WithdrawUpdate";
// import CurrencyTable from "../Currency/Currency";
// import AddCurrency from "../Currency/AddCurrency";
// import TicketTable from "../Ticket/Ticket";
// import Crypto from "../Crypto/Crypto";
// import AddBlockio from "../Crypto/AddFormBlockio";
// import AddTatumio from "../Crypto/AddFormTatumio";
// import Profile from "../Users/profileedit.jsx";
// import UserTransactionDetail from '../Users/UserTransactionDetails.jsx';
// import AdminUpdateForm from '../Users/AdminUpdateForm.jsx';
// import Revenues from '../Revenues/Revenues.jsx';
// import Dispute from '../Dispute/Dispute.jsx';
// import DisputeDiscussion from '../Dispute/DisputeDiscussion.jsx';
// import AllTransactionDetail from '../Transaction/AllTransactionDetails.jsx';
// import TicketAddForm from '../Ticket/TicketAdd.jsx';
// import TicketUpdateForm from '../Ticket/TicketUpdate.jsx';
// import ActivityLogData from '../ActivityLog/ActivityLog.jsx';
// import TransferTransactionDetail from '../Transaction/TransferDetails.jsx';
// import MerchantProfile from '../Merchant/MerchantProfile.jsx';
// import MerchantPaymentUpdate from '../MerchantTransactions/paymentUpdate.jsx';
// import MerchantBankDetail from '../Users/Bank/BankDetails.jsx';
// import Allpipe from '../Pipe/Allpipe.jsx';
// import AddNewPipe from '../Pipe/AddPipe.jsx';
// import UpdatePipe from '../Pipe/updatePipe.jsx';
// import AllMerchantPGTransactions from '../MerchantPGTransactions/AllTransactions.jsx';
// import MerchantPGTransactionUpdate from '../MerchantPGTransactions/TransactionUpdate.jsx';



import CircularProgress from '@mui/joy/CircularProgress';
const Signup = React.lazy(()=> import('../Authentication/Signup'))
const Signin = React.lazy(()=> import('../Authentication/Signin'))
const Dashboard = React.lazy(()=> import('../Dashboard/Dashboard'));
const UsersData = React.lazy(()=> import('../Users/users'))
const MerchantDetails = React.lazy(()=> import('../Merchant/merchant'))
const AdminDetails = React.lazy(()=> import('../Users/Admin'))
const UserCreateForm = React.lazy(()=> import('../Users/userCreateForm'))
const MerchantCreateForm = React.lazy(()=> import('../Merchant/MerchantCreateForm'))
const AdminCreateForm = React.lazy(()=> import('../Users/AdminCreateForm'))
const AllTransactionData = React.lazy(()=> import('../Transaction/AllTransaction'))
const AllDepositDetail = React.lazy(()=> import('../Transaction/Deposit'))
const Withdrawls = React.lazy(()=> import('../Transaction/Withdrawl'))
const TransferDetails = React.lazy(()=> import('../Transaction/Transfer'))
const CurrencyExchange = React.lazy(()=> import('../Transaction/CurrencyExchange'))
const RequestPaymentDetails = React.lazy(()=> import('../Transaction/RequestPayment'))
const MerchantPaymentDetails = React.lazy(()=> import('../MerchantTransactions/merchantPayment'))
const CryptoSentDetails = React.lazy(()=> import('../Transaction/CryptoSent'))
const CryptoReceivedDetails = React.lazy(()=> import('../Transaction/CryptoReceived'))
const Logout = React.lazy(()=> import('../Authentication/Logout'))
const DepositUpdate = React.lazy(()=> import('../Transaction/DepositUpdate'))
const WithdrawUpdate = React.lazy(()=> import('../Transaction/WithdrawUpdate'))
const CurrencyTable = React.lazy(()=> import('../Currency/Currency'))
const AddCurrency = React.lazy(()=> import('../Currency/AddCurrency'))
const TicketTable = React.lazy(()=> import('../Ticket/Ticket'))
const Crypto = React.lazy(()=> import('../Crypto/Crypto'))
const AddBlockio = React.lazy(()=> import('../Crypto/AddFormBlockio'))
const AddTatumio = React.lazy(()=> import('../Crypto/AddFormTatumio'))
const Profile = React.lazy(()=> import('../Users/profileedit'))
const UserTransactionDetail = React.lazy(()=> import('../Users/UserTransactionDetails'))
const AdminUpdateForm = React.lazy(()=> import('../Users/AdminUpdateForm'))
const Revenues = React.lazy(()=> import('../Revenues/Revenues'))
const Dispute = React.lazy(()=> import('../Dispute/Dispute'))
const DisputeDiscussion = React.lazy(()=> import('../Dispute/DisputeDiscussion'))
const AllTransactionDetail = React.lazy(()=> import('../Transaction/AllTransactionDetails'))
const TicketAddForm = React.lazy(()=> import('../Ticket/TicketAdd'))
const TicketUpdateForm = React.lazy(()=> import('../Ticket/TicketUpdate'))
const ActivityLogData = React.lazy(()=> import('../ActivityLog/ActivityLog'))
const TransferTransactionDetail = React.lazy(()=> import('../Transaction/TransferDetails'))
const MerchantProfile = React.lazy(()=> import('../Merchant/MerchantProfile'))
const MerchantPaymentUpdate = React.lazy(()=> import('../MerchantTransactions/paymentUpdate'))
const MerchantBankDetail = React.lazy(()=> import('../Users/Bank/BankDetails'));
const AddNewPipe = React.lazy(()=> import('../Pipe/AddPipe'));
const UpdatePipe = React.lazy(()=> import('../Pipe/updatePipe'));
const AllMerchantPGTransactions = React.lazy(()=> import('../MerchantPGTransactions/AllTransactions'))
const MerchantPGTransactionUpdate = React.lazy(()=> import('../MerchantPGTransactions/TransactionUpdate'))
const MainNavbar = React.lazy(()=> import('../Navbar'))
const AllMerchantPGWithdrawals = React.lazy(()=> import('../Withdrawals/AllWithdrawals'))
const UpdateMerchantWithdrawals = React.lazy(()=> import('../Withdrawals/UpdateWithdrawal'));
const MerchantRefunds = React.lazy(()=> import('../Refunds/AllRefunds'));
const UpdateMerchantRefund = React.lazy(()=> import('../Refunds/updateRefunds'));
const MerchantBusinessTable = React.lazy(()=> import('../Business/BusinessTable'));
const AllPipeTable = React.lazy(()=> import('../Pipe/PipeTable'));









// All the paths
const AuthRoutes = () => {
    const [open, setOpen] = React.useState(false);
    const additionalAuthenticatedRoutes = AdditionalAuthenticatedRoutes(open);

    // Set the Leftbar open for large screen
    useEffect(() => {
      const setBar = ()=> {
        if (window.matchMedia('(min-width: 768px)').matches) {
          setOpen(true)
        } else {
          setOpen(false)
        };
    };
  
    setBar();
    // Adding event listener for window resize to handle dynamic resizing
    window.addEventListener('resize', setBar);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', setBar);
    };
    
    }, []);
    

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
      // ...additionalAuthenticatedRoutes,
      {
        path: "*",
        element: <ProtectedRoute />, 
        children: [
          {
            path: "*",
            element: (
              <Suspense fallback={<CircularProgress />}>
              <Routes>
                    <Route exact path='/signup/' element={<Signup />}></Route>
                    <Route exact path='/signin/' element={<Signin />}></Route>
                    <Route exact path='/signout/' element={<Logout />}></Route>
                    
                  <Route exact path='*' element={
                    <Box sx={{display: {xs: 'block', sm:'block', md:'block', lg:'flex'}}}>
                    <CssBaseline />

                
                    <MainNavbar handleDrawerClose={handleDrawerClose} handleDrawerOpen={handleDrawerOpen} open={open} />

                      
                      <Routes>
                          {additionalAuthenticatedRoutes.map((route, index) => (
                            <Route 
                                key={index} 
                                path={route.path} 
                                element={React.cloneElement(route.element, { open })}
                                />
                          ))}
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

                          {/* Transactions */}
                          <Route exact path="/admin/all/uat/transaction/" element={<AllTransactionData open={open} />} ></Route>
                          <Route exact path="/admin/all-transaction/" element={<AllMerchantPGTransactions open={open} />} ></Route>
                          <Route exact path="/admin/update/merchant/pg/transactions/" element={<MerchantPGTransactionUpdate open={open} />} ></Route>

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

                          {/* Pipe Paths */}
                          <Route exact path="/admin/pipes/" element={<AllPipeTable open={open} />} ></Route>
                          <Route exact path="/admin/add/pipe/" element={<AddNewPipe open={open} />} ></Route>
                          <Route exact path="/admin/update/pipe/" element={<UpdatePipe open={open} />} ></Route>

                          {/* Withdrawals */}
                          <Route exact path="/admin/merchant/withdrawals/" element={<AllMerchantPGWithdrawals open={open} />} ></Route>
                          <Route exact path="/admin/merchant/update/withdrawals/" element={<UpdateMerchantWithdrawals open={open} />} ></Route>
                          
                          
                          {/* Refunds */}
                          <Route exact path="/admin/merchant/refunds/" element={<MerchantRefunds open={open} />} ></Route>
                          <Route exact path="/admin/merchant/update/refunds/" element={<UpdateMerchantRefund open={open} />} ></Route>

                          {/* Business */}
                          <Route exact path="/admin/merchant/businesses/" element={<MerchantBusinessTable open={open} />} ></Route>
                      </Routes>
                    
                    </Box>

                  }></Route>
                </Routes>
                </Suspense>
            ),
          },
        ],
      },
    ];
  

    const routesForNotAuthenticatedOnly = [
      {
        path: "/signup/",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Signup />
          </Suspense>
      ),
      },
      {
        path: "/signin/",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
              <Signin />
          </Suspense>
        ),
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