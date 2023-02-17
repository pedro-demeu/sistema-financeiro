import { Home } from "@mui/icons-material";
import { Route, useRoutes } from "react-router-dom";
import { Dashboard } from "./pages";
import { ForgotPassword, LoginForm, CreateAccountForm } from "./pages/Account";

export const Routes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <LoginForm />,
    },
    {
      path: "/home",
      element: <Dashboard />,
    },
    {
      path: "/create-account",
      element: <CreateAccountForm />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
  ]);
  return routes;
};
