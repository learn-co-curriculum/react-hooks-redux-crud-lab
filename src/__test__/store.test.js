import store from "../store";

test("has separate keys for restaurants and reviews", () => {
  store.dispatch({ type: "@@INIT" });
  expect(store.getState()).toEqual({
    restaurants: expect.objectContaining({
      entities: [],
    }),
    reviews: expect.objectContaining({
      entities: [],
    }),
  });
});
