import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
    if (grossTotal > 30000 && grossTotal <= 30000) {
      setDiscount(0.1);
    } else if (grossTotal > 30000 && grossTotal <= 50000) {
      setDiscount(0.2);
    } else if (grossTotal > 50000) {
      setDiscount(0.3);
    } else {
      setDiscount(1);
    }
  }, [items, grossTotal]);
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-semibold mb-6">My Cart</h1>

      {items.length === 0 && (
        <div className="rounded-xl bg-white p-10 text-center shadow">
          <p className="text-gray-500 text-lg">Your cart is empty 🛒</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
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
          <div className="rounded-2xl bg-white shadow p-6 h-fit sticky top-24">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            <div className="flex justify-between text-sm mb-2">
              <span>Items</span>
              <span>{items.length}</span>
            </div>

            <div className="flex justify-between text-lg font-semibold border-t pt-4">
              <div>
                {discount === 0.1 ? (
                  <span>You got discount of 10%</span>
                ) : discount === 0.2 ? (
                  <span>You got discount of 20%</span>
                ) : discount === 0.3 ? (
                  <span>You got discount of 30%</span>
                ) : (
                  <span>You dont have a discount</span>
                )}
              </div>
              <span>Total</span>
              <span className="text-green-600">
                ₹ {(grossTotal - grossTotal * discount).toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleConfirmOrder}
              className="mt-6 w-full rounded-xl bg-blue-600 py-3 text-white font-medium hover:bg-blue-700"
            >
              Confirm Order
            </button>
          </div>
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
    <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow hover:shadow-md transition">
      <img
        src={item.image || noImage}
        alt={item.name}
        onClick={onPreview}
        className="h-24 w-24 rounded-xl object-cover cursor-pointer"
      />

      <div className="flex-1">
        <p className="font-medium">{item.name}</p>
        <p className="text-sm text-gray-500">₹ {item.price}</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onDec}
          className="h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200"
        >
          −
        </button>

        <span className="min-w-6 text-center font-medium">{item.qunt}</span>

        <button
          onClick={onInc}
          className="h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200"
        >
          +
        </button>
      </div>

      <p className="w-24 text-right font-semibold">
        ₹ {(item.price * item.qunt).toFixed(2)}
      </p>
    </div>
  );
}
