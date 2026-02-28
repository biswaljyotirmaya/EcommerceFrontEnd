import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import useToast from "../toast/useToast";
import { generateOtp, storeOtp, verifyOtp } from "../../utils/otpUtil";

export default function OtpModal({ open, onClose, onVerified }) {
  const toast = useToast();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    const otp = generateOtp();
    storeOtp(otp);

    console.log("OTP: ", otp);
    toast.success("OTP sent to your registered email 📧");
  }, [open]);

  const handleVerify = () => {
    if (!otp) {
      toast.warning("Please enter the OTP");
      return;
    }

    setLoading(true);

    const valid = verifyOtp(otp);

    setTimeout(() => {
      setLoading(false);

      if (!valid) {
        toast.error("Invalid or expired OTP");
        return;
      }

      console.log("OTP verified successfully");
      toast.success("Order confirmed successfully 🎉");

      onVerified();
      onClose();
    }, 600);
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="fixed inset-0 flex items-center justify-center px-4">
        <Dialog.Panel className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
          <Dialog.Title className="text-lg font-semibold mb-2">
            Verify OTP
          </Dialog.Title>

          <p className="text-sm text-gray-500 mb-4">
            Please enter the OTP sent to your registered email address.
          </p>

          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 6-digit OTP"
            maxLength={6}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 text-center tracking-widest focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleVerify}
            disabled={loading}
            className="mt-4 w-full rounded-xl bg-blue-600 py-2 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify & Place Order"}
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
