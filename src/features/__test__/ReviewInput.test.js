import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ReviewInput from "../features/bands/ReviewInput";

test("renders an textarea with a label of 'comment'", () => {
  render(<ReviewInput />);
  expect(screen.queryByLabelText(/comment/i)).toBeInTheDocument();
});

test("renders a submit button with the text 'add review'", () => {
  render(<ReviewInput />);
  expect(screen.queryByText(/add review/i)).toBeInTheDocument();
});
