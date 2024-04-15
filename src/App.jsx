import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import UpperNavbar from "./Components/UpNavbar";
import LeftNavbar from "./Components/LeftNavbar";
import React from "react";
import Box from '@mui/material/Box';
import DataTable from "./Components/DataTable";
import UsersData from "./Components/Users/users";
import MerchantDetails from "./Components/Users/merchant";
import AdminDetails from "./Components/Users/Admin";
import UserCreateForm from "./Components/Users/userCreateForm";
import MerchantCreateForm from "./Components/Users/MerchantCreateForm";
import AdminCreateForm from "./Components/Users/AdminCreateForm";
import AllTransactionData from "./Components/Transaction/AllTransaction";
import AllDepositDetail from "./Components/Transaction/Deposit";
import Withdrawls from "./Components/Transaction/Withdrawl";
import TransferDetails from "./Components/Transaction/Transfer";
import CurrencyExchange from "./Components/Transaction/CurrencyExchange";
import RequestPaymentDetails from "./Components/Transaction/RequestPayment";
import MerchantPaymentDetails from "./Components/Transaction/MerchantPayment";





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
