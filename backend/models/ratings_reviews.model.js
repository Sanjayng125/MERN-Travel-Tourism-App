import mongoose from "mongoose";

const ratingsReviewsSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
    },
    review: {
      type: String,
    },
    packageId: {
      type: String,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    userProfileImg: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
  },
  { timestamps: true }
);

const RatingReview = mongoose.model("RatingReview", ratingsReviewsSchema);

export default RatingReview;
