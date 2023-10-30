import React from "react";

import "./Error.scss";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="error">
      <h1>404</h1>
      <h2>Page not found</h2>
      <Link to="/">Back to home</Link>
    </div>
  );
};

export default Error;
