/**
 * @swagger
 * components:
 *   schemas:
 *     Asteroid:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         name:
 *           type: string
 *           example: "METALLIC"
 *         age:
 *           type: number
 *           format: float
 *           example: 4600000000
 *         mass:
 *           type: number
 *           format: float
 *           example: 9.39e20
 *         diameter:
 *           type: number
 *           format: float
 *           example: 940
 *         density:
 *           type: number
 *           format: float
 *           example: 2.08
 *         type:
 *           type: string
 *           example: "Dwarf Planet"
 *         year:
 *           type: number
 *           format: float
 *           example: 5.939
 *         perigee:
 *           type: number
 *           format: float
 *           example: 3.07e5
 *         apogee:
 *           type: number
 *           format: float
 *           example: 4.56e5
 *         location:
 *           type: string
 *           example: "Asteroid Belt"
 *         brightness:
 *           type: number
 *           format: float
 *           example: -26.74
 *         starId:
 *           type: string
 *           format: uuid
 *           example: "abcde12345-xyz6789"
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/v1/asteroids:
 *   post:
 *     summary: Create a new asteroid
 *     tags:
 *       - Asteroid
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Asteroid'
 *     responses:
 *       '201':
 *         description: Asteroid successfully created
 *       '400':
 *         description: Asteroid with the same name already exists
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/asteroids:
 *   get:
 *     summary: Get all asteroids
 *     tags:
 *       - Asteroid
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter asteroids by name
 *       - in: query
 *         name: age
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter asteroids by age
 *       - in: query
 *         name: mass
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter asteroids by mass
 *       - in: query
 *         name: diameter
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter asteroids by diameter
 *       - in: query
 *         name: density
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter asteroids by density
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter asteroids by type
 *       - in: query
 *         name: year
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter asteroids by orbital period
 *       - in: query
 *         name: perigee
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter asteroids by perigee
 *       - in: query
 *         name: apogee
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter asteroids by apogee
 *       - in: query
 *         name: brightness
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter asteroids by brightness
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Filter asteroids by location
 *       - in: query
 *         name: starId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter asteroids by starId
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [id, name, age, mass, diameter, density, type, year, perigee, apogee, day, brightness, location, starId ]
 *         description: Field to sort the asteroids by (default is 'id')
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Order to sort the asteroids by (default is 'asc')
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: Page number (default is 1)
 *       - in: query
 *         name: amount
 *         schema:
 *           type: number
 *         description: Amount of asteroids per page (default is 25)
 *     responses:
 *       '200':
 *         description: Success
 *       '404':
 *         description: No asteroids found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/asteroids/{id}:
 *   get:
 *     summary: Get an asteroid by id
 *     tags:
 *       - Asteroid
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
 *         description: No asteroid found with the provided id
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/asteroids/{id}:
 *   put:
 *     summary: Update an asteroid by id
 *     tags:
 *       - Asteroid
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
 *             $ref: '#/components/schemas/Asteroid'
 *     responses:
 *       '200':
 *         description: Asteroid successfully updated
 *       '404':
 *         description: No asteroid found with the provided id
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/asteroids/{id}:
 *   delete:
 *     summary: Delete an asteroid by id
 *     tags:
 *       - Asteroid
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
 *         description: Asteroid successfully deleted
 *       '404':
 *         description: No asteroid found with the provided id
 *       '500':
 *         description: Internal server error
 */
