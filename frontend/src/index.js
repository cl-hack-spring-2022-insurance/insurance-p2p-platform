import React from "react";
import ReactDOM from "react-dom";
//import { Dapp } from "./components/Dapp";
import { App } from "./App";
// We import bootstrap here, but you can remove if you want

import { BrowserRouter as Router } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.css";

// This is the entry point of your application, but it just renders the Dapp
// react component. All of the logic is contained in it.

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
