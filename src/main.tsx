import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { I18nProvider } from "./i18n/I18nProvider";
import { bootLocale } from "./i18n/runtime";
import "./index.css";

// Resolve the language before the first render, so the page never paints in
// the wrong one and then flips.
const initialLocale = bootLocale();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <I18nProvider initialLocale={initialLocale}>
      <App />
    </I18nProvider>
  </React.StrictMode>
);
