import { Prisma } from "@prisma/client";
import { CustomError } from "../config/CustomError";
import { imagekit } from "../config/ImageKit";
import { client } from "../db/Client";
import { GenerateAccessToken } from "../util/GenerateAccessToken";
import { GenerateRefreshToken } from "../util/GenerateRefreshToken";
import bcrypt from "bcrypt";
import { v4 as uuidv4, v6 as uuidv6 } from "uuid";

export const registerUserService = async (input: { sanitizedEmail: string; sanitizedName: string; sanitizedLastName: string; password: string }) => {
  const { password, sanitizedEmail, sanitizedLastName, sanitizedName } = input;

  const userExists = await client.user.findUnique({
    where: { email: sanitizedEmail },
  });

  if (userExists) {
    throw new CustomError("Email already in use", 400);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const generatedFriendCode = uuidv4().split("-")[0].toUpperCase();

  console.log(generatedFriendCode);

  const user = await client.user.create({
    data: {
      email: sanitizedEmail,
      password: hashedPassword,
      name: sanitizedName,
      lastName: sanitizedLastName,
      friendCode: generatedFriendCode,
    },
  });

  const accessToken = GenerateAccessToken(user.id);
  const refreshToken = GenerateRefreshToken(user.id);

  return { accessToken, refreshToken };
};

export const loginUserService = async (input: { email: string; password: string }) => {
  const { password, email } = input;
  const user = await client.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    throw new CustomError("Invalid credentials", 400);
  }

  const passwordCorrect = await bcrypt.compare(password, user.password);

  if (!passwordCorrect) {
    throw new CustomError("Invalid credentials", 400);
  }

  const accessToken = GenerateAccessToken(user.id);
  const refreshToken = GenerateRefreshToken(user.id);

  return { accessToken, refreshToken };
};

export const getCurrentUserService = async (userId: string) => {
  const user = await client.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      bannerPic: true,
      profilePic: true,
      email: true,
      id: true,
      lastName: true,
      name: true,
      friendCode: true,
      isPrivate: true,
    },
  });

  return { user };
};

export const updateUserProfileService = async ({
  userId,
  profilePic,
  bannerPic,
  email,
  lastName,
  name,
}: {
  userId: string;
  profilePic: string;
  bannerPic: string;
  email: string;
  lastName: string;
  name: string;
}) => {
  const user = await client.user.findUnique({
    where: { id: userId },
    select: { profilePicId: true, bannerPicId: true, bannerPic: true, profilePic: true },
  });

  let uploadedPic: { url: string; fileId: string } = { url: "", fileId: "" };
  if (profilePic && profilePic !== user?.profilePic) {
    if (user?.profilePic) {
      await imagekit.deleteFile(user.profilePicId);
    }

    uploadedPic = await imagekit.upload({
      file: profilePic,
      fileName: `profile-pic-${userId}`,
    });
  }

  let uploadedBannerPic: { url: string; fileId: string } = { url: "", fileId: "" };
  if (bannerPic && bannerPic !== user?.bannerPic) {
    if (user?.bannerPic) {
      await imagekit.deleteFile(user.bannerPicId);
    }

    uploadedBannerPic = await imagekit.upload({
      file: bannerPic,
      fileName: `banner-pic-${userId}`,
    });
  }

  const updateProfile = await client.user.update({
    where: {
      id: userId,
    },
    data: {
      profilePic: uploadedPic.url || user?.profilePic,
      profilePicId: uploadedPic.fileId || user?.profilePicId,
      bannerPic: uploadedBannerPic.url || user?.bannerPic,
      bannerPicId: uploadedBannerPic.fileId || user?.bannerPicId,
      email: email,
      lastName: lastName,
      name: name,
    },
    select: {
      id: true,
      name: true,
      lastName: true,
      email: true,
      profilePic: true,
      bannerPic: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return { updateProfile };
};

export const updateUserPrivacyService = async ({ userId }: { userId: string }) => {
  const currentUser = await client.user.findUnique({
    where: {
      id: userId,
    },
  });

  const updatedPrivacy = await client.user.update({
    where: { id: userId },
    data: {
      isPrivate: !currentUser?.isPrivate,
    },
  });

  return { updatedPrivacy };
};
