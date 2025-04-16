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
 *           example: 147.1e6
 *         apogee:
 *           type: number
 *           format: float
 *           example: 152.1e6
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
 *           example: "Solar System"
 *         habitable:
 *           type: boolean
 *           example: true
 *         starId:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 */

/**
 * @swagger
 * /api/v1/planets:
 *   post:
 *     summary: Create a new planet
 *     tags:
 *       - Planet
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
 * /api/v1/planets:
 *   get:
 *     summary: Get all planets
 *     tags:
 *       - Planet
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
 * /api/v1/planets/{id}:
 *   get:
 *     summary: Get a planet by id
 *     tags:
 *       - Planet
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
 * /api/v1/planets/{id}:
 *   put:
 *     summary: Update a planet by id
 *     tags:
 *       - Planet
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
 * /api/v1/planets/{id}:
 *   delete:
 *     summary: Delete a planet by id
 *     tags:
 *       - Planet
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
