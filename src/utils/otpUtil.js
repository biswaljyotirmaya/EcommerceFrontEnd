const OTP_KEY = "ORDER_OTP";

export const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export const storeOtp = (otp) => {
  const payload = {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000, 
  };
  localStorage.setItem(OTP_KEY, JSON.stringify(payload));
};

export const verifyOtp = (inputOtp) => {
  const raw = localStorage.getItem(OTP_KEY);
  if (!raw) return false;

  const { otp, expiresAt } = JSON.parse(raw);

  if (Date.now() > expiresAt) {
    localStorage.removeItem(OTP_KEY);
    return false;
  }

  if (otp !== inputOtp) return false;

  localStorage.removeItem(OTP_KEY);
  return true;
};
