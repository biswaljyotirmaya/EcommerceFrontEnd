import { CheckCircle, XCircle, Info, AlertTriangle, X } from "lucide-react";

const styles = {
  success: {
    icon: CheckCircle,
    bg: "bg-green-50",
    text: "text-green-700",
  },
  error: {
    icon: XCircle,
    bg: "bg-red-50",
    text: "text-red-700",
  },
  info: {
    icon: Info,
    bg: "bg-blue-50",
    text: "text-blue-700",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-yellow-50",
    text: "text-yellow-800",
  },
};

export default function Toast({ type, title, message, onClose }) {
  const { icon: Icon, bg, text } = styles[type] || styles.info;

  return (
    <div
      className={`flex items-start gap-3 rounded-xl border p-4 shadow-lg ${bg} ${text} animate-slideIn`}
    >
      <Icon size={20} />

      <div className="flex-1">
        {title && <p className="font-semibold text-sm">{title}</p>}
        {message && <p className="text-sm">{message}</p>}
      </div>

      <button onClick={onClose}>
        <X size={16} />
      </button>
    </div>
  );
}
