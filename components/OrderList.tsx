"use client";
import { useEffect, useState } from "react";

interface Order {
  id: number;
  name: string;
  email: string;
  phone: string;
  report_name: string;
  payment_status: string;
  order_time: string;
  report_stage: string;
  pdf_url: string | null;
  language?: string; 
}


export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/api/orders`);
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
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Report</th>
                <th className="p-2 border">Language</th>
                <th className="p-2 border">Payment</th>
                <th className="p-2 border">Stage</th>
                <th className="p-2 border">Created</th>
                <th className="p-2 border">PDF</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order.id}>
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{order.name}</td>
                  <td className="p-2 border">{order.email}</td>
                  <td className="p-2 border">{order.phone}</td>
                  <td className="p-2 border">{order.report_name}</td>
                  <td className="p-2 border">
                    {order.language === "hi" ? "🇮🇳 Hindi" : "🇬🇧 English"}
                  </td>
                  <td className="p-2 border">{order.payment_status}</td>
                  <td className="p-2 border">{order.report_stage}</td>
                  <td className="p-2 border">{new Date(order.order_time).toLocaleString()}</td>
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
                      <span className="text-gray-500 italic mr-2">Not ready</span>
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
    </div>
  );
}
