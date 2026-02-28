import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebse";
import useToast from "../toast/useToast";
import { Mail, Lock, X } from "lucide-react";
import GoogleAuthButton from "./GoogleAuthButton";
import ForgotPasswordModal from "./ForgotPassword";
import { getCurrentUser } from "../../api/userApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function LoginForm({ open, onClose, openRegister }) {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [openForgot, setOpenForgot] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      // Firebase login
      const res = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUid = res.user.uid;

      // Fetch backend profile (MANUAL HEADER)
      const { data: userProfile } = await api.get("/api/users/me", {
        headers: {
          "X-Firebase-Uid": firebaseUid,
        },
      });

      // Store in Redux
      dispatch(setUser(userProfile));

      console.log("Logged-in user profile:", userProfile);

      toast.success("Login successful");
      onClose();
      navigate("/");
    } catch (err) {
      console.error(err);

      switch (err.code) {
        case "auth/invalid-credential":
          toast.error("Invalid email or password");
          break;
        case "auth/user-disabled":
          toast.error("Account disabled. Contact support");
          break;
        case "auth/too-many-requests":
          toast.warning("Too many attempts. Try again later");
          break;
        default:
          toast.error("Login failed. Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

        <div className="fixed inset-0 flex items-center justify-center px-4">
          <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <Dialog.Title className="text-lg font-semibold">
                Login
              </Dialog.Title>
              <button onClick={onClose}>
                <X size={18} />
              </button>
            </div>

            {/* Google Login */}
            <GoogleAuthButton onClose={onClose} />

            {/* Divider */}
            <div className="flex items-center gap-2 my-4">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-gray-500">OR</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                label="Email"
                icon={Mail}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />

              <Input
                label="Password"
                icon={Lock}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />

              <div className="flex justify-between text-sm">
                <button
                  type="button"
                  onClick={() => setOpenForgot(true)}
                  className="text-blue-600 hover:underline"
                >
                  Forgot password?
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    openRegister();
                  }}
                  className="text-blue-600 hover:underline"
                >
                  Create account
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 py-2 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      <ForgotPasswordModal
        open={openForgot}
        onClose={() => setOpenForgot(false)}
      />
    </>
  );
}

function Input({ label, icon: Icon, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className="relative">
        <Icon
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          {...props}
          className="w-full rounded-xl border border-gray-300 pl-10 pr-3 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}
