import { env } from "$env/dynamic/private";
import { error } from "@sveltejs/kit";
const url = env.API_BASE_URL || "http://localhost:3000";

export const load = async ({ cookies, fetch }) => {
    const token = cookies.get("token");

    if (!token) {
        return { user: null };
    }

    try {
        const res = await fetch(`${url}/auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const json = await res.json();

        if (!res.ok) {
            return {
                user: null,
                error: json.message
            };
        }

        return {
            user: json.data,
            error: null
        }
    } catch (err) {
        return {
            user: null,
            error: "Server is offline. Please try again later."
        }
    }
}

