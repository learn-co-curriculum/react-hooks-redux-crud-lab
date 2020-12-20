import React from "react";

function Review({ review }) {
  return (
    <div>
      <li>{review.text}</li>
      <button> X </button>
    </div>
  );
}

export default Review;
