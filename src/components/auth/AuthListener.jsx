import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../config/firebse";
import { getCurrentUser } from "../../api/userApi";
import { logout, setUser } from "../../store/authSlice";

export default function AuthListener({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        dispatch(logout());
        return;
      }

      try {
        const res = await getCurrentUser();
        dispatch(setUser(res.data));
      } catch (err) {
        if (err.response?.status === 404) {
          console.info("User authenticated but not onboarded yet");

          dispatch(
            setUser({
              firebaseUid: firebaseUser.uid,
              email: firebaseUser.email,
            }),
          );
          return;
        }

        console.error("Failed to restore session", err);
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return children;
}
