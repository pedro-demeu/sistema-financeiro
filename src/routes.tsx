import { createBrowserRouter } from "react-router-dom";
import { TabelaDeFinancas } from "./TabelaDeFinancas";
import { Login } from "./pages";

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
    element: <Login />,
  },
]);
