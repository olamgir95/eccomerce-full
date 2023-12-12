import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import CssBaseline from "@mui/material/CssBaseline";
import Routers from "./root";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import theme from "./app/MaterialTheme";
import { persistor, store } from "./redux/store";
import "./index.css";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <PersistGate loading={null} persistor={persistor}>
            <Routers />
          </PersistGate>
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  </React.StrictMode>
);
