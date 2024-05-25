import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";
import { CacheProvider, ThemeProvider } from "@emotion/react";
import Theme from "./utils/theme.ts";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import RoutesNavigation from "./routes/index.tsx";
import Layout from "./layout/index.tsx";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { Api } from "./api/base.tsx";
import { AuthContextProvider } from "./context/index.tsx";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <BrowserRouter>
          <ApiProvider api={Api}>
            <AuthContextProvider>
              <RoutesNavigation>
                <App />
              </RoutesNavigation>
            </AuthContextProvider>
          </ApiProvider>
        </BrowserRouter>
      </ThemeProvider>
    </CacheProvider>
  </React.StrictMode>
);
