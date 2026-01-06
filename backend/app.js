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

// Import middleware
import auth from "./middleware/auth.js";
import logger from "./middleware/logger.js";
import isContentTypeApplicationJSON from "./middleware/utils.js";
import syntax from "./middleware/syntax/syntax.js";
import cors from "cors"

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

// The base URL for the REST API
const baseURL = "/api/v1.0.0";

// Log all incoming requests using the custom logger
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

// Use routes
app.use(baseURL, indexRoutes);
app.use(`${baseURL}/auth`, authRoutes);

app.use(`${baseURL}/constellations`, constellationRoutes);
app.use(`${baseURL}/galaxies`, galaxyRoutes);
app.use(`${baseURL}/stars`, starRoutes);
app.use(`${baseURL}/planets`, planetRoutes);
app.use(`${baseURL}/satellites`, satelliteRoutes);
app.use(`${baseURL}/asteroids`, asteroidRoutes);
app.use(`${baseURL}/meteorites`, meteoriteRoutes);
app.use(`${baseURL}/comets`, cometRoutes);
app.use(`${baseURL}/meteor_showers`, meteorShowerRoutes);
app.use(`${baseURL}/users`, auth, userRoutes);

app.use('/uploads', express.static('uploads'));

app.use(
  "/uploads",
  (req, res, next) => {
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    next();
  },
  express.static(path.join(process.cwd(), "uploads"))
);

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