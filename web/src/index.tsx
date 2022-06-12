import React from "react";
import ReactDOM from "react-dom/client";
import { SWRConfig } from "swr";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

import "bootstrap/dist/css/bootstrap.min.css";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <SWRConfig value={{ fetcher }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SWRConfig>
  </React.StrictMode>
);
