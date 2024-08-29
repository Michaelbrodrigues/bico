import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/AuthRoutes.js";
import cookieParser from "cookie-parser";
import { gigRoutes } from "./routes/GigRoutes.js";
import { orderRoutes } from "./routes/OrderRoutes.js";
import { messageRoutes } from "./routes/MessageRoutes.js";
import { dashboardRoutes } from "./routes/DashboardRoutes.js";

dotenv.config();

const express = require('express');
const cors = require('cors');
const app = express();
//const port = process.env.PORT;

app.use(
  cors({
    origin: 'https://bico-client.vercel.app',
    methods: ["GET"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 600,
    credentials: true,
  })
);

app.use("/uploads", express.static("uploads"));
app.use("/uploads/profiles", express.static("uploads/profiles"));

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/dashboard", dashboardRoutes);

/*app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});*/
