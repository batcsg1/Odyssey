/**
 * @file Manages everything related to the API
 * @author Samuel Batchelor
 */

import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

//Importing routes
import indexRoutes from "./routes/v1/index.js";

import constellationRoutes from "./routes/v1/constellation.js";

import starRoutes from "./routes/v1/star.js";

import planetRoutes from "./routes/v1/planet.js";

import satelliteRoutes from "./routes/v1/satellite.js";

import asteroidRoutes from "./routes/v1/asteroid.js";

import meteoriteRoutes from "./routes/v1/meteorite.js";

import cometRoutes from "./routes/v1/comet.js";

import meteorShowerRoutes from "./routes/v1/meteor_shower.js";

import galaxyRoutes from "./routes/v1/galaxy.js";

//Authentication routes

import auth from "./middleware/auth.js";

import authRoutes from "./routes/v1/auth.js";

import logger from "./middleware/logger.js";

//JSON validation

import { isContentTypeApplicationJSON } from "./middleware/utils.js";

// Create an Express application
const app = express();

// Use the PORT environment variable or 3000
const PORT = process.env.PORT || 3000;

// Use JSON validation
app.use(isContentTypeApplicationJSON);

app.use(express.urlencoded({ extended: false })); 

app.use(express.json()); 

app.use(
  helmet({
    xPoweredBy: true,
  })
);

// This should be declared under - app.use( helmet({ xPoweredBy: true, }));
app.use(
  rateLimit({
    windowMs: 120, // 1 minutes
    max: 20, // limit each IP to 100 requests per windowMs
    message: "You have exceeded the number of requests: 20. Please try again in 120 seconds."
  })
);

// This should be declared under - const swaggerOptions = { ... };
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CelestiDB",
      version: "1.0.0",
      description: "API for data about the cosmos",
      contact: {
        name: "Samuel Batchelor",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/v1/*.js", "./swagger/*.js"]
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

//Base URL variable
const baseURL = "/api/v1";

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

//Use routes
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

//Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Start the server on port 3000
app.listen(PORT, () => {
  console.log(
    `Server is listening on port ${PORT}. Visit http://localhost:${PORT}${baseURL}`,
  );
});

//Link to Stack Overflow code for this:
//https://stackoverflow.com/questions/26079611/node-js-typeerror-path-must-be-absolute-or-specify-root-to-res-sendfile-failed
app.use((req, res) => {
  res.status(404).sendFile('404.html', { root: './handlers'});
});

export default app;