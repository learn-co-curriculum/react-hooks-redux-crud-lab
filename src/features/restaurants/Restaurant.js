import React from "react";
import ReviewsContainer from "../reviews/ReviewsContainer";

function Restaurant({ restaurant }) {
  return (
    <div>
      <li>
        {restaurant.text}
        <button> X </button>
        <ReviewsContainer restaurant={restaurant} />
      </li>
    </div>
  );
}

export default Restaurant;
