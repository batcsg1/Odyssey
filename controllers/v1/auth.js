import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import prisma from "../../prisma/client.js";

const selectObject = {
  id: true,
  firstName: true,
  lastName: true,
  emailAddress: true,
  homePlanet: true,
  createdAt: true,
  updatedAt: true,
}

const register = async (req, res) => {
  try {
    const { emailAddress, password, role } = req.body;

    if (role !== "NORMAL") {
      return res
        .status(403)
        .json({ message: "User must register as a normal user" });
    }

    let user = await prisma.user.findUnique({ where: { emailAddress } });

    if (user) return res.status(409).json({ message: "User already exists" });

    /**
     * A salt is random bits added to a password before it is hashed. Salts
     * create unique passwords even if two users have the same passwords
     */
    const salt = await bcryptjs.genSalt();

    /**
     * Generate a hash for a given string. The first argument
     * is a string to be hashed, i.e., Pazzw0rd123 and the second
     * argument is a salt, i.e., E1F53135E559C253
     */
    const hashedPassword = await bcryptjs.hash(password, salt);

    user = await prisma.user.create({
      data: {
        ...req.body,
        password: hashedPassword,
        role: "NORMAL"
      },
      select: selectObject,
    });

    return res.status(201).json({
      message: "User successfully registered",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  const MAX_LOGIN_ATTEMPTS = 5;
  const LOCK_TIME_MS = 10 * 60 * 1000; // 10 minutes

  try {
    const { emailAddress, password } = req.body;

    const user = await prisma.user.findUnique({ where: { emailAddress } });

    if (!user) {
      return res.status(401).json({ message: "Invalid email address" });
    }

    if (!user.status) {
      return res.status(403).json({ message: "Your account is currently disabled." });
    }

    if (
      user.loginAttempts >= MAX_LOGIN_ATTEMPTS &&
      user.lastLoginAttempt >= Date.now() - LOCK_TIME_MS
    ) {
      return res.status(401).json({
        message: "Maximum login attempts reached. Please try again later",
      });
    }

    /**
     * Compare the given string, i.e., Pazzw0rd123, with the given
     * hash, i.e., user's hashed password
     */
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect) {
      await prisma.user.update({
        where: { emailAddress },
        data: {
          loginAttempts: user.loginAttempts + 1,
          lastLoginAttempt: new Date(),
        },
      });

      return res.status(401).json({ message: "Invalid password" });
    }

    const { JWT_SECRET, JWT_LIFETIME } = process.env;

    /**
     * Return a JWT. The first argument is the payload, i.e., an object containing
     * the authenticated user's id and name, the second argument is the secret
     * or public/private key, and the third argument is the lifetime of the JWT
     */
    const token = jwt.sign(
      {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: JWT_LIFETIME }
    );

    await prisma.user.update({
      where: { emailAddress },
      data: {
        loginAttempts: 0,
        lastLoginAttempt: null,
      },
    });

    return res.status(200).json({
      message: "User successfully logged in",
      token: token,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      message: err.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    // Store token in blacklist
    await prisma.blacklist.create({
      data: {
        token
      },
    });

    return res.status(200).json({ message: "Successfully logged out" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      message: err.message,
    });
  }
}

export { register, login, logout };