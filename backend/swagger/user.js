/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         firstName:
 *           type: string
 *           example: "John"
 *         lastName:
 *           type: string
 *           example: "Doe"
 *         emailAddress:
 *           type: string
 *           format: email
 *           example: "john.doe@example.com"
 *         password:
 *           type: string
 *           example: "password123"        
 *         loginAttempts:
 *           type: integer
 *           example: 3
 *         lastLoginAttempt:
 *           type: string
 *           format: date-time
 *           example: "2024-07-14T12:34:56Z"
 *         role:
 *           type: string
 *           example: "NORMAL"
 *         planetId:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-07-14T12:34:56Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-07-14T12:34:56Z"
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/v1.0.0/users:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: User successfully created
 *       '400':
 *         description: User with the same name already exists
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1.0.0/users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - User
 *     parameters:
 *       - in: query
 *         name: firstName
 *         schema:
 *           type: string
 *         description: Filter users by first name
 *       - in: query
 *         name: lastName
 *         schema:
 *           type: string
 *         description: Filter users by last name
 *       - in: query
 *         name: emailAddress
 *         schema:
 *           type: string
 *         description: Filter users by email address
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: Filter users by role
 *       - in: query
 *         name: planetId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter users by home planet
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [id, firstName, lastName, emailAddress, role, planetId ]
 *         description: Field to sort the users by (default is 'id')
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Order to sort the users by (default is 'asc')
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: Page number (default is 1)
 *       - in: query
 *         name: amount
 *         schema:
 *           type: number
 *         description: Amount of users per page (default is 25)
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Success
 *       '404':
 *         description: No users found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1.0.0/users/{id}:
 *   get:
 *     summary: Get a user by id
 *     tags:
 *       - User
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
 *         description: No user found with the provided id
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1.0.0/users/{id}:
 *   put:
 *     summary: Update a user by id
 *     tags:
 *       - User
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
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User successfully updated
 *       '404':
 *         description: No user found with the provided id
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1.0.0/users/{id}:
 *   patch:
 *     summary: Partially update a user by id
 *     tags:
 *       - User
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
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User successfully updated
 *       '404':
 *         description: No user found with the provided id
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1.0.0/users/{id}:
 *   delete:
 *     summary: Delete a user by id
 *     tags:
 *       - User
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
 *         description: User successfully deleted
 *       '404':
 *         description: No user found with the provided id
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1.0.0/users:
 *   options:
 *     summary: Get allowed HTTP methods for users route
 *     tags:
 *       - User
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
 * /api/v1.0.0/users:
 *   head:
 *     summary: Verify if any users exist
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '204':
 *         description: Users exist
 *       '404':
 *         description: No users found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1.0.0/users/{id}:
 *   head:
 *     summary: Verify user existence by ID
 *     tags:
 *       - User
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
 *         description: User exists
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */

