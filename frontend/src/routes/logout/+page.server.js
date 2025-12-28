import { env } from "$env/dynamic/private";
import { redirect } from "@sveltejs/kit";
const url = env.API_BASE_URL || "http://localhost:3000";

export const actions = {
  default: async ({ cookies }) => {

    const token = cookies.get("token");

    if (token) {
      const res = await fetch(`${url}/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const json = await res.json();

      console.log(json.message);
    }

    // Remove the auth token
    cookies.delete("token", {
      path: "/",
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    // Redirect to login page
    throw redirect(302, "/login");
  },
};