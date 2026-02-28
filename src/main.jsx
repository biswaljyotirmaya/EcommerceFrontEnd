import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";
import "./index.css";
import { ToastProvider } from "./components/toast/ToastContext";
import AuthListener from "./components/auth/AuthListener";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ToastProvider>
          <AuthListener>
            <App />
          </AuthListener>
        </ToastProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
