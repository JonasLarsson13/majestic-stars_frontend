import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";

import "./RateComponent.scss";

const RateComponent = (props) => {
  const { setNewComment, newComment } = props;
  const [rate, setRate] = useState(1);

  const handleClick = (index) => {
    setNewComment({ ...newComment, rating: index + 1 });
  };

  return (
    <div className="rate-component">
      {Array(5)
        .fill()
        .map((_, index) => (
          <AiFillStar
            key={index}
            onMouseOver={() => setRate(index + 1)}
            onMouseLeave={() => setRate(0)}
            onClick={() => handleClick(index)}
            className={
              index < newComment.rating
                ? "ratings__star--active"
                : `ratings__star ${index < rate ? "ratings__star--active" : ""}`
            }
          />
        ))}
    </div>
  );
};

export default RateComponent;
