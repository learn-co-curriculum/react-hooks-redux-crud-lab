import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import RestaurantsContainer from "../features/restaurants/RestaurantsContainer";
import { restaurantAdded } from "../features/restaurants/restaurantsSlice";
import store from "../store";

store.dispatch(restaurantAdded("test 1"));
store.dispatch(restaurantAdded("test 2"));

test("renders each restaurant name from the store", () => {
  render(
    <Provider store={store}>
      <RestaurantsContainer />
    </Provider>
  );

  expect(screen.queryByText("test 1")).toBeInTheDocument();
  expect(screen.queryByText("test 2")).toBeInTheDocument();
});

test("adds a new restaurant when the RestaurantInput form is submitted", () => {
  render(
    <Provider store={store}>
      <RestaurantsContainer />
    </Provider>
  );

  fireEvent.change(screen.queryByLabelText(/name/i), {
    target: { value: "test 3" },
  });

  fireEvent.submit(screen.queryByText(/add restaurant/i));

  expect(screen.queryByText("test 3")).toBeInTheDocument();
});
