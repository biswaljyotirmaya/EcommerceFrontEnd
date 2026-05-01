import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, ShieldCheck, ShoppingBag, Trash2 } from "lucide-react";

import {
  getCart,
  getCartItems,
  updateCartItemQty,
  deleteCartItem,
  deleteCart,
} from "../../api/cartApi";

import { createOrder } from "../../api/orderApi";
import { addOrderItemsBulk } from "../../api/orderItemApi";

import ConfirmModal from "../../components/common/ConfirmModal";
import ProductDetailsModal from "../../components/product/ProductDetailsModal";

import noImage from "../../assets/noImage.webp";
import OtpModal from "../../components/common/OtpModal";

export default function MyCart() {
  const user = useSelector((s) => s.auth.user);
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [items, setItems] = useState([]);
  const [confirm, setConfirm] = useState(null);
  const [preview, setPreview] = useState(null);
  const [otpOpen, setOtpOpen] = useState(false);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    if (!user?.id) return;

    (async () => {
      try {
        const { data: cartRes } = await getCart(user.id);
        setCart(cartRes);

        const { data: itemsRes } = await getCartItems(cartRes.id);
        setItems(itemsRes);
      } catch (e) {
        console.error("Failed to load cart", e);
      }
    })();
  }, [user]);

  const grossTotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qunt, 0),
    [items],
  );

  const discountAmount = grossTotal * discount;
  const payableTotal = grossTotal - discountAmount;

  const changeQty = async (item, delta) => {
    const newQty = item.qunt + delta;

    if (newQty < 1) {
      setConfirm(item);
      return;
    }

    await updateCartItemQty(item.id, newQty);

    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, qunt: newQty } : i)),
    );
  };

  const confirmDelete = async () => {
    await deleteCartItem(confirm.id);
    setItems((prev) => prev.filter((i) => i.id !== confirm.id));
    setConfirm(null);
  };

  const handleConfirmOrder = () => {
    setOtpOpen(true);
  };

  const handleOtpVerified = async () => {
    try {
      const { data: order } = await createOrder(user.firebaseUid);

      await addOrderItemsBulk(
        order.orderId,
        items.map((i) => ({
          productId: i.productId,
          vendorId: i.vendorId,
          productName: i.name,
          price: i.price,
          quantity: i.qunt,
          totalPrice: i.price * i.qunt,
        })),
      );

      await deleteCart(user.id);
      navigate("/orders");
    } catch (e) {
      console.error("Order creation failed", e);
    }
  };

  useEffect(() => {
    if (grossTotal > 50000) {
      setDiscount(0.3);
    } else if (grossTotal > 30000) {
      setDiscount(0.2);
    } else if (grossTotal > 15000) {
      setDiscount(0.1);
    } else {
      setDiscount(0);
    }
  }, [grossTotal]);

  return (
    <div className="page-shell space-y-8">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-teal-700">
            Checkout
          </p>
          <h1 className="text-4xl font-black text-slate-950">My Cart</h1>
        </div>
        <p className="text-sm font-semibold text-slate-500">
          Cart ID: {cart?.id || "Loading"}
        </p>
      </div>

      {items.length === 0 && (
        <div className="glass-panel rounded-3xl p-12 text-center">
          <ShoppingBag className="mx-auto text-teal-600" size={44} />
          <p className="mt-4 text-lg font-bold text-slate-700">
            Your cart is empty
          </p>
          <p className="mt-1 text-slate-500">
            Add products from the marketplace to build your order.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <CartItemRow
              key={item.id}
              item={item}
              onInc={() => changeQty(item, 1)}
              onDec={() => changeQty(item, -1)}
              onPreview={() => setPreview(item)}
            />
          ))}
        </div>

        {items.length > 0 && (
          <aside className="glass-panel h-fit rounded-3xl p-6 lg:sticky lg:top-24">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-950 text-white">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-950">
                  Order Summary
                </h2>
                <p className="text-sm text-slate-500">Secure OTP checkout</p>
              </div>
            </div>

            <div className="mt-6 space-y-4 rounded-2xl bg-white/75 p-4">
              <SummaryRow label="Items" value={items.length} />
              <SummaryRow label="Subtotal" value={`Rs. ${grossTotal.toFixed(2)}`} />
              <SummaryRow
                label={discount > 0 ? `Discount (${discount * 100}%)` : "Discount"}
                value={`- Rs. ${discountAmount.toFixed(2)}`}
              />
              <div className="border-t border-slate-200 pt-4">
                <SummaryRow
                  label="Payable total"
                  value={`Rs. ${payableTotal.toFixed(2)}`}
                  strong
                />
              </div>
            </div>

            <button
              onClick={handleConfirmOrder}
              className="primary-btn mt-6 w-full px-5 py-3"
            >
              Confirm Order
            </button>
          </aside>
        )}
      </div>

      <ConfirmModal
        open={!!confirm}
        title="Remove item?"
        message="Do you really want to remove this item from cart?"
        onCancel={() => setConfirm(null)}
        onConfirm={confirmDelete}
      />

      <ProductDetailsModal
        open={!!preview}
        onClose={() => setPreview(null)}
        product={{
          ...preview,
          image: preview?.image || noImage,
        }}
        canAddToCart={false}
      />

      <OtpModal
        open={otpOpen}
        onClose={() => setOtpOpen(false)}
        onVerified={handleOtpVerified}
      />
    </div>
  );
}

function CartItemRow({ item, onInc, onDec, onPreview }) {
  return (
    <div className="soft-card flex flex-col gap-4 rounded-3xl p-4 transition hover:-translate-y-0.5 hover:shadow-xl sm:flex-row sm:items-center">
      <img
        src={item.image || noImage}
        alt={item.name}
        onClick={onPreview}
        className="h-36 w-full cursor-pointer rounded-2xl object-cover sm:h-28 sm:w-28"
      />

      <div className="min-w-0 flex-1">
        <p className="truncate text-lg font-black text-slate-950">{item.name}</p>
        <p className="text-sm font-semibold text-slate-500">Rs. {item.price}</p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 rounded-2xl bg-slate-100 p-1">
          <button
            onClick={onDec}
            className="grid h-9 w-9 place-items-center rounded-xl bg-white text-slate-700 shadow-sm hover:text-rose-600"
          >
            {item.qunt <= 1 ? <Trash2 size={16} /> : <Minus size={16} />}
          </button>

          <span className="min-w-8 text-center font-black text-slate-950">
            {item.qunt}
          </span>

          <button
            onClick={onInc}
            className="grid h-9 w-9 place-items-center rounded-xl bg-white text-slate-700 shadow-sm hover:text-teal-700"
          >
            <Plus size={16} />
          </button>
        </div>

        <p className="min-w-28 text-right text-lg font-black text-slate-950">
          Rs. {(item.price * item.qunt).toFixed(2)}
        </p>
      </div>
    </div>
  );
}

function SummaryRow({ label, value, strong = false }) {
  return (
    <div
      className={`flex items-center justify-between gap-4 ${
        strong ? "text-lg font-black text-slate-950" : "text-sm text-slate-600"
      }`}
    >
      <span>{label}</span>
      <span className={strong ? "" : "font-bold text-slate-800"}>{value}</span>
    </div>
  );
}
