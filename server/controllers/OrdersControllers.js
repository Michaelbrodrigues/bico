import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51HoFoRJdlQkvvUXmeoHNOrtYVCaCNz3op2bR7Q9ubTX9rtTcdFAGJYDsCATsJQpSZIXpH10GldVJVqCUawoiVyuo00NfR3hrEm "
);

export const createOrder = async (req, res, next) => {
  try {
    if (req.body.gigId) {
      const { gigId } = req.body;
      const prisma = new PrismaClient();
      const gig = await prisma.gigs.findUnique({
        where: { id: (gigId) },
      });
      const paymentIntent = await stripe.paymentIntents.create({
        amount: gig?.price * 100,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });
      await prisma.orders.create({
        data: {
          paymentIntent: paymentIntent.id,
          price: gig?.price,
          buyer: { connect: { id: req?.userId } },
          gig: { connect: { id: gig?.id } },
        },
      });
      res.status(200).send({
        clientSecret: paymentIntent.client_secret,
      });
    } else {
      res.status(400).send("Gig id is required.");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const confirmOrder = async (req, res, next) => {
  try {
    if (req.body.paymentIntent) {
      const prisma = new PrismaClient();
      await prisma.orders.update({
        where: { paymentIntent: req.body.paymentIntent },
        data: { isCompleted: true },
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const getBuyerOrders = async (req, res, next) => {
  try {
    if (req.userId) {
      const prisma = new PrismaClient();
      const orders = await prisma.orders.findMany({
        where: { buyerId: req.userId, isCompleted: true, },
        include: { gig: true, buyer: true },
      });
      return res.status(200).json({ orders });
    }
    return res.status(400).send("User id is required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const getSellerOrders = async (req, res, next) => {
  try {
    if (req.userId) {
      const prisma = new PrismaClient();
      const orders = await prisma.orders.findMany({
        where: {
          gig: {
            createdBy: {
              id: (req.userId),
            },
          },
          isCompleted: true,
        },
        include: {
          gig: true,
          buyer: true,
        },
      });
      return res.status(200).json({ orders });
    }
    return res.status(400).send("User id is required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const cancelOrder = async (req, res, next) => {
  try {
    if (req.params.orderId) {
      const prisma = new PrismaClient();
      await prisma.orders.delete({
        where: { id: (req.params.orderId) },
      });
      return res.status(200).send("Successfully deleted the gig.");
    }
    return res.status(400).send("GigId should be required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};
