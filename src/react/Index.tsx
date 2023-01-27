import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/App";

const rootElement = document.getElementById("root");
if (!rootElement) throw Error("Could not find root element of 'index.html'");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
