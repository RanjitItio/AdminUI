import React, { Suspense } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const UserDashBoard = React.lazy(()=> import('../Dashboard/Dashboard'))



export const AdditionalAuthenticatedRoutes = (open)=> {

  return [
    {
      path: '/user/dashboard/',
      element: (
        <Suspense fallback={<CircularProgress />}>
            <UserDashBoard open={open} />
        </Suspense>
      )
    }
  ];
};








