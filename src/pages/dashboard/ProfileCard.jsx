import { useSelector } from "react-redux";
import { useState } from "react";
import EditProfileModal from "./EditProfileModal";

export default function ProfileCard() {
  const user = useSelector((state) => state.auth.user);
  const [openEdit, setOpenEdit] = useState(false);

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="w-full">
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-lg">
        <div className="flex items-center gap-6">
          <div className="h-20 w-20 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold">
            {initials}
          </div>
          <div>
            <h1 className="text-2xl font-semibold">{user.name}</h1>
            <p className="text-white/80">{user.email}</p>
            <span className="mt-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs">
              {user.role}
            </span>
          </div>
        </div>

        <button
          onClick={() => setOpenEdit(true)}
          className="absolute top-6 right-6 rounded-xl bg-white px-4 py-2 text-sm font-medium text-blue-600 shadow hover:bg-blue-50"
        >
          Edit Profile
        </button>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoCard label="Full Name" value={user.name} />
        <InfoCard label="Email Address" value={user.email} />
        <InfoCard label="Mobile Number" value={user.mobile || "—"} />
        <InfoCard label="Address" value={user.address || "—"} />
      </div>

      <EditProfileModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        user={user}
      />
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100">
      <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
        {label}
      </p>
      <p className="text-sm font-medium text-gray-900">{value}</p>
    </div>
  );
}
