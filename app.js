/**
 * @file Manages everything related to the API
 * @author Samuel Batchelor
 */

import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import helmet from "helmet";

// Import routes
import indexRoutes from "./routes/v1.1/index.js";
import constellationRoutes from "./routes/v1.1/constellation.js";
import starRoutes from "./routes/v1.1/star.js";
import planetRoutes from "./routes/v1.1/planet.js";
import satelliteRoutes from "./routes/v1.1/satellite.js";
import asteroidRoutes from "./routes/v1.1/asteroid.js";
import meteoriteRoutes from "./routes/v1.1/meteorite.js";
import cometRoutes from "./routes/v1.1/comet.js";
import meteorShowerRoutes from "./routes/v1.1/meteor_shower.js";
import galaxyRoutes from "./routes/v1.1/galaxy.js";
import userRoutes from "./routes/v1.1/user.js";
import authRoutes from "./routes/v1.1/auth.js";

// Import middleware
import auth from "./middleware/auth.js";
import logger from "./middleware/logger.js";
import isContentTypeApplicationJSON from "./middleware/utils.js";
import syntax from "./middleware/syntax/syntax.js";

// Create an Express application
const app = express();

// The port the server listens on
const PORT = process.env.PORT || 3000;

// Use JSON validation
app.use(isContentTypeApplicationJSON);

// Parse URL-encoded and JSON request bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Add security headers using Helmet
app.use(
  helmet({
    xPoweredBy: true,
  })
);

// Swagger documentation config
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CelestiDB",
      version: "1.1",
      description: "An API for accessing data about stars, planets and more.",
      contact: {
        name: "Samuel Batchelor",
      },
    },
    servers: [
      {
        url: process.env.APP_ENV === "production"
          ? "https://celestidb-api.onrender.com"
          : `http://localhost:${PORT}`
      },
    ],
  },
  apis: ["./routes/v1.1/*.js", "./swagger/*.js"]
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

// The base URL for the REST API
const baseURL = "/api/v1.1";

// Log all incoming requests using the custom logger
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

// Use routes
app.use(baseURL, indexRoutes);
app.use(`${baseURL}/auth`, authRoutes);

app.use(`${baseURL}/constellations`, auth, constellationRoutes);
app.use(`${baseURL}/galaxies`, auth, galaxyRoutes);
app.use(`${baseURL}/stars`, auth, starRoutes);
app.use(`${baseURL}/planets`, auth, planetRoutes);
app.use(`${baseURL}/satellites`, auth, satelliteRoutes);
app.use(`${baseURL}/asteroids`, auth, asteroidRoutes);
app.use(`${baseURL}/meteorites`, auth, meteoriteRoutes);
app.use(`${baseURL}/comets`, auth, cometRoutes);
app.use(`${baseURL}/meteor_showers`, auth, meteorShowerRoutes);
app.use(`${baseURL}/users`, auth, userRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Start the server on defined port
app.listen(PORT, () => {
  console.log(
    `Server is listening on port ${PORT}. Visit http://localhost:${PORT}${baseURL}`,
  );
});

/**
 * Catch for 404 routes by serving a custom error page
 * @see https://stackoverflow.com/questions/26079611/node-js-typeerror-path-must-be-absolute-or-specify-root-to-res-sendfile-failed
*/
app.use((req, res) => {
  res.status(404).sendFile('404.html', { root: './html' });
});

// Catch for invalid request body syntax 
app.use(syntax);

export default app;