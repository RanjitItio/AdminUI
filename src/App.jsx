import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "@components/Dashboard";
import UpperNavbar from "@components/UpNavbar";
import LeftNavbar from "@components/LeftNavbar";
import React from "react";
import Box from '@mui/material/Box';
import DataTable from "@components/DataTable";
import UsersData from "@components/Users/users";
import MerchantDetails from "@components/Users/merchant";
import AdminDetails from "@components/Users/Admin";
import UserCreateForm from "@components/Users/userCreateForm";
import MerchantCreateForm from "@components/Users/MerchantCreateForm";
import AdminCreateForm from "@components/Users/AdminCreateForm";
import AllTransactionData from "@components/Transaction/AllTransaction";
import AllDepositDetail from "@components/Transaction/Deposit";
import Withdrawls from "@components/Transaction/Withdrawl";
import TransferDetails from "@components/Transaction/Transfer";
import CurrencyExchange from "@components/Transaction/CurrencyExchange";
import RequestPaymentDetails from "@components/Transaction/RequestPayment";
import MerchantPaymentDetails from "@components/Transaction/MerchantPayment";
import CryptoSentDetails from "@components/Transaction/CryptoSent";
import CryptoReceivedDetails from "@components/Transaction/CryptoReceived";







function App() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (  

    <Router>
      <Routes>
        <Route exact path="/data-table/" element={<DataTable />} ></Route>
        {/* <Route exact path="/user-create/" element={<UserCreateForm />} ></Route> */}

        <Route exact path="*" element={
          <>
            <Box sx={{ display: 'flex' }}>
            <UpperNavbar handleDrawerOpen={handleDrawerOpen} open={open} />
            <LeftNavbar handleDrawerClose={handleDrawerClose} open={open} />

              <Routes>
                <Route exact path="/" element={<Dashboard open={open} />}></Route>
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
          </>
        }>
        </Route>
      </Routes>
    </Router>
  )
}



export default App;
