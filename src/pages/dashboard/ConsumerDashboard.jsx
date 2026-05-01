import ProfileCard from "./ProfileCard";

export default function ConsumerDashboard() {
  return (
    <div className="page-shell space-y-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-wider text-teal-700">
          Account
        </p>
        <h1 className="text-4xl font-black text-slate-950">
          Consumer Dashboard
        </h1>
      </div>

      <ProfileCard />
    </div>
  );
}
