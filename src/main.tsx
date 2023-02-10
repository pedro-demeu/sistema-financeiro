import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { AppContainer } from "./components";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline />
    <AppContainer>
      <RouterProvider router={routes} />
    </AppContainer>
  </React.StrictMode>
);
