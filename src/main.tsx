import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("BembaTranslate: root element was not found.");
}

const root = ReactDOM.createRoot(rootElement);

/*
 * Keep the professional launch screen visible briefly
 * while the application starts.
 *
 * The launch screen is already inside #root from index.html,
 * so we wait before React replaces it with the real app.
 */
window.setTimeout(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}, 700);
