import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

import {
  addMessage,
  getMessages,
  getUnreadMessages,
  markAsRead,
  addPreTransactionMessage,
  getPreTransactionMessages
} from "../controllers/MessageControllers.js";
import {
  addMessage2,
  getMessages2,
  getUnreadMessages2,
  markAsRead2,
} from "../controllers/MessagecontactControllers.js";

export const messageRoutes = Router();

messageRoutes.post("/add-message/:orderId", verifyToken, addMessage);
messageRoutes.get("/get-messages/:orderId", verifyToken, getMessages);
messageRoutes.get("/unread-messages", verifyToken, getUnreadMessages);
messageRoutes.put("/mark-as-read/:messageId", verifyToken, markAsRead);

// Pre-Transaction Messaging Routes
messageRoutes.post("/add-pre-transaction/:recipientId", verifyToken, addPreTransactionMessage);
messageRoutes.get("/get-pre-transaction/:recipientId", verifyToken, getPreTransactionMessages);

messageRoutes.post("/add-message", verifyToken, addMessage2);
messageRoutes.get("/get-messages/:recipientId", verifyToken, getMessages2);
messageRoutes.get("/unread-messages", verifyToken, getUnreadMessages2);
messageRoutes.put("/mark-as-read/:messageId", verifyToken, markAsRead2);