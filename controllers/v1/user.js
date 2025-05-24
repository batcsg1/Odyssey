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
    homePlanet: true,
    role: true,
    createdAt: true,
    updatedAt: true,
}

const createUser = async (req, res) => {
    try {
        const { role, id } = req.user;

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

        if (role === "SUPER_ADMIN") {
            if (req.body.role !== "SUPER_ADMIN") {

            }
        }

        // Create user with request body

        await userRepository.create(req.body);
        const newUsers = await userRepository.findAll(selectObject);
        return res.status(201).json({
            message: "User successfully created",
            data: newUsers,
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

const getUsers = async (req, res) => {
    try {
        const { role, id } = req.user;

        const filters = {
            firstName: req.query.firstName || undefined,
            lastName: req.query.lastName || undefined,
            emailAddress: req.query.emailAddress || undefined,
            homePlanet: req.query.homePlanet || undefined,
            role: req.query.role || undefined
        }

        const sortBy = req.query.sortBy || "id";
        const sortOrder = req.query.sortOrder === "desc" ? "desc" : "asc";

        let users = await userRepository.findAll(
            selectObject,
            filters,
            sortBy,
            sortOrder
        );

        // Filter the users based on current users role

        users = users.filter(user => {
            if (role === "NORMAL") {
                // Rule: NORMAL users can only see their own data
                return user.id === id;
            } else if (role === "ADMIN") {
                //Rule: ADMIN can see ADMIN and NORMAL users, but not SUPER_ADMIN users
                return user.role !== "SUPER_ADMIN"
            } else {
                // Rule: SUPER_ADMIN can see all users
                return true;
            }
        })

        // Rule: Return error if no users match

        if (users.length === 0) {
            return res.status(404).json({
                message: "No users found",
                data: users
            });
        }

        return res.status(200).json({
            data: users,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

const getUser = async (req, res) => {
    try {
        const { role, id } = req.user;

        const user = await userRepository.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: `No user with the id: ${req.params.id} found`,
            });
        }

        // When the user role is normal and they must access their own data
        
        if (role === "NORMAL" && user.id !== id){
            return res.status(403).json({
                message: "You are not authorized to access other users data.",
            });
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

// const updateConstellation = async (req, res) => {
//     try {
//         let constellation = await userRepository.findById(req.params.id);
//         if (!constellation) {
//             return res.status(404).json({
//                 message: `No constellation with the id: ${req.params.id} found`,
//             });
//         }
//         constellation = await userRepository.update(req.params.id, req.body);
//         return res.status(200).json({
//             message: `Constellation with the id: ${req.params.id} successfully updated`,
//             data: constellation,
//         });
//     } catch (err) {
//         return res.status(500).json({
//             message: err.message,
//         });
//     }
// };

// const deleteConstellation = async (req, res) => {
//     try {
//         const constellation = await userRepository.findById(req.params.id);
//         if (!constellation) {
//             return res.status(404).json({
//                 message: `No constellation with the id: ${req.params.id} found`,
//             });
//         }
//         await userRepository.delete(req.params.id);
//         return res.json({
//             message: `Constellation with the id: ${req.params.id} successfully deleted`,
//         });
//     } catch (err) {
//         return res.status(500).json({
//             message: err.message,
//         });
//     }
// };

export {
    createUser,
    getUsers,
    getUser
};
