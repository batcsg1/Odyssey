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
 *           example: 4.6
 *         mass:
 *           type: number
 *           format: float
 *           example: 1.989e30
 *         diameter:
 *           type: number
 *           format: float
 *           example: 1.3927e6
 *         type:
 *           type: string
 *           example: "G-type main-sequence star"
 *         distance:
 *           type: number
 *           format: float
 *           example: 0.0
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
 */

/**
 * @swagger
 * /api/v1/stars:
 *   post:
 *     summary: Create a new star
 *     tags:
 *       - Star
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
