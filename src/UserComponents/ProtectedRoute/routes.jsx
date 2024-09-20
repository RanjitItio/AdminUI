import React, { Suspense } from 'react';
import CircularProgress from '@mui/material/CircularProgress';


const UserDashBoard = React.lazy(()=> import('../Dashboard/Dashboard'));
const UsersTable    = React.lazy(()=> import('../Users/Users'));
const UserTabs      = React.lazy(()=> import('../Users/UserTabs'));




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
  ];
};








