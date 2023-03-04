import React, { type ReactElement } from 'react';
import { useRoutes, Outlet } from 'react-router-dom';
import { HomePage, LoginPage, AccountPage } from './pages';

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
    }
  ]);
  return (
    <>
      {routes}
      <Outlet />
    </>
  );
};
