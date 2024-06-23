import { Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import RatingCard from "./RatingCard";

const RatingsPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [packageRatings, setPackageRatings] = useState([]);
  const [showRatingStars, setShowRatingStars] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [loading, setLoading] = useState(false);

  const getRatings = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/rating/get-ratings/${params.id}/999999999999`
      );
      const res2 = await fetch(`/api/rating/average-rating/${params.id}`);
      const data = await res.json();
      const data2 = await res2.json();
      if (data && data2) {
        setPackageRatings(data);
        setShowRatingStars(data2.rating);
        setTotalRatings(data2.totalRatings);
        setLoading(false);
      } else {
        setPackageRatings("No ratings yet!");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.id) getRatings();
  }, [params.id]);

  return (
    <div className="w-full p-3">
      <div className="w-full">
        {loading && <h1 className="text-center text-2xl">Loading...</h1>}
        {!loading && !packageRatings && (
          <h1 className="text-center text-2xl">No Ratings Found!</h1>
        )}
        {!loading && packageRatings && (
          <div className="w-full p-2 flex flex-col gap-2">
            <h1 className="flex items-center mb-2">
              Rating:
              <Rating
                size="large"
                value={showRatingStars || 0}
                readOnly
                precision={0.1}
              />
              ({totalRatings})
            </h1>
            <button
              onClick={() => navigate(`/package/${params?.id}`)}
              className="p-2 py-1 border rounded w-min hover:bg-slate-500 hover:text-white"
            >
              Back
            </button>
            <hr />
            <div className="w-full p-2 grid 2xl:grid-cols-7 xl:grid-cols-6 xlplus:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3">
              <RatingCard packageRatings={packageRatings} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RatingsPage;
