import { form } from "$app/server";
import { env } from "$env/dynamic/private";
import { error } from "@sveltejs/kit";
import { parse } from "svelte/compiler";
const url = env.API_BASE_URL || "http://localhost:3000";

export const load = async ({ params, cookies, fetch }) => {
  const { id } = params;
  const token = cookies.get("token") || null;

  try {
    const res = await fetch(`${url}/galaxies/${id}`, {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    });

    const json = await res.json();

    if (!res.ok) {
      return {
        galaxy: null,
        error: json.message
      };
    }

    return {
      galaxy: json.data,
      error: null
    };
  } catch (err) {
    return {
      galaxy: null,
      error: "Server is offline. Please try again later."
    }
  }
}

export const actions = {
  update: async ({ request, params, cookies, fetch }) => {
    const { id } = params;
    const formData = await request.formData();
    const token = cookies.get("token") || null;

    const constellationId = formData.get("constellations") ?? formData.get("constellationId");

    const data = {
      name: formData.get("name"),
      type: formData.get("type"),
      distance: parseInt(formData.get("distance")),
      size: parseInt(formData.get("size")),
      brightness: parseFloat(formData.get("brightness")),
    }

    constellationId && (data.constellationId = constellationId);

    try {
      const res = await fetch(`${url}/galaxies/${id}`, {
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

      return { success: true, galaxy: json.data };

    } catch (err) {
      return { success: false, error: "Server is offline. Please try again later." };
    } 

  }
}

