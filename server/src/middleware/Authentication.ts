import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare module "express" {
  export interface Request {
    user?: any;
  }
}
const authentication = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const validatedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string);

    if (!validatedToken) {
      return res.status(403).json({ message: "Token expired" });
    }

    req.user = validatedToken;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(403).json({ message: "Token expired" });
    }

    return res.status(403).json({ message: "Invalid token" });
  }
};

export default authentication;
