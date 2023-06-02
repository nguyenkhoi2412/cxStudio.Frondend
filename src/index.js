import './style.css';
import React from "react";
import { createRoot } from "react-dom/client";
import "@assets/locales/i18n";
import storeProvider from "@reduxproviders/_storeProvider";
import { Provider } from "react-redux";
import App from "@app";
import * as serviceWorker from "./serviceWorkerRegistration";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const app = (
  <React.Fragment>
    {/* Redux store */}
    <Provider store={storeProvider}>
      <App />
    </Provider>
  </React.Fragment>
);

root.render(app);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
