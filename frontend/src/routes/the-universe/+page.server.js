export async function load() {
  const solar_system = [
    {
      "header": "Welcome to our universe!",
      "description": "Dive into the wonders of our Universe. From blazing hot supergiant stars, to fiery and raging comets racing around our solar system, the possibiities are infinite."
    },
    {
      "header": "What is the universe?",
      "description": "The Universe, also known as the 'Observable Universe', is a vast area in space, stretching 93 billion light-years across, that contains everything that we know of and can see from here on Earth."
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