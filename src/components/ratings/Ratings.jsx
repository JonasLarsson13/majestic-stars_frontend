import React from "react";
import { AiFillStar } from "react-icons/ai";


import "./Ratings.scss";

const Ratings = (props) => {
  const { ratings = [], meetup} = props;

  const getAverageRating = () => {
    if (ratings.length === 0) {
      return 0;
    }

    const totalRating = ratings.reduce(
      (acc, rating) => acc + parseFloat(rating),
      0
    );
    return Math.round((totalRating / ratings.length).toFixed(1));
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
                index < getAverageRating() ? "ratings__star--active" : ""
              }`}
            />
          ))}
      </div>
      <div className="ratings__info">
        <span className="ratings-text">
          ({ratings.length} ratings out of {meetup?.participants?.length}{" "}
          participants)
        </span>
      </div>
    </div>
  );
};

export default Ratings;
