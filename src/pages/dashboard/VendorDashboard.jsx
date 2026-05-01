import ProfileCard from "./ProfileCard";

export default function VendorDashboard() {
  return (
    <div className="page-shell space-y-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-wider text-teal-700">
          Seller workspace
        </p>
        <h1 className="text-4xl font-black text-slate-950">
          Vendor Dashboard
        </h1>
      </div>

      <ProfileCard />
    </div>
  );
}
