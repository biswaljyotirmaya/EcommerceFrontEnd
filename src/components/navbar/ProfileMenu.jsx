import { Menu } from "@headlessui/react";
import { User, LogOut, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProfileMenu({ user, onLogout }) {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100">
        <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
          {user.name?.[0]?.toUpperCase()}
        </div>
        <span className="text-sm font-medium hidden md:block">{user.name}</span>
      </Menu.Button>

      <Menu.Items className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg border p-1 text-sm">
        <Menu.Item>
          {({ active }) => (
            <Link
              to="/dashboard"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                active && "bg-gray-100"
              }`}
            >
              <LayoutDashboard size={16} />
              Dashboard
            </Link>
          )}
        </Menu.Item>

        <Menu.Item>
          {({ active }) => (
            <button
              onClick={onLogout}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left ${
                active && "bg-gray-100"
              }`}
            >
              <LogOut size={16} />
              Logout
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}
