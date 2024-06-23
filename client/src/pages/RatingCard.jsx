import { Rating } from "@mui/material";
import React from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const RatingCard = ({ packageRatings }) => {
  return (
    <>
      {packageRatings &&
        packageRatings.map((rating, i) => {
          return (
            <div
              key={i}
              className="main relative w-full rounded-lg border p-3 gap-2 flex flex-col"
              id="main"
            >
              <div className="flex gap-2 items-center">
                <img
                  src={rating.userProfileImg || defaultProfileImg}
                  alt={rating.username[0]}
                  className="border w-6 h-6 border-black rounded-[50%]"
                />
                <p className="font-semibold">{rating.username}</p>
              </div>
              <Rating
                value={rating.rating || 0}
                readOnly
                size="small"
                precision={0.1}
              />
              {/* review */}
              <p className="break-all">
                <span
                  className="break-all"
                  id={rating.review.length > 90 ? "review-text" : "none"}
                >
                  {rating.review !== ""
                    ? rating.review.length > 90
                      ? rating.review.substring(0, 45)
                      : rating.review
                    : rating.rating < 3
                    ? "Not Bad"
                    : "Good"}
                </span>
                {rating.review.length > 90 && (
                  <>
                    <button
                      id="more-btn"
                      className={`m-1 font-semibold items-center gap-1 ${
                        rating.review.length > 90 ? "flex" : "hidden"
                      }`}
                      onClick={() => {
                        document.getElementById("popup").style.display =
                          "block";
                        document.getElementById("popup").style.zIndex = "99";
                      }}
                    >
                      More
                      <FaArrowDown />
                    </button>
                  </>
                )}
              </p>
              {/* full review */}
              {rating.review.length > 90 && (
                <div
                  className="hidden bg-white absolute left-0 top-0 popup"
                  id="popup"
                >
                  <div
                    key={i}
                    className="relative w-full rounded-lg border p-3 gap-2 flex flex-col"
                  >
                    <div className="flex gap-2 items-center">
                      <img
                        src={rating.userProfileImg || defaultProfileImg}
                        alt={rating.username[0]}
                        className="border w-6 h-6 border-black rounded-[50%]"
                      />
                      <p className="font-semibold">{rating.username}</p>
                    </div>
                    <Rating
                      value={rating.rating || 0}
                      readOnly
                      size="small"
                      precision={0.1}
                    />
                    {/* review */}
                    <p className="break-words">
                      <span
                        className="break-words"
                        id={rating.review.length > 90 ? "review-text" : "none"}
                      >
                        {rating.review}
                      </span>
                      {rating.review.length > 90 && (
                        <>
                          <button
                            id="less-btn"
                            className={`m-1 font-semibold flex items-center gap-1`}
                            onClick={() => {
                              document.getElementById("popup").style.display =
                                "none";
                            }}
                          >
                            Less
                            <FaArrowUp />
                          </button>
                        </>
                      )}
                    </p>
                  </div>
                </div>
              )}
              {/* full review */}
            </div>
          );
        })}
    </>
  );
};

export default RatingCard;
