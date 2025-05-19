/**
 * @swagger
 * components:
 *   schemas:
 *     Star:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         name:
 *           type: string
 *           example: "Sun"
 *         age:
 *           type: number
 *           format: float
 *           example: 4.6e9
 *         mass:
 *           type: number
 *           format: float
 *           example: 1
 *         diameter:
 *           type: number
 *           format: float
 *           example: 1
 *         type:
 *           type: string
 *           example: "MAIN_SEQUENCE"
 *         distance:
 *           type: number
 *           format: float
 *           example: 1.3e10
 *         temperature:
 *           type: number
 *           format: float
 *           example: 5778
 *         luminosity:
 *           type: number
 *           format: float
 *           example: 1.0
 *         hasPlanets:
 *           type: boolean
 *           example: true
 *         brightness:
 *           type: number
 *           format: float
 *           example: -26.74
 *         constellationId:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         galaxyId:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/v1/stars:
 *   post:
 *     summary: Create a new star
 *     tags:
 *       - Star
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Star'
 *     responses:
 *       '201':
 *         description: Star successfully created
 *       '400':
 *         description: Star with the same name already exists
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/stars:
 *   get:
 *     summary: Get all stars
 *     tags:
 *       - Star
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter stars by name
 *       - in: query
 *         name: age
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter stars by age
 *       - in: query
 *         name: mass
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter stars by mass
 *       - in: query
 *         name: diameter
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter stars by diameter
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter stars by type
 *       - in: query
 *         name: distance
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter stars by distance
 *       - in: query
 *         name: temperature
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter stars by temperature
 *       - in: query
 *         name: luminosity
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter stars by luminosity
 *       - in: query
 *         name: hasPlanets
 *         schema:
 *           type: boolean
 *         description: Filter stars by ones that have planets
 *       - in: query
 *         name: brightness
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter stars by brightness
 *       - in: query
 *         name: constellationId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter stars by constellationId
 *       - in: query
 *         name: galaxyId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter stars by galaxyId
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [id, name, age, mass, diameter, type, distance, temperature, luminosity, hasPlanets, brightness, constellationId, galaxyId ]
 *         description: Field to sort the stars by (default is 'id')
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Order to sort the stars by (default is 'asc')
 *     responses:
 *       '200':
 *         description: Success
 *       '404':
 *         description: No stars found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/stars/{id}:
 *   get:
 *     summary: Get a star by id
 *     tags:
 *       - Star
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
 *         description: No star found with the provided id
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/stars/{id}:
 *   put:
 *     summary: Update a star by id
 *     tags:
 *       - Star
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
 *             $ref: '#/components/schemas/Star'
 *     responses:
 *       '200':
 *         description: Star successfully updated
 *       '404':
 *         description: No star found with the provided id
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/stars/{id}:
 *   delete:
 *     summary: Delete a star by id
 *     tags:
 *       - Star
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
 *         description: Star successfully deleted
 *       '404':
 *         description: No star found with the provided id
 *       '500':
 *         description: Internal server error
 */
