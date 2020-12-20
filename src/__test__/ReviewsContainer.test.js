import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import ReviewsContainer from "../features/reviews/ReviewsContainer";
import { reviewAdded } from "../features/reviews/reviewsSlice";
import store from "../store";

store.dispatch(reviewAdded({ restaurantId: "1", comment: "review 1" }));
store.dispatch(reviewAdded({ restaurantId: "1", comment: "review 2" }));

test("renders each review comment from the store", () => {
  render(
    <Provider store={store}>
      <ReviewsContainer restaurantId="1" />
    </Provider>
  );

  expect(screen.queryByText("review 1")).toBeInTheDocument();
  expect(screen.queryByText("review 2")).toBeInTheDocument();
});

test("adds a new review when the reviewInput form is submitted", () => {
  render(
    <Provider store={store}>
      <ReviewsContainer restaurantId="1" />
    </Provider>
  );

  fireEvent.change(screen.queryAllByLabelText(/comment/i)[0], {
    target: { value: "review 3" },
  });

  fireEvent.submit(screen.queryByText(/add review/i));

  fireEvent.change(screen.queryAllByLabelText(/comment/i)[0], {
    target: { value: "" },
  });

  expect(screen.queryByText("review 3")).toBeInTheDocument();
});
