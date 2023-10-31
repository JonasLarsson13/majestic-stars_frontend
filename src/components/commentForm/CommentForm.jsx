import React, { useState } from "react";
import "./CommentForm.scss";

const CommentForm = ({ addComment }) => {
  const [newComment, setNewComment] = useState({ author: "", text: "" });

  const handleAuthorChange = (e) => {
    setNewComment({ ...newComment, author: e.target.value });
  };

  const handleTextChange = (e) => {
    setNewComment({ ...newComment, text: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    addComment(newComment);
   
    setNewComment({ author: "", text: "" });
  };

  return (
    <form className="commentForm" onSubmit={handleSubmit}>
      <input className="commentForm__input"
        type="text"
        placeholder="Author"
        value={newComment.author}
        onChange={handleAuthorChange}
      />
      <textarea className="commentForm__textArea"
        placeholder="Comment"
        value={newComment.text}
        onChange={handleTextChange}
      />
      <button className="commentForm__btn" type="submit">Add Comment</button>
    </form>
  );
};

export default CommentForm;
