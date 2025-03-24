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
 *         meteorVelocity:
 *           type: number
 *           format: float
 *           example: 59.8
 *         meteorsPerHour:
 *           type: integer
 *           example: 100
 *         peakDate:
 *           type: string
 *           format: date
 *           example: "2025-08-13"
 *         cometId:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174001"
 *         asteroidId:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174002"
 *         constellationId:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174003"
 */

/**
 * @swagger
 * /api/v1/meteor_showers:
 *   post:
 *     summary: Create a new meteor shower
 *     tags:
 *       - Meteor Shower
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
 * /api/v1/meteor_showers:
 *   get:
 *     summary: Get all meteor showers
 *     tags:
 *       - Meteor Shower
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
 * /api/v1/meteor_showers/{id}:
 *   get:
 *     summary: Get a meteor shower by id
 *     tags:
 *       - Meteor Shower
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
 * /api/v1/meteor_showers/{id}:
 *   put:
 *     summary: Update a meteor shower by id
 *     tags:
 *       - Meteor Shower
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
 * /api/v1/meteor_showers/{id}:
 *   delete:
 *     summary: Delete a meteor shower by id
 *     tags:
 *       - Meteor Shower
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
