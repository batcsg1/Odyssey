import { env } from "$env/dynamic/private";
import { error } from "@sveltejs/kit";
import { parse } from "svelte/compiler";
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

export const actions = {
  update: async ({ request, params, cookies, fetch }) => {
    const formData = await request.formData();
    const token = cookies.get("token") || null;

    const data = {
      name: formData.get("name"),
      shape: formData.get("shape"),
      area: parseFloat(formData.get("area")),
      abbreviation: formData.get("abbreviation")
    }

    try {
      const res = await fetch(`${url}/constellations/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(data)
      });

      const json = await res.json();

      if (!res.ok) {
        return { success: false, error: json.message };
      }

      return { success: true, constellation: json.data };

    } catch (err) {
      return { success: false, error: "Server is offline. Please try again later." };
    } 

  }
}

