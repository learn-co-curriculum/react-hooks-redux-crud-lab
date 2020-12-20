import { configureStore } from "@reduxjs/toolkit";

import restaurantsReducer from "./features/restaurants/restaurantsSlice";
import reviewsReducer from "./features/reviews/reviewsSlice";

const store = configureStore({
  reducer: {
    restaurants: restaurantsReducer,
    reviews: reviewsReducer,
  },
});

export default store;
