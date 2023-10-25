import React from "react";
import {
  AiFillFacebook,
  AiOutlineTwitter,
  AiTwotoneMail,
  AiFillCopy,
  AiFillLinkedin,
} from "react-icons/ai";
import { BsPinterest } from "react-icons/bs";

import "./share.scss";

const Share = (props) => {
  const { description, url } = props;

  return (
    <div className="share">
      <h1>Share this event</h1>
      <div className="share__item">
        {/* Share on facebook */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
          target="_blank"
        >
          <AiFillFacebook /> Facebook
        </a>
      </div>
      <div className="share__item">
        {/* Twitter */}
        <a
          href={`https://twitter.com/intent/tweet?url=${url}&text=${encodeURI(
            description
          )}`}
          target="_blank"
        >
          <AiOutlineTwitter /> Twitter
        </a>
      </div>
      <div className="share__item">
        {/* LinkedIn */}
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
          target="_blank"
        >
          <AiFillLinkedin /> LinkedIn
        </a>
      </div>
      <div className="share__item">
        {/* Pintrest */}
        <a
          href={`https://pinterest.com/pin/create/button/?url=${url}&media=&description=${encodeURI(
            description
          )}`}
          target="_blank"
        >
          <BsPinterest /> Pinterest
        </a>
      </div>
      <div className="share__item">
        {/* Email */}
        <a
          href={`mailto:info@example.com?&subject=You+have+to+See+this!&cc=&bcc=&body=Check+out+this+meetup:${url}\n${encodeURI(
            description
          )}`}
          target="_blank"
        >
          <AiTwotoneMail /> Email
        </a>
      </div>
      <div className="share__item">
        {/* Copy link */}
        <button onClick={() => navigator.clipboard.writeText(url)}>
          <AiFillCopy /> Copy Link
        </button>
      </div>
    </div>
  );
};

export default Share;
