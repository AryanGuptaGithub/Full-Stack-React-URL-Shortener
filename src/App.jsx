import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import AuthPage from './pages/AuthPage'
import Redirect_Link from './pages/Redirect_Link'
import Link from './pages/Link'
import UrlProvider from './context'
import { Toaster } from "react-hot-toast";
import RequireAuth from './components/RequireAuth'

const router = createBrowserRouter([
  {
    element:<AppLayout />,
    children: [
      {
        path:'/',
        element: <LandingPage />
      },
      {
        path:'/dashboard',
        element: <RequireAuth> <Dashboard /> </RequireAuth>
      },
      {
        path:'/auth',
        element:  <AuthPage />
      },
      {
        path:'/link/:id',
        element: <RequireAuth><Link /></RequireAuth>
      },
      {
        path:'/:id',
        element: <Redirect_Link />
      },
    ]
  }
])

const App = () => {
  return (
    <>
    <UrlProvider>
    <RouterProvider router={router} />
    </UrlProvider>
    <Toaster position="top-right" />
    </>
  )
}

export default App