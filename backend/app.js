/**
 * @file Manages everything related to the API
 * @author Samuel Batchelor
 */

import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import helmet from "helmet";
import path from "path"

// Import routes
import indexRoutes from "./routes/v1.0.0/index.js";
import constellationRoutes from "./routes/v1.0.0/constellation.js";
import starRoutes from "./routes/v1.0.0/star.js";
import planetRoutes from "./routes/v1.0.0/planet.js";
import satelliteRoutes from "./routes/v1.0.0/satellite.js";
import asteroidRoutes from "./routes/v1.0.0/asteroid.js";
import meteoriteRoutes from "./routes/v1.0.0/meteorite.js";
import cometRoutes from "./routes/v1.0.0/comet.js";
import meteorShowerRoutes from "./routes/v1.0.0/meteor_shower.js";
import galaxyRoutes from "./routes/v1.0.0/galaxy.js";
import userRoutes from "./routes/v1.0.0/user.js";
import authRoutes from "./routes/v1.0.0/auth.js";
import uploadRoutes from "./routes/v1.0.0/upload.js"

// Import middleware
import auth from "./middleware/auth.js";
import logger from "./middleware/logger.js";
import isContentTypeApplicationJSON from "./middleware/utils.js";
import syntax from "./middleware/syntax/syntax.js";
import cors from "./middleware/cors/cors.js"

// Create an Express application
const app = express();

// The port the server listens on
const PORT = process.env.PORT || 3000;
// The base URL for the REST API
const API_BASE_URL = process.env.API_BASE_URL || "http://localhost";
// The base route for the REST API
const API_BASE_ROUTE = "/api/v1.0.0";
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
      title: "Odyssey API",
      version: "1.0.0",
      description: "A high performance platform for exploring the universe.",
      contact: {
        name: "Samuel Batchelor",
      },
    },
  },
  apis: ["./routes/v1.0.0/*.js", "./swagger/*.js"]
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);



// Log all incoming requests using the custom logger
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

// Use routes
app.use(API_BASE_ROUTE, indexRoutes);
app.use(`${API_BASE_ROUTE}/auth`, authRoutes);

app.use(`${API_BASE_ROUTE}/constellations`, constellationRoutes);
app.use(`${API_BASE_ROUTE}/galaxies`, galaxyRoutes);
app.use(`${API_BASE_ROUTE}/stars`, starRoutes);
app.use(`${API_BASE_ROUTE}/planets`, planetRoutes);
app.use(`${API_BASE_ROUTE}/satellites`, satelliteRoutes);
app.use(`${API_BASE_ROUTE}/asteroids`, asteroidRoutes);
app.use(`${API_BASE_ROUTE}/meteorites`, meteoriteRoutes);
app.use(`${API_BASE_ROUTE}/comets`, cometRoutes);
app.use(`${API_BASE_ROUTE}/meteor_showers`, meteorShowerRoutes);
app.use(`${API_BASE_ROUTE}/users`, auth, userRoutes);
app.use(`${API_BASE_ROUTE}/upload`, uploadRoutes)

// Serve static files
app.use('/uploads', cors, express.static('uploads'));

app.use("/api-docs", swaggerUi.serve, (req, res, next) => {
  const dynamicServer = { ...swaggerDocs };

  dynamicServer.servers = [
    {
      url: `${req.protocol}://${req.get("host")}${req.get("X-Forwarded-Prefix") || ""}`,
    },
  ];

  swaggerUi.setup(dynamicServer)(req, res, next);
});

// Start the server on defined port
app.listen(PORT, () => {
  console.log(
    `Server is listening on port ${PORT}. Visit ${API_BASE_URL}:${PORT}${API_BASE_ROUTE}`,
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