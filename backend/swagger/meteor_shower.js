/**
 * @swagger
 * components:
 *   schemas:
 *     Meteor Shower:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         name:
 *           type: string
 *           example: "Perseid Meteor Shower"
 *         previousYear:
 *           type: integer
 *           example: 2024
 *         nextYear:
 *           type: integer
 *           example: 2026
 *         initialDate:
 *           type: string
 *           format: date
 *           example: "2025-08-12"
 *         finalDate:
 *           type: string
 *           format: date
 *           example: "2025-08-13"
 *         frequency:
 *           type: integer
 *           example: 1
 *         duration:
 *           type: integer
 *           example: 1
 *         velocity:
 *           type: number
 *           format: float
 *           example: 59.8
 *         perHour:
 *           type: integer
 *           example: 100
 *         peakDate:
 *           type: string
 *           format: date
 *           example: "2025-08-13"
 *         comets:
 *           type: string
 *           format: array
 *           example: [ "123e4567-e89b-12d3-a456-426614174003" ]
 *         asteroids:
 *           type: string
 *           format: array
 *           example: [ "123e8011-e89b-12d3-a981-426614174003" ]
 *         constellationId:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174003"
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/v1.0.0/meteor_showers:
 *   post:
 *     summary: Create a new meteor shower
 *     tags:
 *       - Meteor Shower
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Meteor Shower'
 *     responses:
 *       '201':
 *         description: Meteor shower successfully created
 *       '400':
 *         description: Meteor shower with the same name already exists
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1.0.0/meteor_showers:
 *   get:
 *     summary: Get all meteor showers
 *     tags:
 *       - Meteor Shower
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter meteor showers by name
 *       - in: query
 *         name: previousYear
 *         schema:
 *           type: number
 *         description: Filter meteor showers by previous year
 *       - in: query
 *         name: nextYear
 *         schema:
 *           type: number
 *         description: Filter meteor showers by next year
 *       - in: query
 *         name: frequency
 *         schema:
 *           type: number
 *         description: Filter meteor showers by frequency
 *       - in: query
 *         name: duration
 *         schema:
 *           type: number
 *         description: Filter meteor showers by duration
 *       - in: query
 *         name: velocity
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter meteor showers by velocity
 *       - in: query
 *         name: perHour
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter meteor showers by hourly frequency
 *       - in: query
 *         name: constellationId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter meteor showers by constellationId
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [id, name, previousYear, nextYear, frequency, duration, velocity, perHour, constellationId ]
 *         description: Field to sort the meteor showers by (default is 'id')
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Order to sort the meteor showers by (default is 'asc')
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: Page number (default is 1)
 *       - in: query
 *         name: amount
 *         schema:
 *           type: number
 *         description: Amount of meteor showers per page (default is 25)
 *     responses:
 *       '200':
 *         description: Success
 *       '404':
 *         description: No meteor showers found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1.0.0/meteor_showers/{id}:
 *   get:
 *     summary: Get a meteor shower by id
 *     tags:
 *       - Meteor Shower
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '200':
 *         description: Success
 *       '404':
 *         description: No meteor shower found with the provided id
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1.0.0/meteor_showers/{id}:
 *   put:
 *     summary: Update a meteor shower by id
 *     tags:
 *       - Meteor Shower
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Meteor Shower'
 *     responses:
 *       '200':
 *         description: Meteor shower successfully updated
 *       '404':
 *         description: No meteor shower found with the provided id
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1.0.0/meteor_showers/{id}:
 *   patch:
 *     summary: Partially update a meteor shower by id
 *     tags:
 *       - Meteor Shower
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Meteor Shower'
 *     responses:
 *       '200':
 *         description: Meteor shower successfully updated
 *       '404':
 *         description: No meteor shower found with the provided id
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1.0.0/meteor_showers/{id}:
 *   delete:
 *     summary: Delete a meteor shower by id
 *     tags:
 *       - Meteor Shower
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '200':
 *         description: Meteor shower successfully deleted
 *       '404':
 *         description: No meteor shower found with the provided id
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1.0.0/meteor_showers:
 *   options:
 *     summary: Get allowed HTTP methods for meteor showers route
 *     tags:
 *       - Meteor Shower
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '204':
 *         description: No Content - Indicates allowed HTTP methods for the resource
 *         headers:
 *           Allow:
 *             description: Allowed HTTP methods
 *             schema:
 *               type: string
 *               example: GET,POST,OPTIONS
 *           Access-Control-Allow-Origin:
 *             description: Allowed origins for CORS
 *             schema:
 *               type: string
 *               example: '*'
 *           Access-Control-Allow-Methods:
 *             description: Allowed HTTP methods
 *             schema:
 *               type: string
 *               example: GET,POST,OPTIONS
 *           Access-Control-Allow-Headers:
 *             description: Allowed headers for CORS
 *             schema:
 *               type: string
 *               example: Content-Type, Authorization
 */

/**
 * @swagger
 * /api/v1.0.0/meteor_showers:
 *   head:
 *     summary: Verify if any meteor showers exist
 *     tags:
 *       - Meteor Shower
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '204':
 *         description: Meteor showers exist
 *       '404':
 *         description: No meteor showers found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1.0.0/meteor_shower/{id}:
 *   head:
 *     summary: Verify meteor shower existence by ID
 *     tags:
 *       - Meteor Shower
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '204':
 *         description: Meteor Shower exists
 *       '404':
 *         description: Meteor Shower not found
 *       '500':
 *         description: Internal server error
 */

