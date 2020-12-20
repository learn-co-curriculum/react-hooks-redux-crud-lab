import "@testing-library/jest-dom";
import React from "react";
import { Provider } from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react";
import Review from "../features/reviews/Review";
import { reviewAdded } from "../features/reviews/reviewsSlice";
import store from "../store";

store.dispatch(reviewAdded({ restaurantId: "1", comment: "test 1" }));
store.dispatch(reviewAdded({ restaurantId: "1", comment: "test 2" }));

const { entities } = store.getState().reviews;
const [review1, review2] = entities;

test("takes a prop of review and creates an element displaying the review comment", () => {
  render(
    <Provider store={store}>
      <Review review={review1} />
    </Provider>
  );
  expect(screen.queryByText(review1.comment)).toBeInTheDocument();
});

test("displays a delete button", () => {
  render(
    <Provider store={store}>
      <Review review={review1} />
    </Provider>
  );
  expect(screen.queryByText(/Delete Review/i)).toBeInTheDocument();
  expect(screen.queryByText(/Delete Review/i).tagName).toBe("BUTTON");
});

test("clicking the delete button removes the review from the redux store", () => {
  render(
    <Provider store={store}>
      <Review review={review2} />
    </Provider>
  );
  fireEvent.click(screen.queryByText(/Delete Review/i));

  expect(store.getState().reviews.entities).toEqual([review1]);
});
