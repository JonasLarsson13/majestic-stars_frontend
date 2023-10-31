import React, { useState } from "react";
import "./CommentForm.scss";

const CommentForm = ({ addComment, setNewComment, newComment }) => {
  const handleTextChange = (e) => {
    setNewComment({ ...newComment, comment: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addComment(newComment);

    setNewComment({ rating: 1, comment: "", author: newComment.author });
  };

  return (
    <form className="commentForm" onSubmit={handleSubmit}>
      <textarea
        className="commentForm__textArea"
        placeholder="Comment"
        value={newComment.comment}
        onChange={handleTextChange}
      />
      <button className="commentForm__btn" type="submit">
        Add Comment
      </button>
    </form>
  );
};

export default CommentForm;
