/**
 * @swagger
 * components:
 *   schemas:
 *     Comet:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         name:
 *           type: string
 *           example: "Halley's Comet"
 *         age:
 *           type: number
 *           format: float
 *           example: 4600000000
 *         mass:
 *           type: number
 *           format: float
 *           example: 2.2e14
 *         diameter:
 *           type: number
 *           format: float
 *           example: 11
 *         density:
 *           type: number
 *           format: float
 *           example: 0.6
 *         type:
 *           type: string
 *           example: "SHORT_PERIOD"
 *         year:
 *           type: number
 *           example: 1986
 *         perigee:
 *           type: number
 *           format: float
 *           example: 1.3e8
 *         apogee:
 *           type: number
 *           format: float
 *           example: 5.5e8
 *         brightness:
 *           type: number
 *           format: float
 *           example: -26.74
 *         location:
 *           type: string
 *           example: "OORT_CLOUD"
 *         starId:
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
 * /api/v1.1/comets:
 *   post:
 *     summary: Create a new comet
 *     tags:
 *       - Comet
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comet'
 *     responses:
 *       '201':
 *         description: Comet successfully created
 *       '400':
 *         description: Comet with the same name already exists
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1.1/comets:
 *   get:
 *     summary: Get all comets
 *     tags:
 *       - Comet
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter comets by name
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
 *         description: Filter comets by mass
 *       - in: query
 *         name: diameter
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter comets by diameter
 *       - in: query
 *         name: density
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter comets by density
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter comets by type
 *       - in: query
 *         name: year
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter comets by orbital period
 *       - in: query
 *         name: perigee
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter comets by perigee
 *       - in: query
 *         name: apogee
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter comets by apogee
 *       - in: query
 *         name: brightness
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter comets by brightness
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Filter comets by location
 *       - in: query
 *         name: starId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter comets by starId
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [id, name, age, mass, diameter, density, type, year, perigee, apogee, day, brightness, location, starId ]
 *         description: Field to sort the comets by (default is 'id')
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Order to sort the comets by (default is 'asc')
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: Page number (default is 1)
 *       - in: query
 *         name: amount
 *         schema:
 *           type: number
 *         description: Amount of comets per page (default is 25)
 *     responses:
 *       '200':
 *         description: Success
 *       '404':
 *         description: No comets found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1.1/comets/{id}:
 *   get:
 *     summary: Get a comet by id
 *     tags:
 *       - Comet
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
 *         description: No comet found with the provided id
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1.1/comets/{id}:
 *   put:
 *     summary: Update a comet by id
 *     tags:
 *       - Comet
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
 *             $ref: '#/components/schemas/Comet'
 *     responses:
 *       '200':
 *         description: Comet successfully updated
 *       '404':
 *         description: No comet found with the provided id
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1.1/comets/{id}:
 *   patch:
 *     summary: Partially update a comet by id
 *     tags:
 *       - Comet
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
 *             $ref: '#/components/schemas/Comet'
 *     responses:
 *       '200':
 *         description: Comet successfully updated
 *       '404':
 *         description: No comet found with the provided id
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1.1/comets/{id}:
 *   delete:
 *     summary: Delete a comet by id
 *     tags:
 *       - Comet
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
 *         description: Comet successfully deleted
 *       '404':
 *         description: No comet found with the provided id
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1.1/comets:
 *   options:
 *     summary: Get allowed HTTP methods for comets route
 *     tags:
 *       - Comet
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
 * /api/v1.1/comets:
 *   head:
 *     summary: Verify if any comets exist
 *     tags:
 *       - Comet
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '204':
 *         description: Comets exist
 *       '404':
 *         description: No comets found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1.1/comets/{id}:
 *   head:
 *     summary: Verify comet existence by ID
 *     tags:
 *       - Comet
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
 *         description: Comet exists
 *       '404':
 *         description: Comet not found
 *       '500':
 *         description: Internal server error
 */

