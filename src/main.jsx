import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Root';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';
import {
 
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Dashboard from './pages/Dashboard/Dashboard';

const queryClient = new QueryClient()


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    
  },
  {
    path: "dashboard",
    element: <Dashboard/>
  },
  {
    path: "signUP",
    element: <SignUp/>
  },
  {
    path: "signIn",
    element: <SignIn/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
   </QueryClientProvider>
  </React.StrictMode>,
)
