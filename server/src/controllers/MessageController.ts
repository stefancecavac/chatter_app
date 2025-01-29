import { NextFunction, Request, Response } from "express";
import { getMessageWithChaterService, markMessageAsReadService, sendMessageToChatterService } from "../service/messageService";
import { CustomError } from "../config/CustomError";
import validator from "validator";

export const getMessageWithChatter = async (req: Request, res: Response, next: NextFunction) => {
  const { receiverId } = req.params;
  const { userId } = req.user;
  const { skip, take } = req.query;
  const parsedSkip = parseInt(skip as string, 10) || 0;
  const parsedTake = parseInt(take as string, 10) || 20;

  try {
    if (!validator.isUUID(userId)) {
      throw new CustomError("Not a valid id", 400);
    }
    const { chatUser, lastMessage, messages, hasMore } = await getMessageWithChaterService({
      receiverId,
      userId,
      skip: parsedSkip,
      take: parsedTake,
    });

    res.status(200).json({ messages, chatUser, lastMessage, hasMore });
  } catch (error) {
    next(error);
  }
};

export const sendMessageToChatter = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { content } = req.body;
  const { receiverId } = req.params;
  const { userId } = req.user;

  if (!content) {
    throw new CustomError("Message must be atleast 1 character long", 400);
  }

  if (content.length > 255) {
    throw new CustomError("Message must be under 255 characters long", 400);
  }

  try {
    const { createMessage } = await sendMessageToChatterService({ content, receiverId, userId });

    res.status(200).json(createMessage);
  } catch (error) {
    next(error);
  }
};

export const markMessageAsRead = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { receiverId } = req.params;
  const { userId } = req.user;

  try {
    const { markAsRead } = await markMessageAsReadService({ receiverId, userId });

    res.status(200).json(markAsRead);
  } catch (error) {
    next(error);
  }
};
