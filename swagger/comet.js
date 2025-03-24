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
 *     CometResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Comet'
 *       required:
 *         - message
 *         - data
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         error:
 *           type: string
 *         details:
 *           type: array
 *           items:
 *             type: string
 * 
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CometResponse'
 *       '400':
 *         description: Comet with the same name already exists
 *       '500':
 *         description: Internal server error
 * 
 *   get:
 *     summary: Get all comets
 *     tags:
 *       - Comet
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CometResponse'
 *       '404':
 *         description: No comets found
 *       '500':
 *         description: Internal server error
 * 
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CometResponse'
 *       '404':
 *         description: No comet found with the provided id
 *       '500':
 *         description: Internal server error
 * 
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CometResponse'
 *       '404':
 *         description: No comet found with the provided id
 *       '500':
 *         description: Internal server error
 * 
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CometResponse'
 *       '404':
 *         description: No comet found with the provided id
 *       '500':
 *         description: Internal server error
 */
