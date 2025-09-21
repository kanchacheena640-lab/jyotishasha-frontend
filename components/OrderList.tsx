"use client";
import { useEffect, useState } from "react";

interface Order {
  id: number;
  name: string;
  phone: string;
  report_name: string;
  payment_status: string;
  order_time: string;
  report_stage: string;
  pdf_url: string | null;
  language?: string;
  dob?: string;
  tob?: string;
  pob?: string;
  latitude?: string;
  longitude?: string;
}

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // For modal edit
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [formData, setFormData] = useState({
    dob: "",
    tob: "",
    pob: "",
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/api/orders`
        );
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  const handleSave = async () => {
    if (!editingOrder) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/api/order/${editingOrder.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (res.ok) {
        alert("Order updated!");
        setEditingOrder(null);
        location.reload();
      } else {
        alert("Failed to update order.");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Error while updating.");
    }
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">📦 All Orders</h2>

      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <table className="w-full text-left border border-gray-300">
          <thead className="bg-gray-100 text-gray-900">
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Report</th>
              <th className="p-2 border">Language</th>
              <th className="p-2 border">Payment</th>
              <th className="p-2 border">Stage</th>
              <th className="p-2 border">Created</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id}>
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">
                  {order.name}
                  <button
                    className="ml-2 text-blue-600 underline text-xs"
                    onClick={() => {
                      setEditingOrder(order);
                      setFormData({
                        dob: order.dob || "",
                        tob: order.tob || "",
                        pob: order.pob || "",
                        latitude: order.latitude || "",
                        longitude: order.longitude || "",
                      });
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td className="p-2 border">{order.phone}</td>
                <td className="p-2 border">{order.report_name}</td>
                <td className="p-2 border">
                  {order.language === "hi" ? "🇮🇳 Hindi" : "🇬🇧 English"}
                </td>
                <td className="p-2 border">{order.payment_status}</td>
                <td className="p-2 border">{order.report_stage}</td>
                <td className="p-2 border">
                  {new Date(order.order_time).toLocaleString()}
                </td>
                <td className="p-2 border">
                  {order.pdf_url ? (
                    <a
                      href={`${process.env.NEXT_PUBLIC_BACKEND_URL}${order.pdf_url}`}
                      className="text-blue-600 underline mr-2"
                      target="_blank"
                    >
                      Download
                    </a>
                  ) : (
                    <span className="text-gray-500 italic mr-2">
                      Not ready
                    </span>
                  )}

                  <button
                    onClick={async () => {
                      try {
                        const res = await fetch(
                          `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/api/resend/${order.id}`,
                          { method: "POST" }
                        );
                        if (res.ok) {
                          alert("Resend started!");
                        } else {
                          alert("Failed to resend report.");
                        }
                      } catch (error) {
                        console.error("Resend error:", error);
                        alert("Error while resending.");
                      }
                    }}
                    className="bg-yellow-500 text-white px-2 py-1 rounded text-xs hover:bg-yellow-600"
                  >
                    Resend
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {editingOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow w-96">
            <h3 className="text-lg font-bold mb-4">
              Edit Order Info (#{editingOrder.id})
            </h3>

            <input
              type="date"
              value={formData.dob}
              onChange={(e) =>
                setFormData({ ...formData, dob: e.target.value })
              }
              className="w-full border p-2 mb-2"
            />
            <input
              type="time"
              value={formData.tob}
              onChange={(e) =>
                setFormData({ ...formData, tob: e.target.value })
              }
              className="w-full border p-2 mb-2"
            />
            <input
              type="text"
              placeholder="Place of Birth"
              value={formData.pob}
              onChange={(e) =>
                setFormData({ ...formData, pob: e.target.value })
              }
              className="w-full border p-2 mb-2"
            />
            <input
              type="text"
              placeholder="Latitude"
              value={formData.latitude}
              onChange={(e) =>
                setFormData({ ...formData, latitude: e.target.value })
              }
              className="w-full border p-2 mb-2"
            />
            <input
              type="text"
              placeholder="Longitude"
              value={formData.longitude}
              onChange={(e) =>
                setFormData({ ...formData, longitude: e.target.value })
              }
              className="w-full border p-2 mb-4"
            />

            <div className="flex justify-end space-x-2">
              <button
                className="px-3 py-1 bg-gray-300 rounded"
                onClick={() => setEditingOrder(null)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 bg-green-600 text-white rounded"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
