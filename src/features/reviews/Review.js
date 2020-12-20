import React from "react";

function Review({ review }) {
  return (
    <div>
      <li>{review.comment}</li>
      <button> Delete Review </button>
    </div>
  );
}

export default Review;
