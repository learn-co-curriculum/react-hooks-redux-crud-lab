import "@testing-library/jest-dom";
import React from "react";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import RestaurantInput from "../features/restaurants/RestaurantInput";
import store from "../store";

test("renders an input with a label of 'name'", () => {
  render(
    <Provider store={store}>
      <RestaurantInput />
    </Provider>
  );
  expect(screen.queryByLabelText(/name/i)).toBeInTheDocument();
});

test("renders a submit button with the text 'add restaurant'", () => {
  render(
    <Provider store={store}>
      <RestaurantInput />
    </Provider>
  );
  expect(screen.queryByText(/add restaurant/i)).toBeInTheDocument();
});
