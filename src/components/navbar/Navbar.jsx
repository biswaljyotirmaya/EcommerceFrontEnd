import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";
import ProfileMenu from "./ProfileMenu";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebse";
import { LayoutDashboard, Package, ShoppingBag, ShoppingCart, Store } from "lucide-react";

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
      <nav className="sticky top-0 z-40 border-b border-white/70 bg-white/78 backdrop-blur-xl shadow-sm shadow-slate-200/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-2 text-xl font-black tracking-tight text-slate-950">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-400/30">
              <Store size={20} />
            </span>
            Market<span className="text-teal-600">Hub</span>
          </Link>

          <div className="hidden items-center gap-1 rounded-2xl border border-slate-200/80 bg-white/70 p-1 text-sm font-semibold text-slate-600 md:flex">
            <NavLink to="/" icon={ShoppingBag}>
              Home
            </NavLink>

            {isAuthenticated && (
              <NavLink to="/dashboard" icon={LayoutDashboard}>
                Dashboard
              </NavLink>
            )}

            {isAuthenticated && user.role === "VENDOR" && (
              <>
                <NavLink to="/vendor/products" icon={Package}>
                  Products
                </NavLink>
                <NavLink to="/vendor/orders" icon={ShoppingCart}>
                  Orders
                </NavLink>
              </>
            )}

            {isAuthenticated && user.role === "CONSUMER" && (
              <>
                <NavLink to="/cart" icon={ShoppingCart}>
                  Cart
                </NavLink>
                <NavLink to="/orders" icon={Package}>
                  Orders
                </NavLink>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => setOpenLogin(true)}
                  className="secondary-btn px-4 py-2 text-sm"
                >
                  Login
                </button>

                <button
                  onClick={() => setOpenRegister(true)}
                  className="primary-btn px-4 py-2 text-sm"
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

function NavLink({ to, icon: Icon, children }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-slate-950 hover:text-white"
    >
      <Icon size={16} />
      {children}
    </Link>
  );
}
