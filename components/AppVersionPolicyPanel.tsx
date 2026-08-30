"use client";
import { useEffect, useState } from "react";

interface AppVersionPolicy {
  platform: string;
  minimum_supported_build: number;
  latest_build: number;
  force_update: boolean;
  store_url: string | null;
  message: string | null;
}

type LoadState = "loading" | "loaded" | "error";
type SaveState = "idle" | "saving" | "success" | "error";

export default function AppVersionPolicyPanel() {
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [loadError, setLoadError] = useState("");
  const [policy, setPolicy] = useState<AppVersionPolicy | null>(null);

  const [minimumInput, setMinimumInput] = useState("");
  const [latestInput, setLatestInput] = useState("");
  const [forceUpdateInput, setForceUpdateInput] = useState(false);

  const [validationError, setValidationError] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [saveError, setSaveError] = useState("");

  async function fetchPolicy() {
    setLoadState("loading");
    setLoadError("");
    try {
      const res = await fetch("/api/admin/app-version", { cache: "no-store" });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data) {
        setLoadError(data?.message || data?.error || `Failed to load policy (${res.status}).`);
        setLoadState("error");
        return;
      }
      setPolicy(data);
      setMinimumInput(String(data.minimum_supported_build));
      setLatestInput(String(data.latest_build));
      setForceUpdateInput(Boolean(data.force_update));
      setLoadState("loaded");
    } catch {
      setLoadError("Could not reach the admin API.");
      setLoadState("error");
    }
  }

  useEffect(() => {
    fetchPolicy();
  }, []);

  function validate(minimum: number, latest: number): string {
    if (!Number.isInteger(minimum) || minimum <= 0) {
      return "Minimum Supported Build must be a positive whole number.";
    }
    if (!Number.isInteger(latest) || latest <= 0) {
      return "Latest Build must be a positive whole number.";
    }
    if (minimum > latest) {
      return "Minimum Supported Build cannot be greater than Latest Build.";
    }
    return "";
  }

  async function submitSave(minimum: number, latest: number) {
    setSaveState("saving");
    setSaveError("");
    try {
      const res = await fetch("/api/admin/app-version", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          minimum_supported_build: minimum,
          latest_build: latest,
          force_update: forceUpdateInput,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data || data.error) {
        setSaveError(data?.message || data?.error || `Save failed (${res.status}).`);
        setSaveState("error");
        return;
      }
      setSaveState("success");
      // Never optimistically trust the values we sent -- reload the
      // authoritative state from the backend.
      await fetchPolicy();
    } catch {
      setSaveError("Could not reach the admin API.");
      setSaveState("error");
    }
  }

  function handleSaveClick() {
    if (saveState === "saving") return; // prevent duplicate submissions
    setValidationError("");
    setSaveState("idle");
    setSaveError("");

    const minimum = Number(minimumInput);
    const latest = Number(latestInput);
    const problem = validate(minimum, latest);
    if (problem) {
      setValidationError(problem);
      return;
    }

    const currentMinimum = policy?.minimum_supported_build ?? minimum;
    if (minimum > currentMinimum) {
      setConfirmOpen(true);
      return;
    }

    submitSave(minimum, latest);
  }

  function handleConfirmedSave() {
    setConfirmOpen(false);
    const minimum = Number(minimumInput);
    const latest = Number(latestInput);
    submitSave(minimum, latest);
  }

  if (loadState === "loading") {
    return <p className="text-gray-600">Loading version policy...</p>;
  }

  if (loadState === "error") {
    return (
      <div className="max-w-lg">
        <p className="text-red-600 mb-3">{loadError}</p>
        <button
          onClick={fetchPolicy}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg">
      <h2 className="text-xl font-bold mb-1">App Version Policy</h2>
      <p className="text-sm text-gray-500 mb-4">Platform: Android</p>

      <div className="bg-gray-50 border rounded p-3 mb-4 text-sm text-gray-700">
        <p>Current Production:</p>
        <p>Minimum Supported Build: <strong>{policy?.minimum_supported_build}</strong></p>
        <p>Latest Build: <strong>{policy?.latest_build}</strong></p>
        <p>Force Update: <strong>{policy?.force_update ? "ON" : "OFF"}</strong></p>
      </div>

      <div className="space-y-3">
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Minimum Supported Build</span>
          <input
            type="number"
            min={1}
            value={minimumInput}
            onChange={(e) => setMinimumInput(e.target.value)}
            className="w-full border p-2 mt-1 rounded text-black"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Latest Build</span>
          <input
            type="number"
            min={1}
            value={latestInput}
            onChange={(e) => setLatestInput(e.target.value)}
            className="w-full border p-2 mt-1 rounded text-black"
          />
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={forceUpdateInput}
            onChange={(e) => setForceUpdateInput(e.target.checked)}
          />
          <span className="text-sm font-medium text-gray-700">Force Update</span>
        </label>

        {validationError && <p className="text-red-600 text-sm">{validationError}</p>}
        {saveState === "error" && <p className="text-red-600 text-sm">{saveError}</p>}
        {saveState === "success" && (
          <p className="text-green-600 text-sm">Policy saved.</p>
        )}

        <button
          onClick={handleSaveClick}
          disabled={saveState === "saving"}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {saveState === "saving" ? "Saving..." : "Save Policy"}
        </button>
      </div>

      {confirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow w-96">
            <p className="mb-4">
              This will block app builds below {minimumInput} and require those users to update.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                className="px-3 py-1 bg-gray-300 rounded"
                onClick={() => setConfirmOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 bg-indigo-600 text-white rounded"
                onClick={handleConfirmedSave}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
