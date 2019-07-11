import React from "react";
import ReactDOM from "react-dom";

// COMPONENTS
import App from "./App";

// OTHES
import * as serviceWorker from "./serviceWorker";
import { createStore, StoreProvider } from "easy-peasy";

// MODELS
import models from "./models";

// CSS
import "antd/dist/antd.css";
import "./index.css";

const store = createStore(models);

ReactDOM.render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
