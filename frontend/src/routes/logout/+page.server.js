import { env } from "$env/dynamic/private";
import { redirect } from "@sveltejs/kit";
const url = env.API_BASE_URL || "http://localhost:3000";

export const actions = {
  default: async ({ cookies }) => {
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