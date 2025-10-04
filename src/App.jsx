import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import AuthPage from './pages/AuthPage'
import Redirect_Link from './pages/Redirect_Link'
import Link from './pages/Link'
import UrlProvider from './context'

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
        element: <Dashboard />
      },
      {
        path:'/auth',
        element: <AuthPage />
      },
      {
        path:'/link/:id',
        element: <Link />
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
    <UrlProvider>
    <RouterProvider router={router} />
    </UrlProvider>
    
  )
}

export default App