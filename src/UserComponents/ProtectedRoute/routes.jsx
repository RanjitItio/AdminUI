import React, { Suspense } from 'react';
import CircularProgress from '@mui/material/CircularProgress';


const UserDashBoard              = React.lazy(()=> import('../Dashboard/Dashboard'));
const UsersTable                 = React.lazy(()=> import('../Users/Users'));
const UserTabs                   = React.lazy(()=> import('../Users/UserTabs'));
const AllDeposites               = React.lazy(()=> import('../Deposit/AllDeposits'));
const UpdateDepositTransaction   = React.lazy(()=> import('../Deposit/UpdateDeposit'));
const AllTransferTransactions    = React.lazy(()=> import('../Transfer/AllTransfers'));
const UpdateTransferTransaction  = React.lazy(()=> import('../Transfer/UpdateTransfer'));
const AllFiatTransactions        = React.lazy(()=> import('../FiatTransactions/AllTransactions'));
const FiatWithdrawals            = React.lazy(()=> import('../Withdrawals/AllWithdrawals'));
const UpdateFIATWithdrawals      = React.lazy(()=> import('../Withdrawals/UpdateWithdrawal'));
const AllExchangeMoneyRequest    = React.lazy(()=> import('../ExchangeMoney/ExchangeMoney'));
const UpdateExchangeMoneyRequest = React.lazy(()=> import('../ExchangeMoney/UpdateExchangeMoney'));
const UserWalletRequests         = React.lazy(()=> import('../CryptoWallet/WalletRequests'));
const UpdateCryptoWallet         = React.lazy(()=> import('../CryptoWallet/UpdateWallet'));
const AllCryptoTransactions      = React.lazy(()=> import('../CryptoTransactions/AllTransactions'));
const UpdateCryptoTransaction    = React.lazy(()=> import('../CryptoTransactions/UpdateTransactions'));
const AllCryptoSwapTransaction   = React.lazy(()=> import('../CryptoSwap/AllSwap'));
const AdminupdateCryptoSwap      = React.lazy(()=> import('../CryptoSwap/UpdateSwap'));
const AllCryptoExchangeTable     = React.lazy(()=> import('../CryptoExchange/AllCryptoExchanges'));
const AdminUpdateCryptoExchange  = React.lazy(()=> import('../CryptoExchange/UpdateCryptoExchange'));




/// Routs for Crypto and FIAT
export const AdditionalAuthenticatedRoutes = (open)=> {

  return [
    {
      path: '/user/dashboard/',
      element: (
        <Suspense fallback={<CircularProgress />}>
            <UserDashBoard open={open} />
        </Suspense>
      )
    },
    {
      path: '/admin/users/data/',
      element: (
        <Suspense fallback={<CircularProgress />}>
            <UsersTable open={open} />
        </Suspense>
      )
    },
    {
      path: '/admin/users/data/update/',
      element: (
        <Suspense fallback={<CircularProgress />}>
            <UserTabs open={open} />
        </Suspense>
      )
    },
    {
      path: '/admin/deposits/',
      element: (
        <Suspense fallback={<CircularProgress />}>
            <AllDeposites open={open} />
        </Suspense>
      )
    },
    {
      path: '/admin/deposits/update/',
      element: (
        <Suspense fallback={<CircularProgress />}>
            <UpdateDepositTransaction open={open} />
        </Suspense>
      )
    },
    {
      path: '/admin/transfers/',
      element: (
        <Suspense fallback={<CircularProgress />}>
            <AllTransferTransactions open={open} />
        </Suspense>
      )
    },
    {
      path: '/admin/transfers/details/',
      element: (
        <Suspense fallback={<CircularProgress />}>
            <UpdateTransferTransaction open={open} />
        </Suspense>
      )
    },
    {
      path: '/admin/fiat/transactions/',
      element: (
        <Suspense fallback={<CircularProgress />}>
            <AllFiatTransactions open={open} />
        </Suspense>
      )
    },
    {
      path: '/admin/withdrawls/',
      element: (
        <Suspense fallback={<CircularProgress />}>
            <FiatWithdrawals open={open} />
        </Suspense>
      )
    },
    {
      path: '/admin/withdrawls/update/',
      element: (
        <Suspense fallback={<CircularProgress />}>
            <UpdateFIATWithdrawals open={open} />
        </Suspense>
      )
    },
    {
      path: '/admin/all/exchange/money/',
      element: (
        <Suspense fallback={<CircularProgress />}>
            <AllExchangeMoneyRequest open={open} />
        </Suspense>
      )
    },
    {
      path: '/admin/update/exchange/money/',
      element: (
        <Suspense fallback={<CircularProgress />}>
            <UpdateExchangeMoneyRequest open={open} />
        </Suspense>
      )
    },
    {
      path: '/admin/user/wallets/',
      element: (
        <Suspense fallback={<CircularProgress />}>
            <UserWalletRequests open={open} />
        </Suspense>
      )
    },
    {
      path: '/admin/user/update/crypto/wallets/',
      element: (
        <Suspense fallback={<CircularProgress />}>
            <UpdateCryptoWallet open={open} />
        </Suspense>
      )
    },
    {
      path: '/admin/user/crypto/transactions/',
      element: (
        <Suspense fallback={<CircularProgress />}>
            <AllCryptoTransactions open={open} />
        </Suspense>
      )
    },
    {
      path: '/admin/user/update/crypto/transactions/',
      element: (
        <Suspense fallback={<CircularProgress />}>
            <UpdateCryptoTransaction open={open} />
        </Suspense>
      )
    },
    {
      path: '/admin/user/crypto/swap/',
      element: (
        <Suspense fallback={<CircularProgress />}>
            <AllCryptoSwapTransaction open={open} />
        </Suspense>
      )
    },
    {
      path: '/admin/user/update/crypto/swap/',
      element: (
        <Suspense fallback={<CircularProgress />}>
            <AdminupdateCryptoSwap open={open} />
        </Suspense>
      )
    },
    {
      path: '/admin/user/crypto/exchange/',
      element: (
        <Suspense fallback={<CircularProgress />}>
            <AllCryptoExchangeTable open={open} />
        </Suspense>
      )
    },
    {
      path: '/admin/user/update/crypto/exchange/',
      element: (
        <Suspense fallback={<CircularProgress />}>
            <AdminUpdateCryptoExchange open={open} />
        </Suspense>
      )
    },
  ];
};








