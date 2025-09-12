import { Router, Request, Response, NextFunction } from "express";
import { body, param } from "express-validator";
import {
  addAuthor,
  deleteAuthor,
  getAllAuthors,
  getAuthor,
  updateAuthor,
} from "../controller/author";
import { validateRequest } from "../middleware/validationMiddleware";

const authorRouter = Router();

authorRouter.get("/", (req: Request, res: Response) => {
  res.status(200).json({ msg: "Welcome To The Library" });
});

authorRouter.get("/authors", (req: Request, res: Response) => {
  const authors = getAllAuthors();
  res.status(200).json({ authors: authors });
});

authorRouter.post(
  "/authors",
  [
    body("firstName")
      .isString()
      .withMessage("First name must be a string")
      .notEmpty(),
    body("lastName")
      .isString()
      .withMessage("Last name must be a string")
      .notEmpty(),
  ],
  validateRequest,
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { firstName, lastName } = req.body;
      const newAuthor = addAuthor(firstName, lastName);
      if (newAuthor === "DUPLICATE") {
        return next({ status: 409, message: "Author Exist" });
      }
      res.status(201).json(newAuthor);
    } catch (err) {
      next(err);
    }
  }
);

authorRouter.get(
  "/authors/:id",
  [
    param("id")
      .isInt({ gt: 0 })
      .withMessage("Author ID must be a positive integer"),
  ],
  validateRequest,
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const authorFound = getAuthor(id);

      if (!authorFound) {
        return next({ status: 404, message: "Author Not Found" });
      }

      res.status(200).json(authorFound);
    } catch (err) {
      next(err);
    }
  }
);

authorRouter.put(
  "/authors/:id",
  [
    param("id")
      .isInt({ gt: 0 })
      .withMessage("Author ID must be a positive integer"),
    body("firstName")
      .isString()
      .withMessage("First name must be a string")
      .notEmpty(),
    body("lastName")
      .isString()
      .withMessage("Last name must be a string")
      .notEmpty(),
  ],
  validateRequest,
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const { firstName, lastName } = req.body;

      const updatedAuthor = updateAuthor(id, { firstName, lastName });

      if (!updatedAuthor) {
        return next({ status: 404, message: "Author Not Found" });
      }

      res.status(200).json(updatedAuthor);
    } catch (err) {
      next(err);
    }
  }
);

authorRouter.delete(
  "/authors/:id",
  [
    param("id")
      .isInt({ gt: 0 })
      .withMessage("Author ID must be a positive integer"),
  ],
  validateRequest,
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const authorDeleted = deleteAuthor(id);

      if (!authorDeleted) {
        return next({ status: 404, message: "Author Not Found" });
      }

      res.status(200).json(authorDeleted);
    } catch (err) {
      next(err);
    }
  }
);

export default authorRouter;
