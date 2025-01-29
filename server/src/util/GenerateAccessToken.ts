import jwt from "jsonwebtoken";

export const GenerateAccessToken = (userId: string) => {
  return jwt.sign({ userId: userId }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "30m" });
};
