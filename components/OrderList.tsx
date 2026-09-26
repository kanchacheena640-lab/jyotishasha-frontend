"use client";
import { useEffect, useState } from "react";
import PlaceAutocompleteInput from "./PlaceAutocompleteInput";
import { applyPlaceSelection, applyPobEdit, RelationshipPlaceState } from "@/lib/relationshipPlaceValidation";
import { deliveryStatus, canResend } from "./orderListHelpers";

interface Order {
  id: number;
  name: string;
  phone: string;
  report_name: string;
  payment_status: string;
  order_time: string;
  report_stage: string;
  pdf_url: string | null;
  email_status?: string;
  language?: string;
  dob?: string;
  tob?: string;
  pob?: string;
  latitude?: string;
  longitude?: string;
}

function parseCoordinate(raw: string | null | undefined): number {
  if (raw === null || raw === undefined || raw === "") return 0;
  const n = Number(raw);
  return Number.isFinite(n) ? n : 0;
}

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  // Admin Orders BFF Auth Fix: previously the raw JSON body was trusted
  // unconditionally (no res.ok check, no shape check), so an auth
  // rejection ({"msg": "Missing Authorization Header"}, an object) was
  // handed straight to setOrders() and crashed orders.map() below.
  const [loadError, setLoadError] = useState("");

  // For modal edit
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [formData, setFormData] = useState({ dob: "", tob: "" });

  // Admin Orders P0 fix: place/lat/long are no longer three independently
  // editable fields. `placeState` drives the shared PlaceAutocompleteInput
  // via the SAME resolved-place invariant the customer-facing relationship
  // form already uses (lib/relationshipPlaceValidation.ts) -- a manual
  // retype immediately invalidates the previous coordinates, and Save is
  // gated on `placeSelected`.
  const [placeState, setPlaceState] = useState<RelationshipPlaceState>({
    pob: "", lat: 0, lng: 0, placeSelected: false,
  });
  // True only after a genuine NEW autocomplete selection in this modal
  // session -- distinct from `placeSelected` (which is also true for the
  // untouched original value). NULL coordinate preservation fix: when this
  // is false, handleSave OMITS latitude/longitude from the request body
  // entirely rather than re-sending any client-side representation of the
  // order's existing value -- update_order() already leaves an omitted
  // field exactly as stored (data.get("latitude", order.latitude)), so
  // this is the only way to guarantee a historical NULL stays NULL, an
  // existing "" stays "", and existing real coordinates stay byte-for-byte
  // untouched, without the client ever normalizing what it never resolved.
  const [placeFreshlySelected, setPlaceFreshlySelected] = useState(false);

  async function fetchOrders() {
    setLoading(true);
    setLoadError("");
    try {
      // Admin Orders BFF Auth Fix: routed through this app's own
      // authenticated BFF route (app/api/admin/orders/route.ts) instead
      // of fetching NEXT_PUBLIC_BACKEND_URL (production Flask) directly
      // from the browser with no credential at all.
      const res = await fetch("/api/admin/orders", { cache: "no-store" });
      const data = await res.json().catch(() => null);
      if (!res.ok || !Array.isArray(data)) {
        setLoadError(
          (data && !Array.isArray(data) && (data.message || data.error)) ||
            `Couldn't load orders (${res.status}).`
        );
        setOrders([]);
        return;
      }
      setOrders(data);
    } catch {
      setLoadError("Couldn't reach the admin API.");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  function openEdit(order: Order) {
    setEditingOrder(order);
    setFormData({ dob: order.dob || "", tob: order.tob || "" });
    const pob = order.pob || "";
    // The order's existing place counts as already-resolved -- an admin
    // who touches nothing else must still be able to Save (dob/tob-only
    // edits), regardless of whether historical lat/long happen to be
    // present. Only a manual retype (applyPobEdit) invalidates this.
    setPlaceState({
      pob, lat: parseCoordinate(order.latitude), lng: parseCoordinate(order.longitude), placeSelected: true,
    });
    setPlaceFreshlySelected(false);
  }

  const handleSave = async () => {
    if (!editingOrder) return;
    if (!placeState.placeSelected) return; // Save button is disabled for this case too; defensive guard.
    try {
      // NULL coordinate preservation fix: latitude/longitude are only
      // included when a genuine fresh selection resolved them. Omitting
      // the keys for an untouched place lets update_order()'s own
      // data.get("latitude", order.latitude) default apply, which leaves
      // the order's existing value -- NULL, "", or a real coordinate --
      // exactly as it already was, with zero client-side normalization.
      const payload: { dob: string; tob: string; pob: string; latitude?: string; longitude?: string } = {
        dob: formData.dob,
        tob: formData.tob,
        pob: placeState.pob,
      };
      if (placeFreshlySelected) {
        payload.latitude = String(placeState.lat);
        payload.longitude = String(placeState.lng);
      }
      // Admin Orders BFF Completion: routed through this app's own
      // authenticated BFF route (app/api/admin/orders/[id]/route.ts)
      // instead of fetching NEXT_PUBLIC_BACKEND_URL (production Flask)
      // directly from the browser with no credential at all.
      const res = await fetch(
        `/api/admin/orders/${editingOrder.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (res.ok) {
        alert("Order updated!");
        setEditingOrder(null);
        location.reload();
      } else {
        const data = await res.json().catch(() => null);
        alert(data?.message || "Failed to update order.");
      }
    } catch (error) {
      alert("Error while updating.");
    }
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">📦 All Orders</h2>

      {loading ? (
        <p>Loading orders...</p>
      ) : loadError ? (
        <div className="text-sm">
          <p className="text-red-600 mb-2">{loadError}</p>
          <button
            onClick={fetchOrders}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Retry
          </button>
        </div>
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
            {orders.map((order, index) => {
              const status = deliveryStatus(order);
              const resendEnabled = canResend(order);
              return (
                <tr key={order.id}>
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">
                    {order.name}
                    <button
                      className="ml-2 text-blue-600 underline text-xs"
                      onClick={() => openEdit(order)}
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
                    {status.kind === "download" ? (
                      // Admin Orders P0 fix: routed through the authenticated
                      // BFF route (app/api/admin/orders/[id]/download/route.ts)
                      // instead of linking straight at NEXT_PUBLIC_BACKEND_URL
                      // (production Flask) with no credential at all -- that
                      // direct link 401'd on every click, PDF or not.
                      <a
                        href={`/api/admin/orders/${order.id}/download`}
                        className="text-blue-600 underline mr-2"
                        target="_blank"
                      >
                        Download
                      </a>
                    ) : (
                      <span
                        className={`italic mr-2 ${status.kind === "failed" ? "text-red-600" : "text-gray-500"}`}
                      >
                        {status.label}
                      </span>
                    )}

                    <button
                      disabled={!resendEnabled}
                      title={resendEnabled ? undefined : "Resend is only available for a Ready report whose email delivery failed."}
                      onClick={async () => {
                        try {
                          // Admin Orders BFF Completion: routed through this
                          // app's own authenticated BFF route
                          // (app/api/admin/orders/[id]/resend/route.ts)
                          // instead of fetching NEXT_PUBLIC_BACKEND_URL
                          // (production Flask) directly from the browser
                          // with no credential at all.
                          const res = await fetch(
                            `/api/admin/orders/${order.id}/resend`,
                            { method: "POST" }
                          );
                          if (res.ok) {
                            alert("Resend started!");
                          } else {
                            alert("Failed to resend report.");
                          }
                        } catch (error) {
                          alert("Error while resending.");
                        }
                      }}
                      className="bg-yellow-500 text-white px-2 py-1 rounded text-xs hover:bg-yellow-600 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-yellow-500"
                    >
                      Resend
                    </button>
                  </td>
                </tr>
              );
            })}
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
                className="w-full border p-2 mb-2 text-black"
            />
            <input
              type="time"
              value={formData.tob}
              onChange={(e) =>
                setFormData({ ...formData, tob: e.target.value })
              }
                className="w-full border p-2 mb-2 text-black"
            />
            <PlaceAutocompleteInput
              value={placeState.pob}
              onChange={(value) => setPlaceState((prev) => applyPobEdit(prev, value))}
              onPlaceSelected={(place) => {
                setPlaceState((prev) => applyPlaceSelection(prev, place));
                setPlaceFreshlySelected(true);
              }}
            />
            <p className="text-xs text-gray-500 mb-2">
              {placeState.placeSelected
                ? `Lat/Lng: ${placeState.lat}, ${placeState.lng}`
                : "Select a place from the suggestions to set coordinates."}
            </p>

            <div className="flex justify-end space-x-2">
              <button
                className="px-3 py-1 bg-gray-300 rounded"
                onClick={() => setEditingOrder(null)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 bg-green-600 text-white rounded disabled:opacity-40 disabled:cursor-not-allowed"
                disabled={!placeState.placeSelected}
                title={placeState.placeSelected ? undefined : "Select a genuine place suggestion before saving."}
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
