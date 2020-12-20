import React from "react";
import Restaurant from "./Restaurant";

function Restaurants({ restaurants }) {
  return (
    <ul>
      {restaurants.map((r) => (
        <Restaurant key={r.id} restaurant={r} />
      ))}
    </ul>
  );
}

export default Restaurants;
