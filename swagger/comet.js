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
 *           example: "Periodic"
 *         year:
 *           type: number
 *           format: float
 *           example: 1986
 *         perigee:
 *           type: number
 *           format: float
 *           example: 1.3e8
 *         apogee:
 *           type: number
 *           format: float
 *           example: 5.5e8
 *         location:
 *           type: string
 *           example: "Solar System"
 *         starId:
 *           type: string
 *           format: uuid
 *           example: "abcde12345-xyz6789"
 */

/**
 * @swagger
 * /api/v1/comets:
 *   post:
 *     summary: Create a new comet
 *     tags:
 *       - Comet
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
 * /api/v1/comets:
 *   get:
 *     summary: Get all comets
 *     tags:
 *       - Comet
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
 * /api/v1/comets/{id}:
 *   get:
 *     summary: Get a comet by id
 *     tags:
 *       - Comet
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
 * /api/v1/comets/{id}:
 *   put:
 *     summary: Update a comet by id
 *     tags:
 *       - Comet
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
 * /api/v1/comets/{id}:
 *   delete:
 *     summary: Delete a comet by id
 *     tags:
 *       - Comet
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
