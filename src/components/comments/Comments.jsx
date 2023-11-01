import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiFillStar } from "react-icons/ai";
import jwt_decode from "jwt-decode";
import "./Comments.scss";
import CommentForm from "../commentForm/CommentForm";
import RateComponent from "../rateComponent/RateComponent";
import { commentAndRateMeetup } from "../../actions/meetupsActions";

const Comments = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { comments = [], isUserAttended, meetupId } = props;
  const [commentList, setCommentList] = useState(comments);
  const [newComment, setNewComment] = useState({
    rating: 1,
    comment: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const editEmailToUsername = (text) => {
    const editEmail = text.match(/^([^@]+)@/)[1];
    const username = editEmail.charAt(0).toUpperCase() + editEmail.slice(1);
    return username.replace(/[.-]/g, " ");
  };

  const addCommentToList = () => {
    setCommentList([
      ...commentList,
      { ...newComment, email: jwt_decode(user).email },
    ]);
  };

  const addComment = (newComment) => {
    dispatch(
      commentAndRateMeetup(
        meetupId,
        {
          rating: newComment.rating,
          comment: newComment.comment,
        },
        setIsLoading,
        addCommentToList
      )
    );
  };

  return (
    <div className="comments">
      <h3 className="comments__title">Rates and reviews</h3>
      <ul className="comments__list">
        {commentList.length === 0
          ? "No reviews yet"
          : commentList.map((comment, index) => (
              <li key={index} className="comments__item">
                <div className="comments__author">
                  {editEmailToUsername(comment.email)}{" "}
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
        {isLoading && <div>Loading...</div>}
      </ul>
      {user.length > 0 && isUserAttended && (
        <>
          <RateComponent
            setNewComment={setNewComment}
            newComment={newComment}
          />
          <CommentForm
            addComment={addComment}
            newComment={newComment}
            setNewComment={setNewComment}
            isLoading={isLoading}
          />
        </>
      )}
    </div>
  );
};

export default Comments;
