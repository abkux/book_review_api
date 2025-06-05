import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const router = Router();

// Validation middleware
const signupValidation = [
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 6 }),
  body("name").notEmpty().trim(),
];

const loginValidation = [
  body("email").isEmail().normalizeEmail(),
  body("password").notEmpty(),
];

// Route: Signup
router.post(
  "/signup",
  signupValidation,
  async (req: Request, res: Response) => {
    try {
      const { email, password, name } = req.body;

      if (!email || !password || !name) {
        return res
          .status(400)
          .json({
            message:
              "All fields are required such as email, password and name.",
          });
      }

      // Check if user already exists in database
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res
          .status(400)
          .json({ message: "User already exists, please login!" });
      }

      // Hash user password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a user new user in database
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      });

      // Generate JWT
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET || "fallback-secret",
        { expiresIn: "24h" }
      );

      // Returning user tokens, id with email and name
      res.status(201).json({
        message: "User created successfully",
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong while Sing Up" });
    }
  }
);

// Route: Login
router.post("/login", loginValidation, async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user in database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // If user doesn't exist in the table return error
    if (!user) {
      return res
        .status(401)
        .json({
          message: `User doesn't exist with given email id. Please create a new account.`,
        });
    }

    // Check password compare with hash password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res
        .status(401)
        .json({ message: "Invalid credentials: Wrong Password" });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: "24h" }
    );

    // Return response with userid, email and name
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong while Log in" });
  }
});

export const authRouter = router;
