import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import {
  averageRating,
  getAllRatings,
  giveRating,
  ratingGiven,
} from "../controllers/rating.controller.js";

const router = express.Router();

//create a rating/review
router.post("/give-rating", requireSignIn, giveRating);

//get average rating of package
router.get("/average-rating/:id", averageRating);

//check if rating given by user to a package
router.get("/rating-given/:userId/:packageId", requireSignIn, ratingGiven);

//get all ratings by package id
router.get("/get-ratings/:id/:limit", getAllRatings);

export default router;
