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
 *           example: "Moon"
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
 *           example: "Natural"
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
 *         location:
 *           type: string
 *           example: "Earth Orbit"
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