import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../config/firebse";
import { getCurrentUser } from "../../api/userApi";
import useToast from "../toast/useToast";

export default function GoogleAuthButton({ openRegisterModal, onClose }) {
  const toast = useToast();

  const handleGoogleLogin = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;

      try {
        // Check backend
        await getCurrentUser(user.uid);

        toast.success("Login successful with Google ✅");
        onClose();
      } catch {
        // Not onboarded yet
        toast.info("Complete your profile to continue");

        openRegisterModal({
          firebaseUid: user.uid,
          email: user.email,
          name: user.displayName,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Google login failed");
    }
  };

  return <button onClick={handleGoogleLogin}>Continue with Google</button>;
}
