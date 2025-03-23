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
 *           example: "Ceres"
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
 *         starId:
 *           type: string
 *           format: uuid
 *           example: "abcde12345-xyz6789"
 */

/**
 * @swagger
 * /api/v1/asteroids:
 *   post:
 *     summary: Create a new asteroid
 *     tags:
 *       - Asteroid
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
