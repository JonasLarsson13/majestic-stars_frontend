import React from "react";
//import "./Comments.scss";

const Comments = (props) => {
  const { comments = [] } = props;

  return (
    <div className="comments">
      <h2 className="comments__title">Comments</h2>
      <ul className="comments__list">
        {comments.map((comment, index) => (
          <li key={index} className="comments__item">
            <div className="comments__author">{comment.author}</div>
            <div className="comments__text">{comment.text}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
