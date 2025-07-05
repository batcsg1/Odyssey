/**
 * @file Manages business logic for users
 * @author Samuel Batchelor
 */

import Repository from "../../repositories/generic.js";

const userRepository = new Repository("User");

const selectObject = {
    id: true,
    firstName: true,
    lastName: true,
    emailAddress: true,
    planetId: true,
    role: true,
    status: true,
    createdAt: true,
    updatedAt: true,
}

/**
 * @description This function creates a new user
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const createUser = async (req, res) => {
    try {
        const { role } = req.user;

        // Rule: NORMAL users cannot create any users

        if (role === "NORMAL") {
            return res.status(401).json({
                message: "NORMAL users cannot create users",
            });
        }

        // Rule: ADMIN can only create NORMAL users, and cannot set password

        if (role === "ADMIN") {
            if (req.body.role !== "NORMAL") {
                return res.status(401).json({
                    message: "ADMINs can only create NORMAL users",
                });
            }
        }

        // Rule: SUPER_ADMIN can create any user, including other SUPER_ADMINs

        // User to be created
        const newUser = await userRepository.create(req.body);

        // Return the created user as the data object
        const user = await userRepository.findById(newUser.id, selectObject);

        return res.status(201).json({
            message: "User successfully created",
            data: user,
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

/**
 * @description This function gets all users
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const getUsers = async (req, res) => {
    try {
        const { role, id } = req.user;

        // Filtering query parameters
        const filters = {
            firstName: req.query.firstName || undefined,
            lastName: req.query.lastName || undefined,
            emailAddress: req.query.emailAddress || undefined,
            planetId: req.query.planetId || undefined,
            role: req.query.role || undefined
        }

        // Sort query parameters
        const sortBy = req.query.sortBy || "id";
        const sortOrder = req.query.sortOrder === "desc" ? "desc" : "asc";

        // Pagination query parameters
        const page = req.query.page
        const amount = req.query.amount

        // Apply filtering, sorting and pagination to user model
        let users = await userRepository.findAll({
            select: selectObject,
            filters,
            sortBy,
            sortOrder,
            page,
            amount
        });

        // Filter the users based on current users role

        users = users.filter(user => {
            if (role === "NORMAL") {
                // RULE: NORMAL users can only see their own data
                return user.id === id;
            } else if (role === "ADMIN") {
                //RULE: ADMIN can see ADMIN and NORMAL users, but not SUPER_ADMIN users
                return user.role !== "SUPER_ADMIN"
            } else {
                // RULE: SUPER_ADMIN can see all users
                return true;
            }
        })

        // RULE: Return error if no users match

        if (users.length === 0) {
            return res.status(404).json({
                message: "No users found",
                data: users
            });
        }

        return res.status(200).json({
            count: users.length,
            data: users
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

/**
 * @description This function gets a user by ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const getUser = async (req, res) => {
    try {
        const { role, id } = req.user;

        // Find user by ID
        const user = await userRepository.findById(req.params.id, selectObject);

        if (!user) {
            return res.status(404).json({
                message: `No user with the id: ${req.params.id} found`,
            });
        }

        if (role === "NORMAL" && user.id !== id) {
            // RULE: NORMAL users can only view their data
            return res.status(403).json({
                message: "You are not authorized to access other users data.",
            });
        } else if (role === "ADMIN") {
            // RULE: ADMINs can't view a SUPER_ADMINs data
            if (user.role === "SUPER_ADMIN") {
                return res.status(403).json({
                    message: "You are not authorized to access this super admin user's data.",
                });
            }
        }

        return res.status(200).json({
            data: user,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

/**
 * @description This function updates a user by ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const updateUser = async (req, res) => {
    try {
        const { role, id } = req.user;

        // Find a user by ID
        let user = await userRepository.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: `No user with the id: ${req.params.id} found`,
            });
        }

        // RULE: Changing user role is not allowed
        if (req.body.role) {
            return res.status(403).json({
                message: "Changing user role is not allowed",
            });
        }

        // RULE: Password updates not allowed through this route
        if (req.body.password) {
            return res.status(403).json({
                message: "Password updates not allowed here",
            });
        }

        // RULE: User cannot disable or enable their own account
        if (typeof req.body.status === "boolean" && user.id === id) {
            return res.status(403).json({
                message: "You cannot disable or enable your own account",
            });
        }

        if (role === "SUPER_ADMIN") {
            // RULE: SUPER_ADMIN can update their own data but not other SUPER_ADMIN users
            if (user.role == role && user.id !== id) {
                return res.status(403).json({
                    message: "You cannot update another super admin user",
                });
            }
        } else if (role === "ADMIN") {
            // RULE: ADMIN can update NORMAL users or themselves
            if (user.role !== "NORMAL" && user.id !== id) {
                return res.status(403).json({
                    message: "Updating a non-normal user not allowed",
                });
            }
            // RULE: ADMINs can't update disable or enable NORMAL users
            if (typeof req.body.status === "boolean" && user.role === "NORMAL") {
                return res.status(403).json({
                    message: "ADMIN users cannot disable or enable NORMAL users",
                });
            }
        } else if (role === "NORMAL") {
            // RULE: NORMAL can only update their own data
            if (user.id !== id) {
                return res.status(403).json({
                    message: "You cannot update this other user",
                });
            }
        }

        user = await userRepository.update(req.params.id, req.body, selectObject);

        return res.status(200).json({
            message: `User with the id: ${req.params.id} successfully updated`,
            data: user,
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

/**
 * @description This function deletes a user by ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const deleteUser = async (req, res) => {
    try {
        const { role, id } = req.user;

        // User to delete
        const user = await userRepository.findById(req.params.id, selectObject);

        if (!user) {
            return res.status(404).json({
                message: `No user with the id: ${req.params.id} found`,
            });
        }

        // RULE: Users can't delete themselves
        if (user.id === id) {
            return res.status(403).json({
                message: "You cannot delete your own account"
            });
        }

        if (role === "SUPER_ADMIN") {
            // RULE: SUPER_ADMINs can't delete other super admins
            if (user.role == role && user.id !== id) {
                return res.status(403).json({
                    message: "You cannot delete another super admin user",
                });
            }
        }
        else if (role === "ADMIN") {
            // RULE: ADMINs can't delete other ADMINs
            if (user.role == role && user.id !== id) {
                return res.status(403).json({
                    message: "You cannot delete another admin user",
                });
            }
            // RULE: ADMIN can delete NORMAL users
            if (user.role !== "NORMAL") {
                return res.status(403).json({
                    message: "Deleting a super admin user not allowed",
                });
            }
        } else if (role === "NORMAL") {
            // RULE: NORMAL can only update their own data
            if (user.id !== id) {
                return res.status(403).json({
                    message: "Deleting another user not allowed",
                });
            }
        }

        await userRepository.delete(req.params.id);
        return res.json({
            message: `User with the id: ${req.params.id} successfully deleted`,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

/**
 * @description This function checks if users exist and returns just the response headers
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - Sends response status
 */
const headUsers = async (req, res) => {
    try {
        const users = await userRepository.findAll();

        // Set custom header with count before responding
        res.set("X-Users-Count", users.length);

        if (users.length === 0) {
            return res.sendStatus(404);
        }
        return res.sendStatus(204);
    } catch (err) {
        return res.sendStatus(500);
    }
};

/**
 * @description This function checks if a user exists by ID and returns just the response headers
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - Sends response status
 */
const headUser = async (req, res) => {
    try {
        const user = await userRepository.findById(req.params.id);

        // Set custom header to check if user exists
        res.set("X-User-Exists", user ? "true" : "false");

        if (!user) {
            return res.sendStatus(404);
        }
        return res.sendStatus(200);
    } catch (err) {
        return res.sendStatus(500);
    }
};

export {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    headUsers,
    headUser
};
