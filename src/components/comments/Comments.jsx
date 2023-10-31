import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AiFillStar } from "react-icons/ai";
import jwt_decode from "jwt-decode";
import "./Comments.scss";
import CommentForm from "../commentForm/CommentForm";
import RateComponent from "../rateComponent/RateComponent";

const Comments = (props) => {
  const { user } = useSelector((state) => state.auth);
  const { comments = [] } = props;
  const [commentList, setCommentList] = useState(comments);
  const [newComment, setNewComment] = useState({
    rating: 1,
    comment: "",
    author: "",
  });

  useEffect(() => {
    const decodeUser = jwt_decode(user).email.match(/^([^@]+)@/)[1];
    const username = decodeUser.charAt(0).toUpperCase() + decodeUser.slice(1);
    setNewComment({ ...newComment, author: username });
  }, [user]);

  const addComment = (newComment) => {
    setCommentList([...commentList, newComment]);
  };

  return (
    <div className="comments">
      <h3 className="comments__title">Comments & Ratings</h3>
      <ul className="comments__list">
        {commentList.length === 0
          ? "No comments yet"
          : commentList.map((comment, index) => (
              <li key={index} className="comments__item">
                <div className="comments__author">
                  By: {comment.author}{" "}
                  <span>
                    (
                    {Array(5)
                      .fill()
                      .map((_, index) => (
                        <AiFillStar
                          key={index}
                          className={`ratings__star ${
                            index < comment.rating
                              ? "ratings__star--active"
                              : ""
                          }`}
                        />
                      ))}
                    )
                  </span>
                </div>
                <div className="comments__text">{comment.comment}</div>
              </li>
            ))}
      </ul>
      <RateComponent setNewComment={setNewComment} newComment={newComment} />
      <CommentForm
        addComment={addComment}
        newComment={newComment}
        setNewComment={setNewComment}
      />
    </div>
  );
};

export default Comments;
