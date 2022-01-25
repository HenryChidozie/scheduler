//App entry point

import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "index.scss";

import Application from "components/Application";

axios.defaults.baseURL = `${new URL (
  process.env.REACT_APP_BASE_URL || window.location
).origin}/api`;


ReactDOM.render(<Application />, document.getElementById("root"));


