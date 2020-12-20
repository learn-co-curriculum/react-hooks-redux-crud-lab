import { configureStore } from "@reduxjs/toolkit";

import restaurantsReducer from "./features/restaurants/restaurantsSlice";

const store = configureStore({
  reducer: {
    restaurants: restaurantsReducer,
  },
});

export default store;
