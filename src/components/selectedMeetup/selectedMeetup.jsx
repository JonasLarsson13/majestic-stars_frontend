import React from "react";

const SelectedMeetup = ({ meetup }) => {
  return (
    <div>
        <h1>Selected meetup</h1>
      <h1>{meetup.title}</h1>
      <p>{meetup.description}</p>
      {/* Add additional details you want to display */}
      <Link to="/">Back to home</Link>
    </div>
  );
};

export default SelectedMeetup;
