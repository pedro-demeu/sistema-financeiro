import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "./routes";
import { AppContainer } from "./components";
import { RecoilRoot } from "recoil";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline />
    <RecoilRoot>
      <AppContainer>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </AppContainer>
    </RecoilRoot>
  </React.StrictMode>
);
