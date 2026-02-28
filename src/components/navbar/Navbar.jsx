import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";
import ProfileMenu from "./ProfileMenu";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebse";

export default function Navbar() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth); // 🔥 VERY IMPORTANT
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold tracking-tight">
            E<span className="text-blue-600">Com</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>

            {isAuthenticated && (
              <Link to="/dashboard" className="hover:text-blue-600">
                Dashboard
              </Link>
            )}

            {isAuthenticated && user.role === "VENDOR" && (
              <>
                <Link to="/vendor/products" className="hover:text-blue-600">
                  Products
                </Link>
                <Link to="/vendor/orders" className="hover:text-blue-600">
                  Orders
                </Link>
              </>
            )}

            {isAuthenticated && user.role === "CONSUMER" && (
              <>
                <Link to="/cart" className="hover:text-blue-600">
                  Cart
                </Link>
                <Link to="/orders" className="hover:text-blue-600">
                  Orders
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => setOpenLogin(true)}
                  className="px-4 py-1.5 rounded-lg text-sm border hover:bg-gray-100"
                >
                  Login
                </button>

                <button
                  onClick={() => setOpenRegister(true)}
                  className="px-4 py-1.5 rounded-lg text-sm bg-blue-600 text-white hover:bg-blue-700"
                >
                  Register
                </button>
              </>
            ) : (
              <ProfileMenu user={user} onLogout={handleLogout} />
            )}
          </div>
        </div>
      </nav>

      <LoginForm
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        openRegister={() => {
          setOpenLogin(false);
          setOpenRegister(true);
        }}
      />

      <RegisterForm
        open={openRegister}
        onClose={() => setOpenRegister(false)}
      />
    </>
  );
}
