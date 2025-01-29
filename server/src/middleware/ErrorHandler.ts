import { NextFunction, Request, Response } from "express";
import { CustomError } from "../config/CustomError";

export const ErrorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  console.log(err);

  res.status(statusCode).json({ success: false, message: message });
};
