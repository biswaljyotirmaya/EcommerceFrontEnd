import { useEffect, useState } from "react";
import { getAllProducts } from "../api/productApi";
import ProductCard from "../components/product/ProductCard";
import { BadgePercent, ShieldCheck, Sparkles, Truck } from "lucide-react";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts().then((res) => setProducts(res.data));
  }, []);

  return (
    <div className="page-shell space-y-8">
      <section className="glass-panel overflow-hidden rounded-[2rem]">
        <div className="grid gap-8 p-6 md:grid-cols-[1.2fr_0.8fr] md:p-10">
          <div className="flex flex-col justify-center">
            <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-teal-50 px-4 py-2 text-sm font-bold text-teal-700 ring-1 ring-teal-100">
              <Sparkles size={16} />
              Curated multi-vendor marketplace
            </span>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-slate-950 md:text-6xl">
              Discover standout products from trusted sellers.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              Shop fresh collections, compare vendors, and move from product
              discovery to checkout with a cleaner premium experience.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <TrustPill icon={Truck} label="Fast fulfillment" />
              <TrustPill icon={ShieldCheck} label="Verified vendors" />
              <TrustPill icon={BadgePercent} label="Smart cart deals" />
            </div>
          </div>

          <div className="relative min-h-72 overflow-hidden rounded-[1.5rem] bg-slate-950 p-5 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(20,184,166,0.45),transparent_28rem),radial-gradient(circle_at_75%_45%,rgba(244,114,182,0.36),transparent_22rem)]" />
            <div className="relative flex h-full flex-col justify-between">
              <div>
                <p className="text-sm font-semibold text-white/70">
                  Live catalog
                </p>
                <p className="mt-2 text-5xl font-black">{products.length}</p>
                <p className="text-white/70">products ready to explore</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {products.slice(0, 4).map((product) => (
                  <img
                    key={product.id}
                    src={product.image}
                    alt={product.name}
                    className="h-28 w-full rounded-2xl object-cover ring-1 ring-white/15"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-teal-700">
              Marketplace
            </p>
            <h2 className="text-3xl font-black text-slate-950">
              Featured Products
            </h2>
          </div>
          <p className="text-sm font-medium text-slate-500">
            {products.length} items from your backend catalog
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

function TrustPill({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-white/70 bg-white/70 px-3 py-3 text-sm font-bold text-slate-700 shadow-sm">
      <Icon size={17} className="text-teal-600" />
      <span>{label}</span>
    </div>
  );
}
