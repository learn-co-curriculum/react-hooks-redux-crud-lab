import React from "react";
import { useSelector } from "react-redux";
import RestaurantInput from "./RestaurantInput";
import Restaurants from "./Restaurants";

function RestaurantsContainer() {
  const restaurants = useSelector((state) => state.restaurants.entities);
  return (
    <div>
      <RestaurantInput />
      <Restaurants restaurants={restaurants} />
    </div>
  );
}

export default RestaurantsContainer;
