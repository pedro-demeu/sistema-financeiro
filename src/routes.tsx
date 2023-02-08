import { createBrowserRouter } from "react-router-dom";
import { TabelaDeFinancas } from "./TabelaDeFinancas";
import { ForgotPassword, LoginForm, CreateAccountForm } from "./pages/Account";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/dashboard",
    element: <TabelaDeFinancas />,
  },
  {
    path: "/login",
    element: <LoginForm />,
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
