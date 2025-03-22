/**
 * @file Manages everything related to the API
 * @author Samuel Batchelor
 */

import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

//Importing routes
import indexRoutes from "./routes/v1/index.js";

import constellationRoutes from "./routes/v1/constellation.js";

import starRoutes from "./routes/v1/star.js";

import planetRoutes from "./routes/v1/planet.js";

import dPlanetRoutes from "./routes/v1/dplanet.js";

import { isContentTypeApplicationJSON } from "./middleware/utils.js";

// Create an Express application
const app = express();

// Use the PORT environment variable or 3000
const PORT = process.env.PORT || 3000;

app.use(isContentTypeApplicationJSON);

app.use(express.urlencoded({ extended: false })); 
app.use(express.json()); 

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

//Use routes
app.use("/api/v1", indexRoutes);

app.use("/api/v1/constellations", constellationRoutes);

app.use("/api/v1/stars", starRoutes);

app.use("/api/v1/planets", planetRoutes);

app.use("/api/v1/dwarfplanets", dPlanetRoutes);

//Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Start the server on port 3000
app.listen(PORT, () => {
  console.log(
    `Server is listening on port ${PORT}. Visit http://localhost:${PORT}/api/v1`,
  );
});

export default app;