import jwt from "jsonwebtoken";

export const GenerateRefreshToken = (userId: string) => {
  return jwt.sign({ userId: userId }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: "2h" });
};
