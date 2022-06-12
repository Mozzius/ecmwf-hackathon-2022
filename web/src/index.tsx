import React from "react";
import ReactDOM from "react-dom/client";
import { SWRConfig } from "swr";

import WindHistiry from "./WindHistory";
import "./index.css";

import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <SWRConfig
      value={{
        fetcher: (url) => fetch(url).then((res) => res.json()),
      }}
    >
      <WindHistiry />
    </SWRConfig>
  </React.StrictMode>
);
