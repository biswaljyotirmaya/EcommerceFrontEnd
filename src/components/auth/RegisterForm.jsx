import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebse";
import { onboardUser } from "../../api/userApi";
import useToast from "../toast/useToast";
import { Mail, Lock, User, Phone, MapPin, X, Store } from "lucide-react";

export default function RegisterForm({ open, onClose, prefill = {} }) {
  const toast = useToast();

  const [role, setRole] = useState("CONSUMER");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: prefill.name || "",
    email: prefill.email || "",
    password: "",
    confirmPassword: "",
    mobile: "",
    address: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword, mobile, address } = form;

    if (!name || !email || !address) {
      toast.error("Please fill all required fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      //  Firebase registration
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const firebaseUid = res.user.uid;

      // Backend onboarding
      await onboardUser({
        firebaseUid,
        email,
        name,
        mobile,
        address,
        role,
      });

      toast.success(
        role === "VENDOR"
          ? "Vendor registered successfully "
          : "Consumer registered successfully ",
      );
      console.log("Registered user :", res.user);
      console.log("Registered with role:", role);
      onClose(); // user stays logged in
    } catch (err) {
      console.error(err);

      switch (err.code) {
        case "auth/email-already-in-use":
          toast.error("Email already registered");
          break;
        case "auth/weak-password":
          toast.error("Password is too weak");
          break;
        default:
          toast.error("Registration failed. Please try again");
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
              Create Account
            </Dialog.Title>
            <button onClick={onClose}>
              <X size={18} />
            </button>
          </div>

          <div className="flex gap-2 mb-4">
            <RoleButton
              active={role === "CONSUMER"}
              onClick={() => setRole("CONSUMER")}
              label="Consumer"
            />
            <RoleButton
              active={role === "VENDOR"}
              onClick={() => setRole("VENDOR")}
              label="Vendor"
              icon={Store}
            />
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <Input
              label="Full Name"
              icon={User}
              name="name"
              value={form.name}
              onChange={handleChange}
            />
            <Input
              label="Email"
              icon={Mail}
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              disabled={!!prefill.email}
            />
            <Input
              label="Password"
              icon={Lock}
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
            />
            <Input
              label="Confirm Password"
              icon={Lock}
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
            />
            <Input
              label="Mobile"
              icon={Phone}
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
            />
            <Input
              label="Address"
              icon={MapPin}
              name="address"
              value={form.address}
              onChange={handleChange}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 py-2 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

function RoleButton({ active, onClick, label, icon: Icon }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 rounded-xl border px-3 py-2 text-sm font-medium transition
        ${active ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"}
      `}
    >
      {Icon && <Icon size={16} className="inline mr-1" />}
      {label}
    </button>
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
          className="w-full rounded-xl border pl-10 pr-3 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}
