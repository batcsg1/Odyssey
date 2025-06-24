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
 *           example: "Orion"
 *         shape:
 *           type: string
 *           example: "Hunter"
 *         area:
 *           type: number
 *           format: float
 *           example: 594.0
 *         abbreviation:
 *           type: string
 *           example: "Ori"
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/v1.1/constellations:
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
 * /api/v1.1/constellations:
 *   get:
 *     summary: Get all constellations
 *     tags:
 *       - Constellation
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter constellations by name
 *       - in: query
 *         name: shape
 *         schema:
 *           type: string
 *         description: Filter constellations by shape
 *       - in: query
 *         name: area
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter constellations by area
 *       - in: query
 *         name: abbreviation
 *         schema:
 *           type: string
 *         description: Filter constellations by abbreviation
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [id, name, shape, area, abbreviation ]
 *         description: Field to sort the constellations by (default is 'id')
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Order to sort the constellations by (default is 'asc')
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: Page number (default is 1)
 *       - in: query
 *         name: amount
 *         schema:
 *           type: number
 *         description: Amount of constellations per page (default is 25)
 *     security:
 *       - BearerAuth: []
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
 * /api/v1.1/constellations/{id}:
 *   get:
 *     summary: Get a constellation by id
 *     tags:
 *       - Constellation
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
 *         description: No constellation found with the provided id
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1.1/constellations/{id}:
 *   put:
 *     summary: Update a constellation by id
 *     tags:
 *       - Constellation
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
 * /api/v1.1/constellations/{id}:
 *   patch:
 *     summary: Partially update a constellation by id
 *     tags:
 *       - Constellation
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
 * /api/v1.1/constellations/{id}:
 *   delete:
 *     summary: Delete a constellation by id
 *     tags:
 *       - Constellation
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
 *         description: Constellation successfully deleted
 *       '404':
 *         description: No constellation found with the provided id
 *       '500':
 *         description: Internal server error
 */
