import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { RegisterValidationAndSanitation } from "../util/RegisterValidationAndSanitation";
import { LoginValidationANdSanitation } from "../util/LoginValidationAndSanittation";
import { GenerateAccessToken } from "../util/GenerateAccessToken";
import { CustomError } from "../config/CustomError";
import {
  getCurrentUserService,
  loginUserService,
  registerUserService,
  updateUserPrivacyService,
  updateUserProfileService,
} from "../service/authService";

export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { sanitizedEmail, sanitizedLastName, sanitizedName, password } = RegisterValidationAndSanitation(req.body);

    const { accessToken, refreshToken } = await registerUserService({ password, sanitizedEmail, sanitizedLastName, sanitizedName });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 7200000,
    });
    res.status(201).json({ accessToken });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { email, password } = LoginValidationANdSanitation(req.body);

    const { accessToken, refreshToken } = await loginUserService({ email, password });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 7200000,
    });

    res.status(201).json({ accessToken });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.user;

    const { user } = await getCurrentUserService(userId);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({ message: "No refresh tokne" });
  }
  try {
    const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string);
    const accessToken = GenerateAccessToken((decodedToken as any).userId);
    res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    res.clearCookie("refreshToken").json({ message: "Successfuly loged out" });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { profilePic, bannerPic, name, lastName, email } = req.body;
    const { userId } = req.user;

    // TODO sanitize inputs

    const { updateProfile } = await updateUserProfileService({ userId, profilePic, bannerPic, email, lastName, name });

    res.status(201).json(updateProfile);
  } catch (error) {
    next(error);
  }
};

export const updateProfilePrivacy = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { userId } = req.user;

    // TODO sanitize inputs

    const { updatedPrivacy } = await updateUserPrivacyService({ userId });

    res.status(201).json(updatedPrivacy);
  } catch (error) {
    next(error);
  }
};
