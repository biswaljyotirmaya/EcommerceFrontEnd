import { useSelector } from "react-redux";
import { useState } from "react";
import { Mail, MapPin, Pencil, Phone, UserRound } from "lucide-react";
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
      <div className="glass-panel relative overflow-hidden rounded-3xl bg-slate-950 p-8 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(20,184,166,0.42),transparent_26rem),radial-gradient(circle_at_85%_20%,rgba(244,114,182,0.25),transparent_20rem)]" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white/15 text-3xl font-black ring-1 ring-white/20">
            {initials}
          </div>
          <div>
            <h1 className="text-3xl font-black">{user.name}</h1>
            <p className="text-white/80">{user.email}</p>
            <span className="mt-3 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-bold ring-1 ring-white/15">
              {user.role}
            </span>
          </div>
        </div>

        <button
          onClick={() => setOpenEdit(true)}
          className="secondary-btn relative mt-6 px-4 py-2 text-sm text-slate-900 sm:absolute sm:right-6 sm:top-6 sm:mt-0"
        >
          <Pencil size={15} />
          Edit Profile
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
        <InfoCard label="Full Name" value={user.name} icon={UserRound} />
        <InfoCard label="Email Address" value={user.email} icon={Mail} />
        <InfoCard label="Mobile Number" value={user.mobile || "-"} icon={Phone} />
        <InfoCard label="Address" value={user.address || "-"} icon={MapPin} />
      </div>

      <EditProfileModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        user={user}
      />
    </div>
  );
}

function InfoCard({ label, value, icon: Icon }) {
  return (
    <div className="soft-card rounded-3xl p-5">
      <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-teal-50 text-teal-700">
        <Icon size={19} />
      </div>
      <p className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>
      <p className="font-bold text-slate-900">{value}</p>
    </div>
  );
}
