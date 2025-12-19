import { env } from "$env/dynamic/private";
import { error } from "@sveltejs/kit";
const url = env.API_BASE_URL || "http://localhost:3000";

export const load = async ({ params, cookies, fetch }) => {
  const { id } = params;
  const token = cookies.get("token") || null;

  if (!id) {
    throw error(400, "Constellation ID is required");
  }

  try {
    const res = await fetch(`${url}/constellations/${id}`);
    const constellation = await res.json();

    return {
      constellation,
      error: null
    };
  } catch (err) {
    return {
      constellation: null,
      error: err.message
    }
  }
}