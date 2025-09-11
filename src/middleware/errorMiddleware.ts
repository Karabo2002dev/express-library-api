import { Request, Response, NextFunction } from "express";
import { ValidationError } from "express-validator";

interface CustomError extends Error {
  status?: number;
  errors?: ValidationError[];
}

export const errorMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", err.message);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
  });
  next();
};
