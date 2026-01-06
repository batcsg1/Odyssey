/**
 * @file The authorisation middleware for any of the routes
 * @author Samuel Batchelor
 */

import prisma from "../../prisma/client.js";

const rbac = async (req, res, next) => {
  try {
    const { id } = req.user;

    const user = await prisma.user.findUnique({ where: { id: id } });

    // Check if the user is an admin or a super admin
    if (user.role === "NORMAL") {
      return res.status(403).json({
        message: `Forbidden. Insufficent privileges for role: ${user.role}`,
      });
    }

    // Call the next middleware in the stack
    return next();
    
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export default rbac;