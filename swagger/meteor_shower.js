/**
 * @swagger
 * components:
 *   schemas:
 *     MeteorShower:
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
 *     MeteorShowerResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/MeteorShower'
 *       required:
 *         - message
 *         - data
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         error:
 *           type: string
 *         details:
 *           type: array
 *           items:
 *             type: string
 * 
 * /api/v1/meteor-showers:
 *   post:
 *     summary: Create a new meteor shower
 *     tags:
 *       - MeteorShower
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MeteorShower'
 *     responses:
 *       '201':
 *         description: Meteor shower successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MeteorShowerResponse'
 *       '400':
 *         description: Meteor shower with the same name already exists
 *       '500':
 *         description: Internal server error
 * 
 *   get:
 *     summary: Get all meteor showers
 *     tags:
 *       - MeteorShower
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MeteorShowerResponse'
 *       '404':
 *         description: No meteor showers found
 *       '500':
 *         description: Internal server error
 * 
 * /api/v1/meteor-showers/{id}:
 *   get:
 *     summary: Get a meteor shower by id
 *     tags:
 *       - MeteorShower
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MeteorShowerResponse'
 *       '404':
 *         description: No meteor shower found with the provided id
 *       '500':
 *         description: Internal server error
 * 
 *   put:
 *     summary: Update a meteor shower by id
 *     tags:
 *       - MeteorShower
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
 *             $ref: '#/components/schemas/MeteorShower'
 *     responses:
 *       '200':
 *         description: Meteor shower successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MeteorShowerResponse'
 *       '404':
 *         description: No meteor shower found with the provided id
 *       '500':
 *         description: Internal server error
 * 
 *   delete:
 *     summary: Delete a meteor shower by id
 *     tags:
 *       - MeteorShower
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MeteorShowerResponse'
 *       '404':
 *         description: No meteor shower found with the provided id
 *       '500':
 *         description: Internal server error
 */
