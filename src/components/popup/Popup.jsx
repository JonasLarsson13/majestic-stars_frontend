import React from "react";
import { GrClose } from "react-icons/gr";

import "./Popup.scss";

const Popup = (props) => {
  const { showPopup, setShowPopup, width } = props;
  return (
    <div className={`popup ${showPopup ? "active" : null}`}>
      <div
        className={`popup__content ${showPopup ? "active" : null}`}
        style={{ maxWidth: width }}
      >
        <figure className="popup__close-btn">
          <GrClose onClick={() => setShowPopup(false)} />
        </figure>
        {props.children}
      </div>
    </div>
  );
};

export default Popup;
