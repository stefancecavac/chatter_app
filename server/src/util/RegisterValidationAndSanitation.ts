import validator from "validator";
import { CustomError } from "../config/CustomError";

export const RegisterValidationAndSanitation = (input: { name: string; lastName: string; email: string; password: string }) => {
  const { name, lastName, email, password } = input;

  if (!name) throw new CustomError("Name is required.", 400);
  if (!lastName) throw new CustomError("Last name is required.", 400);
  if (!email) throw new CustomError("Email is required.", 400);
  if (!password) throw new CustomError("Password is required.", 400);

  if (!validator.isEmail(email)) {
    throw new CustomError("Not a valid email", 400);
  }

  if (!validator.isStrongPassword(password)) {
    throw new CustomError("Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 number, and 1 symbol.", 400);
  }

  if (!validator.isLength(name, { min: 2, max: 50 })) {
    throw new CustomError("Name must be between 2 and 50 characters long.", 400);
  }

  if (!validator.isLength(lastName, { min: 2, max: 50 })) {
    throw new CustomError("Last name must be between 2 and 50 characters long.", 400);
  }

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const sanitizedName = validator.whitelist(validator.trim(name), "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ").toLowerCase();
  const sanitizedLastName = validator.whitelist(validator.trim(lastName), "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ").toLowerCase();

  return {
    sanitizedEmail: validator.normalizeEmail(email) as string,
    sanitizedName: capitalize(validator.escape(sanitizedName)),
    sanitizedLastName: capitalize(validator.escape(sanitizedLastName)),
    password,
  };
};
