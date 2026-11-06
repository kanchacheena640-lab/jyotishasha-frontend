// utils/fetchLifeTool.ts

type LifeToolRequest = {
  name: string;
  dob: string;
  tob: string;
  latitude: number;
  longitude: number;
  language: 'en' | 'hi';
  toolId: string;
};

const BACKEND = (process.env.NEXT_PUBLIC_BACKEND_URL || '').replace(/\/$/, '');

export async function fetchLifeTool(req: LifeToolRequest) {
  const payload = {
    name: req.name,
    dob: req.dob,
    tob: req.tob,
    latitude: req.latitude,
    longitude: req.longitude,
    language: req.language,
    toolId: req.toolId,
  };

  // No console logging of the payload or response: both carry the visitor's birth details.

  const res = await fetch(`${BACKEND}/api/life-tool`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("LifeTool backend error:", res.status);
    throw new Error(`Backend Error ${res.status}: ${errorText}`);
  }

  const json = await res.json();
  return json;
}
