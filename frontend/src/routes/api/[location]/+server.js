import { env } from "$env/dynamic/private";
import { error } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
const API_BASE = env.API_BASE_URL || "http://localhost:3000";

export const GET = async ({params, url, fetch }) => {
  const { location } = params; 
  const name = url.searchParams.get("name");

  if (!name) {
    return json({ data: [] });
  }

  try {
    const upstream = await fetch(
      `${API_BASE}/${location}?name=${encodeURIComponent(name)}`
    );

    console.log(upstream);

    if (!upstream.ok) {
      console.error(
        "Upstream error:",
        upstream.status,
        upstream.statusText
      );

      throw error(upstream.status, "Upstream API error");
    }

    const data = await upstream.json();
    return json(data);
  } catch (err) {
    console.error("API proxy failure:", err);
    throw error(500, "Internal API proxy error");
  }
};
