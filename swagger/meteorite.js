/**
 * @swagger
 * components:
 *   schemas:
 *     Meteorite:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         name:
 *           type: string
 *           example: "Hoba"
 *         age:
 *           type: number
 *           format: float
 *           example: 2000000000
 *         mass:
 *           type: number
 *           format: float
 *           example: 60
 *         diameter:
 *           type: number
 *           format: float
 *           example: 2.7
 *         location:
 *           type: string
 *           example: "Namibia"
 *         latitude:
 *           type: number
 *           example: -22.5856
 *         longitude:
 *           type: number
 *           example: 17.0817
 *         planetId:
 *           type: string
 *           format: uuid
 *           example: "abcde12345-xyz6789"
 */

/**
 * @swagger
 * /api/v1/meteorites:
 *   post:
 *     summary: Create a new meteorite
 *     tags:
 *       - Meteorite
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Meteorite'
 *     responses:
 *       '201':
 *         description: Meteorite successfully created
 *       '400':
 *         description: Meteorite with the same name already exists
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/meteorites:
 *   get:
 *     summary: Get all meteorites
 *     tags:
 *       - Meteorite
 *     responses:
 *       '200':
 *         description: Success
 *       '404':
 *         description: No meteorites found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/meteorites/{id}:
 *   get:
 *     summary: Get a meteorite by id
 *     tags:
 *       - Meteorite
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
 *         description: No meteorite found with the provided id
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/meteorites/{id}:
 *   put:
 *     summary: Update a meteorite by id
 *     tags:
 *       - Meteorite
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
 *             $ref: '#/components/schemas/Meteorite'
 *     responses:
 *       '200':
 *         description: Meteorite successfully updated
 *       '404':
 *         description: No meteorite found with the provided id
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/meteorites/{id}:
 *   delete:
 *     summary: Delete a meteorite by id
 *     tags:
 *       - Meteorite
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '200':
 *         description: Meteorite successfully deleted
 *       '404':
 *         description: No meteorite found with the provided id
 *       '500':
 *         description: Internal server error
 */
