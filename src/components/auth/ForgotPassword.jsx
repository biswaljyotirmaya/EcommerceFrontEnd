import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../config/firebse";
import useToast from "../toast/useToast";
import { Mail, X } from "lucide-react";

export default function ForgotPasswordModal({ open, onClose }) {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your registered email");
      return;
    }

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      toast.info("Password reset link sent to your email 📩");
      onClose();
    } catch (err) {
      console.error(err);

      if (err.code === "auth/user-not-found") {
        toast.error("No account found with this email");
      } else {
        toast.error("Unable to send reset email");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="fixed inset-0 flex items-center justify-center px-4">
        <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl animate-slideIn">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-lg font-semibold">
              Forgot Password
            </Dialog.Title>

            <button onClick={onClose}>
              <X size={18} className="text-gray-500 hover:text-gray-700" />
            </button>
          </div>

          <p className="text-sm text-gray-600 mb-6">
            Enter your registered email address. We’ll send you a link to reset
            your password.
          </p>

          <form onSubmit={handleReset} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Email address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-gray-300 pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 py-2 text-white font-medium hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
