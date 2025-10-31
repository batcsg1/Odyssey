/**
 * @swagger
 * components:
 *   schemas:
 *     Planet:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         name:
 *           type: string
 *           example: "Earth"
 *         age:
 *           type: number
 *           format: float
 *           example: 4.54
 *         mass:
 *           type: number
 *           format: float
 *           example: 5.972e24
 *         diameter:
 *           type: number
 *           format: float
 *           example: 12742.0
 *         density:
 *           type: number
 *           format: float
 *           example: 5.51
 *         type:
 *           type: string
 *           example: "TERRESTIAL"
 *         atmosphere:
 *           type: boolean
 *           example: true
 *         year:
 *           type: number
 *           format: float
 *           example: 365.25
 *         perigee:
 *           type: number
 *           format: float
 *           example: 3
 *         apogee:
 *           type: number
 *           format: float
 *           example: 6
 *         tilt:
 *           type: number
 *           format: float
 *           example: 23.44
 *         hasSatellites:
 *           type: boolean
 *           example: true
 *         minTemp:
 *           type: number
 *           format: float
 *           example: -89.2
 *         maxTemp:
 *           type: number
 *           format: float
 *           example: 56.7
 *         gravity:
 *           type: number
 *           format: float
 *           example: 9.81
 *         day:
 *           type: number
 *           format: float
 *           example: 24.0
 *         brightness:
 *           type: number
 *           format: float
 *           example: -26.74
 *         location:
 *           type: string
 *           example: "INNER_SOLAR_SYSTEM"
 *         habitable:
 *           type: boolean
 *           example: true
 *         starId:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         users:
 *           type: string
 *           format: array
 *           example: ["123e4567-e89b-12d3-a456-426614174000"]
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/v1.2/planets:
 *   post:
 *     summary: Create a new planet
 *     tags:
 *       - Planet
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Planet'
 *     responses:
 *       '201':
 *         description: Planet successfully created
 *       '400':
 *         description: Planet with the same name already exists
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1.2/planets:
 *   get:
 *     summary: Get all planets
 *     tags:
 *       - Planet
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter planets by name
 *       - in: query
 *         name: age
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter planets by age
 *       - in: query
 *         name: mass
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter planets by mass
 *       - in: query
 *         name: diameter
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter planets by diameter
 *       - in: query
 *         name: density
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter planets by density
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter planets by type
 *       - in: query
 *         name: atmosphere
 *         schema:
 *           type: boolean
 *         description: Filter planets by atmosphere
 *       - in: query
 *         name: year
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter planets by orbital period
 *       - in: query
 *         name: perigee
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter planets by perigee
 *       - in: query
 *         name: apogee
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter planets by apogee
 *       - in: query
 *         name: tilt
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter planets by tilt
 *       - in: query
 *         name: hasSatellites
 *         schema:
 *           type: boolean
 *         description: Filter planets that have satellites
 *       - in: query
 *         name: minTemp
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter planets by minimum temperature
 *       - in: query
 *         name: maxTemp
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter planets by maximum temperature
 *       - in: query
 *         name: gravity
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter planets by gravity
 *       - in: query
 *         name: day
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter planets by rotational period
 *       - in: query
 *         name: brightness
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter planets by brightness
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Filter planets by location
 *       - in: query
 *         name: habitable
 *         schema:
 *           type: boolean
 *         description: Filter planets by habitibility
 *       - in: query
 *         name: starId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter planets by starId
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [id, name, age, mass, diameter, density, type, atmosphere, year, perigee, apogee, tilt, hasSatellites, minTemp, maxTemp, gravity, day, brightness, location, habitable, starId ]
 *         description: Field to sort the planets by (default is 'id')
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Order to sort the planets by (default is 'asc')
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: Page number (default is 1)
 *       - in: query
 *         name: amount
 *         schema:
 *           type: number
 *         description: Amount of planets per page (default is 25)
 *     responses:
 *       '200':
 *         description: Success
 *       '404':
 *         description: No planets found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1.2/planets/{id}:
 *   get:
 *     summary: Get a planet by id
 *     tags:
 *       - Planet
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
 *         description: No planet found with the provided id
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1.2/planets/{id}:
 *   put:
 *     summary: Update a planet by id
 *     tags:
 *       - Planet
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
 *             $ref: '#/components/schemas/Planet'
 *     responses:
 *       '200':
 *         description: Planet successfully updated
 *       '404':
 *         description: No planet found with the provided id
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1.2/planets/{id}:
 *   patch:
 *     summary: Partially update a planet by id
 *     tags:
 *       - Planet
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
 *             $ref: '#/components/schemas/Planet'
 *     responses:
 *       '200':
 *         description: Planet successfully updated
 *       '404':
 *         description: No planet found with the provided id
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1.2/planets/{id}:
 *   delete:
 *     summary: Delete a planet by id
 *     tags:
 *       - Planet
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
 *         description: Planet successfully deleted
 *       '404':
 *         description: No planet found with the provided id
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1.2/planets:
 *   options:
 *     summary: Get allowed HTTP methods for planets route
 *     tags:
 *       - Planet
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
 * /api/v1.2/planets:
 *   head:
 *     summary: Verify if any planets exist
 *     tags:
 *       - Planet
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '204':
 *         description: Planets exist
 *       '404':
 *         description: No planets found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1.2/planets/{id}:
 *   head:
 *     summary: Verify planet existence by ID
 *     tags:
 *       - Planet
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
 *         description: Planet exists
 *       '404':
 *         description: Planet not found
 *       '500':
 *         description: Internal server error
 */

