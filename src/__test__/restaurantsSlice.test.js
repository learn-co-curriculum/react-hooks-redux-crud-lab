import restaurantsReducer, {
  restaurantAdded,
  restaurantRemoved,
} from "../features/restaurants/restaurantsSlice";

describe("actions", () => {
  test("restaurantAdded returns an action with a type of 'restaurants/restaurantAdded' and a payload of the new restaurant name", () => {
    expect(restaurantAdded("test")).toEqual({
      type: "restaurants/restaurantAdded",
      payload: "test",
    });
  });

  test("restaurantRemoved returns an action with a type of 'restaurants/restaurantRemoved' and a payload of the ID", () => {
    expect(restaurantRemoved(1)).toEqual({
      type: "restaurants/restaurantRemoved",
      payload: 1,
    });
  });
});

describe("reducer", () => {
  test("returns the correct initial state", () => {
    expect(restaurantsReducer(undefined, {})).toEqual({ entities: [] });
  });

  test("handles 'restaurants/restaurantAdded'", () => {
    expect(
      restaurantsReducer({ entities: [] }, restaurantAdded("test 1"))
    ).toEqual({
      entities: expect.arrayContaining([
        expect.objectContaining({
          name: "test 1",
          id: expect.any(String),
        }),
      ]),
    });

    expect(
      restaurantsReducer(
        {
          entities: [{ id: "1", name: "test 1" }],
        },
        restaurantAdded("test 2")
      )
    ).toEqual({
      entities: expect.arrayContaining([
        expect.objectContaining({
          name: "test 1",
          id: expect.any(String),
        }),
        expect.objectContaining({
          name: "test 2",
          id: expect.any(String),
        }),
      ]),
    });
  });

  test("handles 'restaurants/restaurantRemoved'", () => {
    expect(
      restaurantsReducer(
        {
          entities: [
            { id: "1", name: "test" },
            { id: "2", name: "test 2" },
          ],
        },
        restaurantRemoved("2")
      )
    ).toEqual({
      entities: [{ id: "1", name: "test" }],
    });

    expect(
      restaurantsReducer({ entities: [] }, restaurantRemoved("1"))
    ).toEqual({
      entities: [],
    });
  });
});
