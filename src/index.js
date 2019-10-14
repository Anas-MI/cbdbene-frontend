import "core-js/es/string";
import "core-js/es/array";
import "core-js/es/object";
import "react-app-polyfill/ie11";
import "./Global";
import React from "react";
import ReactDOM from "react-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./configureStore";

import "./index.css";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

const persistantStore = store();

ReactDOM.render(
  <Provider store={persistantStore.store}>
    <PersistGate loading={null} persistor={persistantStore.persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
