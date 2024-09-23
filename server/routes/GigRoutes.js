import { Router } from "express";
import {
  addGig,
  deleteGig,
  checkGigOrder,
  editGig,
  getGigData,
  getUserAuthGigs,
  searchGigs,
  addReview,
} from "../controllers/GigsController.js";
import multer from "multer";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const upload = multer({ dest: "uploads/" });

export const gigRoutes = Router();

// DELETE /gigs/:gigId
gigRoutes.delete('/:gigId', verifyToken, deleteGig);

// POST /gigs/add
gigRoutes.post("/add", verifyToken, upload.array("images"), addGig);

// GET /gigs/get-user-gigs
gigRoutes.get("/get-user-gigs", verifyToken, getUserAuthGigs);

// GET /gigs/get-gig-data/:gigId
gigRoutes.get("/get-gig-data/:gigId", getGigData);

// PUT /gigs/edit-gig/:gigId
gigRoutes.put("/edit-gig/:gigId", verifyToken, upload.array("images"), editGig);

// GET /gigs/search-gigs
gigRoutes.get("/search-gigs", searchGigs);

// POST /gigs/add-review
gigRoutes.post("/add-review", verifyToken, addReview);

// GET /gigs/check-gig-order/:gigId
gigRoutes.get("/check-gig-order/:gigId", verifyToken, checkGigOrder);

// POST /gigs/add-review/:gigId
gigRoutes.post("/add-review/:gigId", verifyToken, addReview);

// DELETE /gigs/:gigId
// gigRoutes.delete('/:gigId', verifyToken, deleteGig);
// gigRoutes.post("/add", verifyToken, upload.array("images"), addGig);
// gigRoutes.post("/add", verifyToken, addGig);
// gigRoutes.get("/get-user-gigs", verifyToken, getUserAuthGigs);
// gigRoutes.get("/get-gig-data/:gigId", getGigData);
// gigRoutes.put("/edit-gig/:gigId", verifyToken, upload.array("images"), editGig);
// gigRoutes.put("/edit-gig/:gigId", verifyToken, editGig);
// gigRoutes.get("/search-gigs", searchGigs);
// gigRoutes.post("/add-review", verifyToken, addReview);
// gigRoutes.get("/check-gig-order/:gigId", verifyToken, checkGigOrder);
// gigRoutes.post("/add-review/:gigId", verifyToken, addReview);
