import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { PrismaClient } from "@prisma/client";
import { authenticateToken } from "../middleware/auth";

const prisma = new PrismaClient();
const router = Router();

// Validation middleware
const bookValidation = [
  body("title").notEmpty().trim(),
  body("author").notEmpty().trim(),
  body("genre").notEmpty().trim(),
  body("description").optional().trim(),
];

// Route: create a new book
router.post(
  "/",
  authenticateToken,
  bookValidation,
  async (req: Request, res: Response) => {
    try {
      const { title, author, genre, description } = req.body;

      if (!title || !author || !genre || !description) {
        return res
          .status(400)
          .json({
            message:
              "All fields are required such as title, author, description and genre.",
          });
      }

      const book = await prisma.book.create({
        data: {
          title,
          author,
          genre,
          description,
        },
      });

      res.status(201).json(book);
    } catch (error) {
      res.status(500).json({ message: "Error creating book" });
    }
  }
);

// Route: Get all books with pagination and filters
router.get("/", async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const author = req.query.author as string;
    const genre = req.query.genre as string;

    const where: Object = {
      ...(author && { author: { contains: author, mode: "insensitive" } }),
      ...(genre && { genre: { contains: genre, mode: "insensitive" } }),
    };

    const [books, total] = await Promise.all([
      prisma.book.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          _count: {
            select: { reviews: true },
          },
        },
      }),
      prisma.book.count({ where }),
    ]);

    res.json({
      books,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching books" });
  }
});

// Route: Get book by ID with reviews
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const book = await prisma.book.findUnique({
      where: { id },
      include: {
        reviews: {
          skip: (page - 1) * limit,
          take: limit,
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        _count: {
          select: { reviews: true },
        },
      },
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Calculate average rating
    const reviews = await prisma.review.findMany({
      where: { bookId: id },
    });

    const averageRating =
      reviews.length > 0
        ? reviews.reduce(
            (acc: number, review: { rating: number }) => acc + review.rating,
            0
          ) / reviews.length
        : 0;

    res.json({
      ...book,
      averageRating: parseFloat(averageRating.toFixed(1)),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching book" });
  }
});

export const bookRouter = router;
