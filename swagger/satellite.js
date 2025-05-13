/**
 * @swagger
 * components:
 *   schemas:
 *     Satellite:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         name:
 *           type: string
 *           example: "MOON"
 *         age:
 *           type: number
 *           format: float
 *           example: 4.53
 *         mass:
 *           type: number
 *           format: float
 *           example: 7.35e22
 *         diameter:
 *           type: number
 *           format: float
 *           example: 3474.2
 *         density:
 *           type: number
 *           format: float
 *           example: 3.34
 *         type:
 *           type: string
 *           example: "MOON"
 *         atmosphere:
 *           type: boolean
 *           example: true
 *         year:
 *           type: number
 *           format: float
 *           example: 27.32
 *         perigee:
 *           type: number
 *           format: float
 *           example: 363300.0
 *         apogee:
 *           type: number
 *           format: float
 *           example: 405500.0
 *         tilt:
 *           type: number
 *           format: float
 *           example: 6.68
 *         minTemp:
 *           type: number
 *           format: float
 *           example: -233.0
 *         maxTemp:
 *           type: number
 *           format: float
 *           example: 127.0
 *         gravity:
 *           type: number
 *           format: float
 *           example: 1.62
 *         day:
 *           type: number
 *           format: float
 *           example: 655.72
 *         brightness:
 *           type: number
 *           format: float
 *           example: -26.74
 *         location:
 *           type: string
 *           example: "OUTER_SOLAR_SYSTEM"
 *         habitable:
 *           type: boolean
 *           example: false
 *         planetId:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 */

/**
 * @swagger
 * /api/v1/satellites:
 *   post:
 *     summary: Create a new satellite
 *     tags:
 *       - Satellite
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Satellite'
 *     responses:
 *       '201':
 *         description: Satellite successfully created
 *       '400':
 *         description: Satellite with the same name already exists
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/satellites:
 *   get:
 *     summary: Get all satellites
 *     tags:
 *       - Satellite
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter satellites by name
 *       - in: query
 *         name: age
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter satellites by age
 *       - in: query
 *         name: mass
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter satellites by mass
 *       - in: query
 *         name: diameter
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter satellites by diameter
 *       - in: query
 *         name: density
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter satellites by density
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter satellites by type
 *       - in: query
 *         name: atmosphere
 *         schema:
 *           type: boolean
 *         description: Filter satellites by atmosphere
 *       - in: query
 *         name: year
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter satellites by orbital period
 *       - in: query
 *         name: perigee
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter satellites by perigee
 *       - in: query
 *         name: apogee
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter satellites by apogee
 *       - in: query
 *         name: tilt
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter satellites by tilt
 *       - in: query
 *         name: minTemp
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter satellites by minimum temperature
 *       - in: query
 *         name: maxTemp
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter satellites by maximum temperature
 *       - in: query
 *         name: gravity
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter satellites by gravity
 *       - in: query
 *         name: day
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter satellites by rotational period
 *       - in: query
 *         name: brightness
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter satellites by brightness
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Filter satellites by location
 *       - in: query
 *         name: habitable
 *         schema:
 *           type: boolean
 *         description: Filter satellites by habitibility
 *       - in: query
 *         name: planetId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter satellites by planetId
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [id, name, age, mass, diameter, density, type, atmosphere, year, perigee, apogee, tilt, hasSatellites, minTemp, maxTemp, gravity, day, brightness, location, habitable, planetId ]
 *         description: Field to sort the satellites by (default is 'id')
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Order to sort the satellites by (default is 'asc')
 *     responses:
 *       '200':
 *         description: Success
 *       '404':
 *         description: No satellites found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/satellites/{id}:
 *   get:
 *     summary: Get a satellite by id
 *     tags:
 *       - Satellite
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
 *         description: No satellite found with the provided id
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/satellites/{id}:
 *   put:
 *     summary: Update a satellite by id
 *     tags:
 *       - Satellite
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
 *             $ref: '#/components/schemas/Satellite'
 *     responses:
 *       '200':
 *         description: Satellite successfully updated
 *       '404':
 *         description: No satellite found with the provided id
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/satellites/{id}:
 *   delete:
 *     summary: Delete a satellite by id
 *     tags:
 *       - Satellite
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '200':
 *         description: Satellite successfully deleted
 *       '404':
 *         description: No satellite found with the provided id
 *       '500':
 *         description: Internal server error
 */