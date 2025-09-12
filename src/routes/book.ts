import { Router, Request, Response, NextFunction } from "express";
import { body, param } from "express-validator";
import {
  addBook,
  deleteBook,
  getAllBooks,
  getBook,
  listBookByAuthor,
  updateBook,
} from "../controller/book";
import { validateRequest } from "../middleware/validationMiddleware";

const bookRouter = Router();

bookRouter.get("/books", (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = getAllBooks();
    res.status(200).json({ books: books });
  } catch (err) {
    next(err);
  }
});

bookRouter.post(
  "/books",
  [
    body("title")
      .isString()
      .withMessage("Book title must be string")
      .notEmpty(),
    body("genre")
      .isString()
      .withMessage("Book genre must be string")
      .notEmpty(),
    body("publishedYear")
      .isInt()
      .withMessage("Published Year must be a number"),
    body("authorId").isInt().withMessage("Author Id must be a number"),
    body("isbn").optional().isString(),
    body("pages").optional().isInt(),
    body("summary").optional().isString(),
  ],
  validateRequest,
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, genre, publishedYear, authorId, isbn, pages, summary } =
        req.body;
      const newBook = addBook(
        title,
        genre,
        publishedYear,
        authorId,
        isbn,
        pages,
        summary
      );

      if (!newBook) {
        return next({
          status: 404,
          message: "Book could not be added (Author Not Found)",
        });
      }

      if (newBook === "DUPLICATE") {
        return next({ status: 409, message: "Book Exist" });
      }

      res.status(201).json(newBook);
    } catch (err) {
      next(err);
    }
  }
);

bookRouter.get(
  "/books/:id",
  [
    param("id")
      .isInt({ gt: 0 })
      .withMessage("Book ID must be a positive integer"),
  ],
  validateRequest,
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const bookFound = getBook(id);

      if (!bookFound) return next({ status: 404, message: "Book Not Found" });

      res.status(200).json({ bookFound: bookFound });
    } catch (err) {
      next(err);
    }
  }
);

bookRouter.put(
  "/books/:id",
  [
    param("id")
      .isInt({ gt: 0 })
      .withMessage("Book ID must be a positive integer"),
    body("title")
      .isString()
      .withMessage("Book title must be string")
      .notEmpty(),
    body("genre")
      .isString()
      .withMessage("Book genre must be string")
      .notEmpty(),
    body("publishedYear")
      .isInt()
      .withMessage("Published Year must be a number"),
    body("authorId").isInt().withMessage("Author Id must be a number"),
    body("isbn").optional().isString(),
    body("pages").optional().isInt(),
    body("summary").optional().isString(),
  ],
  validateRequest,
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);

      const { title, genre, publishedYear, isbn, pages, summary } = req.body;

      const updatedBook = updateBook(id, {
        title,
        genre,
        publishedYear,
        isbn,
        pages,
        summary,
      });

      if (!updatedBook) return next({ status: 404, message: "Book Not Found" });

      res
        .status(200)
        .json({ messege: "Book Updated Sucessfully", book: updatedBook });
    } catch (err) {
      next(err);
    }
  }
);

bookRouter.delete(
  "/books/:id",
  [
    param("id")
      .isInt({ gt: 0 })
      .withMessage("Book ID must be a positive integer"),
  ],
  validateRequest,
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const bookToDelete = deleteBook(id);

      if (!bookToDelete)
        return next({ status: 404, message: "Book Not Found" });
      res
        .status(200)
        .json({ msg: "Book deleted successfully", book: bookToDelete });
    } catch (err) {
      next(err);
    }
  }
);

bookRouter.get(
  "/authors/:id/books",
  [
    param("id")
      .isInt({ gt: 0 })
      .withMessage("Book ID must be a positive integer"),
  ],
  validateRequest,
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const authorBooks = listBookByAuthor(id);

      if (!authorBooks || authorBooks.length === 0)
        return next({
          status: 404,
          message: "Books Not Found for this Author",
        });

      res.status(200).json(authorBooks);
    } catch (err) {
      next(err);
    }
  }
);

export default bookRouter;
