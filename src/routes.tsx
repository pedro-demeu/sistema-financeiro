import React, { type ReactElement } from 'react'
import { useRoutes, Outlet } from 'react-router-dom'
import { Dashboard } from './pages'
import { ForgotPassword, LoginForm, CreateAccountForm } from './pages/Account'

export const Routes: React.FC = (): ReactElement => {
  const routes = useRoutes([
    {
      path: '/',
      element: <LoginForm />
    },
    {
      path: '/home',
      element: <Dashboard />
    },
    {
      path: '/create-account',
      element: <CreateAccountForm />
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />
    }
  ])
  return (
    <>
      {routes}
      <Outlet />
    </>
  )
}
