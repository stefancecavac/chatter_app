import { NextFunction, Request, Response } from "express";
import {
  addFriendWithCodeService,
  getFriendsWithLastMessageService,
  removeFriendService,
  searchFriendsAndUsersService,
} from "../service/FriendService";

export const getFriendsController = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.user;
  try {
    const { sortedFriends } = await getFriendsWithLastMessageService(userId);
    res.status(200).json(sortedFriends);
  } catch (error) {
    next(error);
  }
};

export const addFriendWithCode = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.user;
  const { friendCode } = req.body;
  try {
    const { friend } = await addFriendWithCodeService({ userId, friendCode });
    res.status(200).json(friend);
  } catch (error) {
    next(error);
  }
};

export const removeFriend = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.user;
  const { friendId } = req.params;
  try {
    const { removeFriend } = await removeFriendService({ userId, friendId });
    res.status(200).json(removeFriend);
  } catch (error) {
    next(error);
  }
};

export const searchFriendsAndUsersController = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.user;
  const query = req.query.q as string;

  try {
    const { searchFriendsAndUsers } = await searchFriendsAndUsersService({ userId, query });
    res.status(200).json(searchFriendsAndUsers);
  } catch (error) {
    next(error);
  }
};
