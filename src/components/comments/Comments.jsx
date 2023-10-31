import React, {useState} from "react";
import "./Comments.scss";
import CommentForm from "../commentForm/CommentForm";

const Comments = (props) => {
  const { comments = [] } = props;

  const [commentList, setCommentList] = useState(comments);

  const addComment = (newComment) => {
    setCommentList([...commentList, newComment]);
  };


  return (
    <div className="comments">
      <h3 className="comments__title">Comments</h3>
      <ul className="comments__list">
        {commentList.map((comment, index) => (
          <li key={index} className="comments__item">
            <div className="comments__author">By: {comment.author}</div>
            <div className="comments__text">{comment.text}</div>
          </li>
        ))}
      </ul>
      
      <CommentForm addComment={addComment} />
    </div>
  );
};

export default Comments;
