import React from "react";
import { AiFillStar } from "react-icons/ai";

import "./Ratings.scss";

const Ratings = (props) => {
  const { ratings = [], meetup } = props;

  // Calculate the middle value of the ratings array
  const getMiddleValue = () => {
    const numericRatings = ratings
      .map((rating) => parseInt(rating, 10))
      .filter((rating) => !isNaN(rating));

    if (numericRatings.length === 0) {
      return 0;
    }

    const sortedRatings = numericRatings.sort((a, b) => a - b);
    const middleIndex = Math.floor(sortedRatings.length / 2);
    return sortedRatings[middleIndex];
  };

  return (
    <div className="ratings">
      <div className="ratings__stars">
        {Array(5)
          .fill()
          .map((_, index) => (
            <AiFillStar
              key={index}
              className={`ratings__star ${
                index < getMiddleValue() ? "ratings__star--active" : ""
              }`}
            />
          ))}
      </div>
      <div className="ratings__info">
        <span className="ratings-text">
          ({ratings.length} ratings out of {meetup.participants} participants)
        </span>
      </div>
    </div>
  );
};

export default Ratings;
