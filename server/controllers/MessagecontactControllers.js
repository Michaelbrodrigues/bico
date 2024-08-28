import { PrismaClient } from "@prisma/client";

export const addMessage2 = async (req, res, next) => {
  try {
    const prisma = new PrismaClient();
    if (req.userId && req.body.recipientId && req.body.message) {
      const message = await prisma.message.create({
        data: {
          senderId: req.userId,
          recipientId: req.body.recipientId,
          text: req.body.message,
        },
      });
      return res.status(201).json({ message });
    }
    return res.status(400).send("userId, recipientId, and message are required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const getMessages2 = async (req, res, next) => {
  try {
    if (req.params.recipientId && req.userId) {
      const prisma = new PrismaClient();
      const messages = await prisma.message.findMany({
        where: {
          OR: [
            { senderId: req.userId, recipientId: req.params.recipientId },
            { senderId: req.params.recipientId, recipientId: req.userId },
          ],
        },
        orderBy: { createdAt: "asc" },
      });

      await prisma.message.updateMany({
        where: { recipientId: req.userId, senderId: req.params.recipientId, isRead: false },
        data: { isRead: true },
      });

      return res.status(200).json({ messages });
    }
    return res.status(400).send("Recipient id is required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const getUnreadMessages2 = async (req, res, next) => {
    try {
      if (req.userId) {
        const prisma = new PrismaClient();
        const messages = await prisma.message.findMany({
          where: {
            recipientId: req.userId,
            isRead: false,
          },
          include: {
            sender: true,
          },
        });
        return res.status(200).json({ messages });
      }
      return res.status(400).send("User id is required.");
    } catch (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }
  };
  
  export const markAsRead2 = async (req, res, next) => {
    try {
      if (req.userId && req.params.messageId) {
        const prisma = new PrismaClient();
        await prisma.message.update({
          where: { id: parseInt(req.params.messageId) },
          data: { isRead: true },
        });
        return res.status(200).send("Message mark as read.");
      }
      return res.status(400).send("User id and message Id is required.");
    } catch (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }
  };