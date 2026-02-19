import { env } from "$env/dynamic/private";
import { error } from "@sveltejs/kit";
const url = env.API_BASE_URL || "http://localhost:3000";

export const load = async ({ cookies, fetch }) => {
  const token = cookies.get("token") || null;

  const headers = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  try {
    const [starsRes, galaxiesRes] = await Promise.all([
      fetch(`${url}/stars`, { headers }),
      fetch(`${url}/galaxies`, { headers })
    ]);

    const starsJson = await starsRes.json();
    const galaxiesJson = await galaxiesRes.json();

    if (!starsRes.ok) {
      return { stars: null, galaxyMap: null, error: starsJson.message };
    }

    if (!galaxiesRes.ok) {
      return { stars: null, galaxyMap: null, error: galaxiesJson.message };
    }

    const galaxyMap = Object.fromEntries(
      galaxiesJson.data.map(c => [c.id, c.name])
    );

    console.log(galaxyMap);

    return {
      stars: starsJson,
      galaxyMap,
      error: null
    };
  } catch (err) {
    return {
      stars: null,
      galaxyMap: null,
      error: "Server is offline. Please try again later."
    }
  }
}