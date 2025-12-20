import { env } from "$env/dynamic/private";
import { error } from "@sveltejs/kit";
const url = env.API_BASE_URL || "http://localhost:3000";

export const load = async ({ params, cookies, fetch }) => {
  const { id } = params;
  const token = cookies.get("token") || null;

  try {
    const res = await fetch(`${url}/constellations/${id}`, {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    });

    const json = await res.json();

    if (!res.ok) {
     return {
        constellation: null,
        error: json.message
      };
    }
    
    return {
      constellation: json.data,
      error: null
    };
  } catch (err) {
    return {
      constellation: null,
      error: "Server is offline. Please try again later."
    }
  }
}
