import { createContext, useContext, useState } from "react";
import  ToastContainer  from "./ToastContainer.jsx";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const showToast = ({ type = "info", title, message, duration = 3000 }) => {
    const id = crypto.randomUUID();

    setToasts((prev) => [...prev, { id, type, title, message }]);

    setTimeout(() => removeToast(id), duration);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

export const useToastContext = () => useContext(ToastContext);
