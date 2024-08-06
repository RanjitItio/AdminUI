import React, {Suspense} from "react";
import { Route, Routes } from 'react-router-dom';
import CssBaseline from "@mui/material/CssBaseline";
import Box from '@mui/material/Box';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import useAuth from '../../Components/ProtectedRoute/authProvider';
import { ProtectedRoute } from "../../Components/ProtectedRoute/protectedroutes";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';



const MainNavbar = React.lazy(()=> import('../../Components/Navbar'))






// All the paths
const AuthRoutes = () => {
    const [open, setOpen] = React.useState(false);

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
              <Suspense fallback={<div>Loading...</div>}>
              <Routes>
       
                  <Route exact path='*' element={
                    <Box sx={{display: {xs: 'block', sm:'block', md:'block', lg:'flex'}}}>
                    <CssBaseline />

                    <MainNavbar handleDrawerClose={handleDrawerClose} handleDrawerOpen={handleDrawerOpen} open={open} />
                      
                      <Routes>
                          
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
            // <Signup />
            <></>
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