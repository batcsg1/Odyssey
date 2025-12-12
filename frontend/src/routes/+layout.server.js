import { env } from "$env/dynamic/private";
const url = env.API_URL || "http://localhost:3000";

export const load = async ({ cookies, fetch }) => {
  const token = cookies.get("token") || null;

  let user = [];

  const solar_system = [
    {
      "header": "WELCOME TO THE SOLAR SYSTEM",
      "description": "Dive into the wonders of our Solar System! From the blazing Sun to the icy comets, explore detailed information about planets, moons, asteroids, and more."
    },
    {
      "header": "WHAT IS THE SOLAR SYSTEM?",
      "description": "The Solar System</strong> is the area of space where we live, consisting of the Sun, eight planets, including our home planet Earth, and many more celestial bodies.Our Solar System formed about 4.6 billion years ago from a giant cloud of gas and dust, and it continues to captivate scientists and enthusiasts alike with its mysteries and wonders."
    }
  ];

  return {
    solar_system
  };
}