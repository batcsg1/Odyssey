import { env } from "$env/dynamic/private";
const url = env.API_URL || "http://localhost:3000";

export const load = async ({ cookies, fetch }) => {
  const token = cookies.get("token") || null;

  let user = [];

}