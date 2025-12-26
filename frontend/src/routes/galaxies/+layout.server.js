import { env } from "$env/dynamic/private";
import { error } from "@sveltejs/kit";
const url = env.API_BASE_URL || "http://localhost:3000";

export const load = async ({ cookies, fetch }) => {
  const token = cookies.get("token") || null;

  const headers = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  try {
    const [galaxiesRes, constellationsRes] = await Promise.all([
      fetch(`${url}/galaxies`, { headers }),
      fetch(`${url}/constellations`, { headers })
    ]);

    const galaxiesJson = await galaxiesRes.json();
    const constellationsJson = await constellationsRes.json();

    if (!galaxiesRes.ok) {
      return { galaxies: null, constellationMap: null, error: galaxiesJson.message };
    }

    if (!constellationsRes.ok) {
      return { galaxies: null, constellationMap: null, error: constellationsJson.message };
    }

    const constellationMap = Object.fromEntries(
      constellationsJson.data.map(c => [c.id, c.name])
    );

    console.log(constellationMap);

    return {
      galaxies: galaxiesJson,
      constellationMap,
      error: null
    };
  } catch (err) {
    return {
      galaxies: null,
      constellationMap: null,
      error: "Server is offline. Please try again later."
    }
  }
}