import { Router, Request, Response } from "express";
import { body, param, validationResult } from "express-validator";
import { addAuthor, getAllAuthors } from "../controller/author";
import { addBook, getAllBooks } from "../controller/book";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ msg: "Welcome To The Library" });
});

router.get("/authors", (req: Request, res: Response) => {
  const authors = getAllAuthors();
  res.status(200).json({ authors: authors });
});

router.post(
  "/authors",
  [
    body("firstName")
      .isString()
      .withMessage("First name must be string")
      .notEmpty()
      .withMessage("First name is required"),
    body("lastName")
      .isString()
      .withMessage("Last name must be string")
      .notEmpty()
      .withMessage("Last name is required"),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    const { firstName, lastName } = req.body;

    const newAuthor = addAuthor(firstName, lastName);

    res.status(201).json(newAuthor);
  }
);


router.get("/books", (req: Request, res: Response) => {
  const books = getAllBooks();
  res.status(200).json({ books: books });
});

router.post(
  "/books",
  [
    body("title")
      .isString()
      .withMessage("Book title must be string")
      .notEmpty()
      .withMessage("Book title is required"),
    body("genre")
      .isString()
      .withMessage("Book genre must be string")
      .notEmpty()
      .withMessage("Book genre is required "),
    body("publishedYear")
      .isInt()
      .withMessage("Published Year must be a number")
      .notEmpty()
      .withMessage("Published Year is required"),
    body("authorId")
      .isInt()
      .withMessage("Author Id must be a number")
      .notEmpty()
      .withMessage("Author Id  is required"),
    body("isbn")
      .optional()
      .isString()
      .withMessage("Book ISBN must be a string")
      .notEmpty()
      .withMessage("Book ISBN  is required"),
    body("pages")
      .optional()
      .isInt()
      .withMessage("Number of pages must be a number")
      .notEmpty()
      .withMessage("Number of pages is required"),
    body("summary")
      .optional()
      .isString()
      .withMessage("Book summary must be a string")
      .notEmpty()
      .withMessage("Book summary is required"),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body)
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

    console.log(newBook)

    res.status(201).json(newBook);
  }
);
export default router;
