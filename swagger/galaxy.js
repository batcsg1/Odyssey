/**
 * @swagger
 * components:
 *   schemas:
 *     Galaxy:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         name:
 *           type: string
 *           example: "Milky Way"
 *         type:
 *           type: string
 *           example: "ELLIPTICAL"
 *         distance:
 *           type: number
 *           format: float
 *           example: 4e6
 *         size:
 *           type: number
 *           format: float
 *           example: 105700.0
 *         brightness:
 *           type: number
 *           format: float
 *           example: -26.74
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
 * /api/v1.1/galaxies:
 *   post:
 *     summary: Create a new galaxy
 *     tags:
 *       - Galaxy
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Galaxy'
 *     responses:
 *       '201':
 *         description: Galaxy successfully created
 *       '400':
 *         description: Galaxy with the same name already exists
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1.1/galaxies:
 *   get:
 *     summary: Get all galaxies
 *     tags:
 *       - Galaxy
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter galaxies by name
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter galaxies by type
 *       - in: query
 *         name: distance
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter galaxies by distance
 *       - in: query
 *         name: size
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter galaxies by size
 *       - in: query
 *         name: brightness
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter galaxies by brightness
 *       - in: query
 *         name: constellationId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter galaxies by constellationId
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [id, name, type, distance, size, brightness, constellationId ]
 *         description: Field to sort the galaxies by (default is 'id')
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Order to sort the galaxies by (default is 'asc')
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: Page number (default is 1)
 *       - in: query
 *         name: amount
 *         schema:
 *           type: number
 *         description: Amount of galaxies per page (default is 25)
 *     responses:
 *       '200':
 *         description: Success
 *       '404':
 *         description: No galaxies found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1.1/galaxies/{id}:
 *   get:
 *     summary: Get a galaxy by id
 *     tags:
 *       - Galaxy
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
 *         description: No galaxy found with the provided id
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1.1/galaxies/{id}:
 *   put:
 *     summary: Update a galaxy by id
 *     tags:
 *       - Galaxy
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
 *             $ref: '#/components/schemas/Galaxy'
 *     responses:
 *       '200':
 *         description: Galaxy successfully updated
 *       '404':
 *         description: No galaxy found with the provided id
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1.1/galaxies/{id}:
 *   patch:
 *     summary: Partially update a galaxy by id
 *     tags:
 *       - Galaxy
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
 *             $ref: '#/components/schemas/Galaxy'
 *     responses:
 *       '200':
 *         description: Galaxy successfully updated
 *       '404':
 *         description: No galaxy found with the provided id
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1.1/galaxies/{id}:
 *   delete:
 *     summary: Delete a galaxy by id
 *     tags:
 *       - Galaxy
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
 *         description: Galaxy successfully deleted
 *       '404':
 *         description: No galaxy found with the provided id
 *       '500':
 *         description: Internal server error
 */
