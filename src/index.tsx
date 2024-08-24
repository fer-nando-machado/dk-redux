import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";

window.onload = () => {
  if (process.env.NODE_ENV === "production") {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "object") {
      for (let [key, value] of Object.entries(__REACT_DEVTOOLS_GLOBAL_HOOK__)) {
        __REACT_DEVTOOLS_GLOBAL_HOOK__[key] =
          typeof value === "function" ? () => {} : null;
      }
    }
  }

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};
