import { CustomError } from "../config/CustomError";

export const LoginValidationANdSanitation = (input: { email: string; password: string }) => {
  const { email, password } = input;

  if (!email || !password) throw new CustomError("All fields are required", 400);

  return {
    email,
    password,
  };
};
