import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { updateProfile } from "../../api/userApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";
import useToast from "../../components/toast/useToast";
import { X } from "lucide-react";

export default function EditProfileModal({ open, onClose, user }) {
  const toast = useToast();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: user?.name || "",
    mobile: user?.mobile || "",
    address: user?.address || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await updateProfile(form);

      dispatch(setUser(data));
      toast.success("Profile updated successfully");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" />

      <div className="fixed inset-0 flex items-center justify-center px-4">
        <Dialog.Panel className="bg-white rounded-xl p-6 w-full max-w-md">
          <div className="flex justify-between mb-4">
            <Dialog.Title className="font-semibold">Edit Profile</Dialog.Title>
            <button onClick={onClose}>
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Name"
              className="w-full border rounded-lg p-2"
            />

            <input
              value={form.mobile}
              onChange={(e) => setForm({ ...form, mobile: e.target.value })}
              placeholder="Mobile"
              className="w-full border rounded-lg p-2"
            />

            <input
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="Address"
              className="w-full border rounded-lg p-2"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg"
            >
              Save Changes
            </button>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
