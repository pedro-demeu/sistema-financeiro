import React, { type ReactElement } from 'react';
import { useRoutes, Outlet } from 'react-router-dom';
import { HomePage, LoginPage, AccountPage, RecoveryPage } from './pages';

export const Routes: React.FC = (): ReactElement => {
  const routes = useRoutes([
    {
      path: '/',
      element: <LoginPage />
    },
    {
      path: '/home',
      element: <HomePage />
    },
    {
      path: '/create-account',
      element: <AccountPage />
    },
    {
      path: '/forgot-password',
      element: <RecoveryPage />
    }
  ]);
  return (
    <>
      {routes}
      <Outlet />
    </>
  );
};
