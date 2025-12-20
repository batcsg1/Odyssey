import { env } from "$env/dynamic/private";
import { error } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
const API_BASE = env.API_BASE_URL || "http://localhost:3000";

export const GET = async ({ params, url, fetch }) => {
  const { location } = params;
  const name = url.searchParams.get("name");

  try {
    const upstream = await fetch(
      `${API_BASE}/${location}?name=${encodeURIComponent(name)}`
    );

    const payload = await upstream.json();

    if (!upstream.ok) {
      return json(
        {
          data: null,
          message: payload.message
        },
        {
          status: upstream.status
        }
      );
    }

    return json({
      data: payload.data,
      message: null
    });
  } catch (err) {
    return json({
      data: null,
      message: "Server is offline. Please try again later."
    });
  }
};
