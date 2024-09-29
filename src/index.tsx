import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import AppWithRedux from './AppWithRedux';
// import App from './App';
import AppCopyForReducer from "./AppCopyForReducer";
import { Provider } from "react-redux";
import { store } from "./state/store";
import AppWithRedux from "./AppWithRedux";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <AppWithRedux />
  </Provider>
);
