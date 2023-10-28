import React from "react";

import "./BigLoader.scss";

const BigLoader = () => {
  return (
    <div className="big-loader__container">
      <figure className="big-loader"></figure>
      <p>Loading..</p>
    </div>
  );
};

export default BigLoader;
