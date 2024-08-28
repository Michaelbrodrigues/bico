import { PrismaClient } from "@prisma/client";

export const addPreTransactionMessage = async (req, res, next) => {
  try {
    if (req.userId && req.body.recipientId && req.body.message) {
      const prisma = new PrismaClient();
      const message = await prisma.preTransactionMessage.create({
        data: {
          text: req.body.message,
          senderId: req.userId,
          recipientId: req.body.recipientId,
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

export const getPreTransactionMessages = async (req, res, next) => {
  try {
    const recipientId = req.params.recipientId;
    const userId = req.userId; // Ensure this is set correctly

    if (!recipientId || !userId) {
      return res.status(400).send("Recipient ID and User ID are required.");
    }

    const prisma = new PrismaClient();

    // Fetch all messages where the user is either the sender or recipient
    const allMessages = await prisma.preTransactionMessage.findMany({
      where: {
        OR: [
          { senderId: userId },
          { recipientId: userId }
        ]
      },
      include: {
        sender: true,
        recipient: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    console.log('Fetched messages:', allMessages); // Log messages for debugging

    return res.status(200).json({ messages: allMessages });
  } catch (error) {
    console.error('Error in getPreTransactionMessages:', error);
    return res.status(500).send("Internal Server Error");
  }
};


export const addMessage = async (req, res, next) => {
  try {
    const prisma = new PrismaClient();

    if (
      req.userId &&
      req.body.recipientId &&  // Use recipientId consistently
      req.params.orderId &&
      req.body.message
    ) {
      const message = await prisma.message.create({
        data: {
          sender: {
            connect: {
              id: req.userId, // No need for type assertion
            },
          },
          recipient: {
            connect: {
              id: req.body.recipientId, // Consistent field name
            },
          },
          order: {
            connect: {
              id: req.params.orderId,
            },
          },
          text: req.body.message,
        },
      });
      return res.status(201).json({ message });
    }
    return res
      .status(400)
      .send("userId, recipientId, orderId and message is required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { userId } = req;

    if (orderId && userId) {
      const prisma = new PrismaClient();
      
      // Fetch all messages related to the order, regardless of sender or recipient
      const messages = await prisma.message.findMany({
        where: {
          orderId: orderId,
        },
        orderBy: {
          createdAt: "asc",
        },
        include: {
          sender: true,
          recipient: true,
        },
      });

      // Mark messages as read for the current user
      await prisma.message.updateMany({
        where: {
          orderId: orderId,
          recipientId: userId,
        },
        data: {
          isRead: true,
        },
      });

      // Determine the recipientId for the response based on the current user
      const order = await prisma.orders.findUnique({
        where: { id: orderId },
        include: { gig: true },
      });

      let recipientId;
      if (order?.buyerId === userId) {
        recipientId = order.gig.userId; // Seller's ID
      } else if (order?.gig.userId === userId) {
        recipientId = order.buyerId; // Buyer's ID
      }

      return res.status(200).json({ messages, recipientId });
    }

    return res.status(400).send("Order id is required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const getUnreadMessages = async (req, res, next) => {
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

export const markAsRead = async (req, res, next) => {
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
