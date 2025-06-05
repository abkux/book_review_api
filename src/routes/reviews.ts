import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { PrismaClient } from "@prisma/client";
import { authenticateToken } from "../middleware/auth";

const prisma = new PrismaClient();
const router = Router();

interface AuthRequest extends Request {
  user?: {
    userId: string;
  };
}

// Validation middleware
const reviewValidation = [
  body("rating").isInt({ min: 1, max: 5 }),
  body("comment").optional().trim(),
];

// Route: Create a review for a book
router.post(
  "/books/:bookId",
  authenticateToken,
  reviewValidation,
  async (req: AuthRequest, res: Response) => {
    try {
      const { bookId } = req.params;
      const { rating, comment } = req.body;
      const userId = req.user?.userId;

      // Check if we received rating and comment or not
      if (!rating || !comment) {
        return res.status(400).json({
          message: "All fields are required such as rating and comment.",
        });
      }

      // If user doesn't found return response
      if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      // Check if book exists
      const book = await prisma.book.findUnique({
        where: { id: bookId },
      });

      // If book doesn't found return response
      if (!book) {
        return res
          .status(404)
          .json({ message: "Book not found with that book id" });
      }

      // Check if user already reviewed this book
      const existingReview = await prisma.review.findUnique({
        where: {
          userId_bookId: {
            userId,
            bookId,
          },
        },
      });

      // If user already gave review then they can't review again.
      if (existingReview) {
        return res
          .status(400)
          .json({ message: "You have already reviewed this book" });
      }

      // Create review.
      const review = await prisma.review.create({
        data: {
          rating,
          comment,
          userId,
          bookId,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      res.status(201).json(review);
    } catch (error) {
      res.status(500).json({ message: "Error creating review" });
    }
  }
);

// Route: Update a review
router.put(
  "/:id",
  authenticateToken,
  reviewValidation,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { rating, comment } = req.body;
      const userId = (req as any).user?.userId;

      // If no rating and comment return response
      if (!rating || !comment) {
        return res.status(400).json({
          message: "All fields are required such as rating and comment.",
        });
      }

      // Find review with that id
      const review = await prisma.review.findUnique({
        where: { id },
      });

      // If review doesn't exist return response
      if (!review) {
        return res
          .status(404)
          .json({ message: "Review not found with that id" });
      }

      // If the review author is not same return error response
      if (review.userId !== userId) {
        return res
          .status(403)
          .json({ message: "Not authorized to update this review" });
      }

      // Update the response
      const updatedReview = await prisma.review.update({
        where: { id },
        data: {
          rating,
          comment,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      res.json(updatedReview);
    } catch (error) {
      res.status(500).json({ message: "Error updating review" });
    }
  }
);

// Route: Delete a review
router.delete(
  "/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const userId = (req as any).user?.userId;

      // Look up for that review
      const review = await prisma.review.findUnique({
        where: { id },
      });

      // If review doesn't exist return error
      if (!review) {
        return res
          .status(404)
          .json({ message: "Review not found with that id" });
      }

      // If review author doesn't match return error
      if (review.userId !== userId) {
        return res
          .status(403)
          .json({ message: "Not authorized to delete this review" });
      }

      // Else delete the review
      await prisma.review.delete({
        where: { id },
      });

      res.json({ message: "Review deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting review" });
    }
  }
);

export const reviewRouter = router;
