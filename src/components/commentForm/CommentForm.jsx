import React from "react";
import "./CommentForm.scss";

const CommentForm = ({ addComment, setNewComment, newComment, isLoading }) => {
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
      <button disabled={isLoading} className="commentForm__btn" type="submit">
        {isLoading ? "Loading..." : "Rate and review"}
      </button>
    </form>
  );
};

export default CommentForm;
