import "@testing-library/jest-dom";
import React from "react";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import ReviewInput from "../features/reviews/ReviewInput";
import store from "../store";

test("renders an textarea with a label of 'comment'", () => {
  render(
    <Provider store={store}>
      <ReviewInput restaurantId="1" />
    </Provider>
  );
  expect(screen.queryByLabelText(/comment/i)).toBeInTheDocument();
});

test("renders a submit button with the text 'add review'", () => {
  render(
    <Provider store={store}>
      <ReviewInput restaurantId="1" />
    </Provider>
  );
  expect(screen.queryByText(/add review/i)).toBeInTheDocument();
});
