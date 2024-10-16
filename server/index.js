import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/AuthRoutes.js";
import cookieParser from "cookie-parser";
import { gigRoutes } from "./routes/GigRoutes.js";
import { orderRoutes } from "./routes/OrderRoutes.js";
import { messageRoutes } from "./routes/MessageRoutes.js";
import { dashboardRoutes } from "./routes/DashboardRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js"; // Adjust the path as needed

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// CORS configuration
const corsOptions = {
  origin: '*', // Allow all origins temporarily
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions)); // Apply CORS middleware first
app.options('*', cors(corsOptions)); // Handle preflight requests

app.use(cookieParser());
app.use(express.json());

// Apply CORS middleware to specific routes
app.use('/api/auth', cors(corsOptions), authRoutes);
app.use('/api/gigs', cors(corsOptions), gigRoutes);
app.use('/api/orders', cors(corsOptions), orderRoutes);
app.use('/api/messages', cors(corsOptions), messageRoutes);
app.use('/api/dashboard', cors(corsOptions), dashboardRoutes);
app.use('/api', cors(corsOptions), uploadRoutes);

// Test route to verify CORS
app.get('/test-cors', cors(corsOptions), (req, res) => {
  res.json({ message: 'CORS is working!' });
});

// Handle 404 for unknown routes
app.use((req, res) => {
  res.status(404).send("API route not found");
});

// Start server
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
