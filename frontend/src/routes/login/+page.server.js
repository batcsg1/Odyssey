import { env } from "$env/dynamic/private";
import { error } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";
const url = env.API_BASE_URL || "http://localhost:3000";

export const actions = {

    login: async ({ request, cookies, fetch }) => {
        const formData = await request.formData();

        const data = {
            emailAddress: formData.get("email"),
            password: formData.get("password")
        }

        let json, token = null;

        try {
            const res = await fetch(`${url}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!res.ok) {
                return { error: json.message };
            }

            json = await res.json();
            token = json.token;

        } catch (err) {
            return { error: "Server is offline. Please try again later." };
        }

        cookies.set("token", token, {
            httpOnly: true,
            path: "/",
            secure: false,
            sameSite: "lax",
            maxAge: 60 * 60 * 24
        });

        throw redirect(302, "/");

    }
}