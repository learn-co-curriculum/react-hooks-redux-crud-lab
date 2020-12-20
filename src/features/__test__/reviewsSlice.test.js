import reviewsReducer, {
  reviewAdded,
  reviewRemoved,
} from "../features/reviews/reviewsSlice";

describe("actions", () => {
  test("reviewAdded returns an action with a type of 'reviews/reviewAdded' and a payload of the new review comment and restaurantId", () => {
    expect(reviewAdded({ restaurantId: "1", comment: "test" })).toEqual({
      type: "reviews/reviewAdded",
      payload: "test",
    });
  });

  test("reviewRemoved returns an action with a type of 'reviews/reviewRemoved' and a payload of the ID", () => {
    expect(reviewRemoved("1")).toEqual({
      type: "reviews/reviewRemoved",
      payload: "1",
    });
  });
});

describe("reducer", () => {
  test("returns the correct initial state", () => {
    expect(reviewsReducer(undefined, {})).toEqual({ entities: [] });
  });

  test("handles 'reviews/reviewAdded'", () => {
    expect(
      reviewsReducer(
        { entities: [] },
        reviewAdded({ restaurantId: "1", comment: "test 1" })
      )
    ).toEqual({
      entities: expect.arrayContaining([
        expect.objectContaining({
          comment: "test 1",
          restaurantId: "1",
          id: expect.any(String),
        }),
      ]),
    });

    expect(
      reviewsReducer(
        {
          entities: [{ id: "1", restaurantId: "1", comment: "test 1" }],
        },
        reviewAdded({ restaurantId: "1", comment: "test 2" })
      )
    ).toEqual({
      entities: expect.arrayContaining([
        expect.objectContaining({
          comment: "test 1",
          restaurantId: "1",
          id: "1",
        }),
        expect.objectContaining({
          comment: "test 2",
          restaurantId: "1",
          id: expect.any(String),
        }),
      ]),
    });
  });

  test("handles 'reviews/reviewRemoved'", () => {
    expect(
      reviewsReducer(
        {
          entities: [
            { id: "1", restaurantId: "1", comment: "test 1" },
            { id: "2", restaurantId: "1", comment: "test 2" },
          ],
        },
        {
          type: "reviews/reviewRemoved",
          payload: "2",
        }
      )
    ).toEqual({
      entities: expect.arrayContaining([
        expect.objectContaining({
          comment: "test 1",
          restaurantId: "1",
          id: "1",
        }),
      ]),
    });

    expect(
      reviewsReducer(
        { entities: [] },
        {
          type: "reviews/reviewRemoved",
          payload: "1",
        }
      )
    ).toEqual({
      entities: [],
    });
  });
});
