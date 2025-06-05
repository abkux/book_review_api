import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import { authRouter } from "./routes/auth";
import { bookRouter } from "./routes/books";
import { reviewRouter } from "./routes/reviews";
import { searchRouter } from "./routes/search";

dotenv.config();

// App initialisation
const app = express();
const port = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
// CORS middleware
app.use(cors());
// Body parsing middleware
app.use(express.json());
// Logging middleware
app.use(morgan("combined"));

// Routes
app.get("/", (req, res) => {
  res
    .status(200)
    .json({
      message: "Welcome to the Abku Bookstore API, email: abku@abku.dev",
    });
});

app.use("/auth", authRouter); // Authencation ( login, singup )
app.use("/books", bookRouter); // Books ( create, get-books, get-book-by-id )
app.use("/reviews", reviewRouter); // Reviews ( create-review, update-review, delete-review )
app.use("/search", searchRouter); // Search by title, author and all

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
  }
);

// Starting WebServer
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// I have written this in Typescript - I can also write this in JavaScript with ES6+ Syntax.
