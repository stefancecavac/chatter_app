import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2, { message: "Name must be minimum 2 characters long" }).max(255, { message: "Name must not exceed 255 characters" }),
  lastName: z
    .string()
    .min(2, { message: "lastName must be minimum 2 characters long" })
    .max(255, { message: "lastName must not exceed 255 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/(?=.*[a-z])/, { message: "Password must contain at least one lowercase letter" })
    .regex(/(?=.*[A-Z])/, { message: "Password must contain at least one uppercase letter" })
    .regex(/(?=.*\d)/, { message: "Password must contain at least one number" })
    .regex(/(?=.*[@$!%*?&])/, { message: "Password must contain at least one special character" }),
});

export type RegisterData = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Email field is empty" }),
  password: z.string().min(1, { message: "Password field is empty" }),
});

export type LoginData = z.infer<typeof loginSchema>;

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().min(2, { message: "Name must be minimum 2 characters long" }).max(255, { message: "Name must not exceed 255 characters" }),
  lastName: z
    .string()
    .min(2, { message: "lastName must be minimum 2 characters long" })
    .max(255, { message: "lastName must not exceed 255 characters" }),
  profilePic: z.union([z.string(), z.null()]),
  bannerPic: z.union([z.string(), z.null()]),
  isPrivate: z.boolean().default(true),
  friendCode: z.string(),

  lastMessage: z.object({ content: z.string(), createdAt: z.string(), senderId: z.string(), isRead: z.boolean() }),
});

export type userData = z.infer<typeof userSchema>;

export const messageSchema = z.object({
  senderId: z.string(),
  receiverId: z.string(),
  content: z.string(),
  createdAt: z.string(),
  isRead: z.boolean(),
  sender: userSchema,
});

export type messageData = z.infer<typeof messageSchema>;

export const sendMessageSchema = z.object({
  content: z
    .string()
    .min(1, { message: "Message must be atleast 1 character long" })
    .max(255, { message: "Message must be under 255 characters long" }),
});

export type SendMessageData = z.infer<typeof sendMessageSchema>;

export const responseMessageSchema = z.object({
  messages: z.array(messageSchema),
  chatUser: userSchema,
  lastMessage: messageSchema,
  hasMore: z.boolean(),
  totalMessages: z.number(),
});

export type responseMessageData = z.infer<typeof responseMessageSchema>;

export const updateUserDataSchema = z.object({
  email: z.string().email().optional(),
  name: z
    .string()
    .min(2, { message: "Name must be minimum 2 characters long" })
    .max(255, { message: "Name must not exceed 255 characters" })
    .optional(),
  lastName: z
    .string()
    .min(2, { message: "lastName must be minimum 2 characters long" })
    .max(255, { message: "lastName must not exceed 255 characters" })
    .optional(),
  profilePic: z.union([z.string(), z.null()]).optional(),
  bannerPic: z.union([z.string(), z.null()]).optional(),
});

export type UpdateUserData = z.infer<typeof updateUserDataSchema>;
