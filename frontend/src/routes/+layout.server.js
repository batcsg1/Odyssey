import { env } from "$env/dynamic/private";
import { error } from "@sveltejs/kit";
const url = env.API_BASE_URL || "http://localhost:3000";

