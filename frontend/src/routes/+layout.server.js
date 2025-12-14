import { env } from "$env/dynamic/private";
import { error } from "@sveltejs/kit";
const url = env.API_BASE_URL || "http://localhost:3000";

export const load = async ({ cookies, fetch }) => {
  const token = cookies.get("token") || null;

  try {
    const res = await fetch(`${url}/constellations`);
    const constellations = await res.json();

    return {
      constellations,
      error: null
    };
  } catch (err) {
    return {
      constellations: [],
      error: err.message
    }
  }
}