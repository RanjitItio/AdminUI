import AuthProvider from "./Components/ProtectedRoute/authProvider";
import AuthRoutes from "./Components/ProtectedRoute/routes";







function App() {
  

  return (  
        <AuthProvider>
            <AuthRoutes />
        </AuthProvider>
  )
};



export default App;





// <Router>
//       <Routes>
//         <Route exact path="/data-table/" element={<DataTable />} ></Route>
//         {/* <Route exact path="/user-create/" element={<UserCreateForm />} ></Route> */}

//         <Route exact path="*" element={
//           <>
//             <Box sx={{ display: 'flex' }}>
//             <UpperNavbar handleDrawerOpen={handleDrawerOpen} open={open} />
//             <LeftNavbar handleDrawerClose={handleDrawerClose} open={open} />

//               <Routes>
//                 <Route exact path="/" element={<Dashboard open={open} />}></Route>
//                 <Route exact path="/admin/users/" element={<UsersData open={open} />} ></Route>
//                 <Route exact path="/admin/merchant/" element={<MerchantDetails open={open} />} ></Route>
//                 <Route exact path="/admin/admin-user/" element={<AdminDetails open={open} />} ></Route>
//                 <Route exact path="/admin/create-user/" element={<UserCreateForm open={open} />} ></Route>
//                 <Route exact path="/admin/create-merchant/" element={<MerchantCreateForm open={open} />} ></Route>
//                 <Route exact path="/admin/create-admin/" element={<AdminCreateForm open={open} />} ></Route>
//                 <Route exact path="/admin/all-transaction/" element={<AllTransactionData open={open} />} ></Route>
//                 <Route exact path="/admin/deposits/" element={<AllDepositDetail open={open} />} ></Route>
//                 <Route exact path="/admin/withdrawls/" element={<Withdrawls open={open} />} ></Route>
//                 <Route exact path="/admin/transfers/" element={<TransferDetails open={open} />} ></Route>
//                 <Route exact path="/admin/exchanges/" element={<CurrencyExchange open={open} />} ></Route>
//                 <Route exact path="/admin/request-payments/" element={<RequestPaymentDetails open={open} />} ></Route>

//                 <Route exact path="/admin/merchant-payments/" element={<MerchantPaymentDetails open={open} />} ></Route>
//                 <Route exact path="/admin/crypto-sent-transactions/" element={<CryptoSentDetails open={open} />} ></Route>
//                 <Route exact path="/admin/crypto-received-transactions/" element={<CryptoReceivedDetails open={open} />} ></Route>
//                 <Route exact path="/signup/" element={<Signup open={open} />} ></Route>
//                 <Route exact path="/signin/" element={<Signin open={open} />} ></Route>
//               </Routes>

//             </Box>
//           </>
//         }>
//         </Route>
//       </Routes>
//     </Router>
