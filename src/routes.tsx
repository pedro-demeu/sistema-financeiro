import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "./pages";
import { ForgotPassword, LoginForm, CreateAccountForm } from "./pages/Account";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/dashboard",
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
