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

import satelliteRoutes from "./routes/v1/satellite.js";

import asteroidRoutes from "./routes/v1/asteroid.js";

import meteoriteRoutes from "./routes/v1/meteorite.js";

import cometRoutes from "./routes/v1/comet.js";

import meteorShowerRoutes from "./routes/v1/meteor_shower.js";

import auth from "./middleware/auth.js";

import authRoutes from "./routes/v1/auth.js";

import logger from "./middleware/logger.js";

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

//Base URL variable
const baseURL = "/api/v1";

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

//Use routes
app.use(baseURL, indexRoutes);

app.use(`${baseURL}/constellations`, constellationRoutes);

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


app.use((req, res) => {
  res.status(404).send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>404 - Not Found</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            color: #333;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
          }
          .container {
            text-align: center;
            padding: 30px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
          }
          h1 {
            font-size: 100px;
            margin-bottom: 10px;
            color: #e74c3c;
          }
          p {
            font-size: 18px;
            margin-bottom: 20px;
          }
          a {
            font-size: 16px;
            color: #3498db;
            text-decoration: none;
            border: 1px solid #3498db;
            padding: 10px 15px;
            border-radius: 5px;
          }
          a:hover {
            background-color: #3498db;
            color: #fff;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>404</h1>
          <p>Oops! The page you requested does not exist.</p>
          <a href="/">Go back to the homepage</a>
        </div>
      </body>
    </html>
  `);
});

export default app;