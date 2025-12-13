export async function load() {
  const solar_system = [
    {
      "header": "WELCOME TO THE SOLAR SYSTEM",
      "description": "Dive into the wonders of our Solar System! From the blazing Sun to the icy comets, explore detailed information about planets, moons, asteroids, and more."
    },
    {
      "header": "WHAT IS THE SOLAR SYSTEM?",
      "description": "The Solar System is the area of space where we live, consisting of the Sun, eight planets, including our home planet Earth, and many more celestial bodies.Our Solar System formed about 4.6 billion years ago from a giant cloud of gas and dust, and it continues to captivate scientists and enthusiasts alike with its mysteries and wonders."
    }
  ];

  const cards = [
    {
      "title": "Constellations",
      "text": "Descriptions and details about constellations.",
      "url": "/constellations"
    },
    {
      "title": "Galaxies",
      "text": "Descriptions and details about galaxies.",
      "url": "/galaxies"
    },
    {
      "title": "Stars",
      "text": "Descriptions and details about stars.",
      "url": "/stars"
    },
    {
      "title": "Planets",
      "text": "Descriptions and details about planets.",
      "url": "/planets"
    },
    {
      "title": "Satellites",
      "text": "Descriptions and details about satellites.",
      "url": "/satellites"
    },
    {
      "title": "Comets",
      "text": "Descriptions and details about comets.",
      "url": "/comets"
    },
    {
      "title": "Asteroids",
      "text": "Descriptions and details about asteroids.",
      "url": "/asteroids"
    },
    {
      "title": "Meteorites",
      "text": "Descriptions and details about meteorites.",
      "url": "/meteorites"
    },
    {
      "title": "Meteor Showers",
      "text": "Descriptions and details about meteor showers.",
      "url": "/meteor-showers"
    }
  ];

  return {
    solar_system, cards
  };
}