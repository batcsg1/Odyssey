import { env } from "$env/dynamic/private";
import { error } from "@sveltejs/kit";
const url = env.API_BASE_URL || "http://localhost:3000";

export const load = async ({ cookies, fetch }) => {
  const token = cookies.get("token") || null;

  try {
    const res = await fetch(`${url}/constellations`, {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    });

    const json = await res.json();

    if (!res.ok) {
      return {
        constellations: null,
        error: json.message
      };
    }

    return {
      constellations: json,
      error: null
    };
  } catch (err) {
    return {
      constellations: null,
      error: "Server is offline. Please try again later."
    }
  }
}