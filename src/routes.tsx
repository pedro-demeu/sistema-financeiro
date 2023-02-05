import { createBrowserRouter } from "react-router-dom";
import { TabelaDeFinancas } from "./TabelaDeFinancas";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/dashboard",
    element: <TabelaDeFinancas />,
  },
]);
