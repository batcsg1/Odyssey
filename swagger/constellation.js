/**
 * @swagger
 * components:
 *   schemas:
 *     Constellation:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         name:
 *           type: string
 *           example: Orion
 *         right_ascension:
 *           type: number
 *           format: float
 *           example: 5.5
 *         declination:
 *           type: number
 *           format: float
 *           example: -5.0
 *         shape:
 *           type: string
 *           example: "Hunter"
 *         area:
 *           type: number
 *           format: float
 *           example: 594.0
 * securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   security:
 *     - BearerAuth: []
 */

/**
 * @swagger
 * /api/v1/constellations:
 *   post:
 *     summary: Create a new constellation
 *     tags:
 *       - Constellation
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Constellation'
 *     responses:
 *       '201':
 *         description: Constellation successfully created
 *       '400':
 *         description: Constellation with the same name already exists
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/constellations:
 *   get:
 *     summary: Get all constellations
 *     tags:
 *       - Constellation
 *     responses:
 *       '200':
 *         description: Success
 *       '404':
 *         description: No constellations found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/constellations/{id}:
 *   get:
 *     summary: Get a constellation by id
 *     tags:
 *       - Constellation
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Success
 *       '404':
 *         description: No constellation found with the provided id
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/constellations/{id}:
 *   put:
 *     summary: Update a constellation by id
 *     tags:
 *       - Constellation
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Constellation'
 *     responses:
 *       '200':
 *         description: Constellation successfully updated
 *       '404':
 *         description: No constellation found with the provided id
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/constellations/{id}:
 *   delete:
 *     summary: Delete a constellation by id
 *     tags:
 *       - Constellation
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Constellation successfully deleted
 *       '404':
 *         description: No constellation found with the provided id
 *       '500':
 *         description: Internal server error
 */
