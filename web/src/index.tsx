import React from "react";
import ReactDOM from "react-dom/client";
import { SWRConfig } from "swr";

import App from "./App";
import "./index.css";

import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <SWRConfig
      value={{
        fetcher: (url) => {
          fetch(`http://localhost:8080${url}`).then((res) => res.json());
        },
      }}
    >
      <App />
    </SWRConfig>
  </React.StrictMode>
);
