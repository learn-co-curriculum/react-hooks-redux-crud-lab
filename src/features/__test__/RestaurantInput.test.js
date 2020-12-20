import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import RestaurantInput from "../features/restaurants/RestaurantInput";

test("renders an input with a label of 'name'", () => {
  render(<RestaurantInput />);
  expect(screen.queryByLabelText(/name/i)).toBeInTheDocument();
});

test("renders a submit button with the text 'add restaurant'", () => {
  render(<RestaurantInput />);
  expect(screen.queryByText(/add restaurant/i)).toBeInTheDocument();
});
