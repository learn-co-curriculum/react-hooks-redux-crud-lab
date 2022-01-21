# Create and Delete Lab

## Learning Goals

- Create a complex application using React and Redux

## Introduction

In this lab, we will practice creating and removing various items using Redux.
We are working with two different resources, restaurants and reviews, with each
restaurant having many reviews and reviews belonging to a restaurant. You will
implement components to connect each resource to your Redux store.

## Instructions

### Restaurants

Start off by working on the `restaurantsSlice` and create these actions:

- `restaurantAdded`: should take a string of the restaurant name, and add a new
  restaurant to the array of `entities` in state. The restaurant should have a
  `name` and `id`, generated using the `uuid` package.
- `restaurantRemoved`: should take the restaurant ID as the payload, and remove
  the restaurant from the array of `entities` in state.

For your components, start off by working on the components for displaying
restaurants. First, you'll need a `RestaurantInput` component that allows a user
to create new restaurants. Your form should have two inputs: a text input to
enter the name of the restaurant with a label of "Name", and an input with type
equal `submit` and the text of "Add Restaurant".

Next, you will build out the `RestaurantsContainer` component that will connect
to Redux and pass the appropriate props down to its children. You will then want
to create a `Restaurants` component that renders a list of restaurants, and a
`Restaurant` component that is responsible for each individual restaurant.

Users should also be able to delete restaurants, so you will need to wire up the
button rendered in the `Restaurant` component with the text of "Delete
Restaurant".

### Reviews

Next you will work on the reviews resource. Since you'll need to be able to
associate reviews to restaurants, _and_ delete specific reviews, reviews stored
in Redux should have a `comment` key for the review content, a `restaurantId`
key to associate and display the review with a specific restaurant and an `id`
key unique to the review itself.

Start off by working on the `reviewsSlice` and create these actions:

- `reviewAdded`: should take a string of the review comment and the
  restaurantId, and add a new review to the array of `entities` in state. The
  review should have a `comment`, `restaurantId`, and `id`, generated using the
  `uuid` package.
- `reviewRemoved`: should take the review ID as the payload, and remove the
  review from the array of `entities` in state.

Once you've created your `reviewsSlice`, export and use its reducer in the
`./src/store.js` file.

**Note**: Although each review belongs to a specific restaurant, that
relationship should be implemented using the `restaurantId` key, _not_ in the
structure of the store's state. In order to get the tests passing, the state
will need to be structured as follows:

```js
{
  restaurants: { entities: [] },
  reviews: { entities: [] }
}
```

Next, work on the components. You will make a `ReviewInput` component that will
enable users to create a review that is associated with a specific restaurant.
The form should have a `<textarea>` for the content of the review with a label
of "Comment", along with an input of type `submit` and the text of "Add Review".

Next you will build out the `ReviewsContainer`, `Reviews`, and `Review`
components. The `ReviewsContainer` should be nested within the `Restaurant`
component so reviews are displayed underneath the restaurant they belong to.
Users should also be able to delete a specific review using a button with the
text of "Delete Review".

## Conclusion

Once all tests are passing, you'll be able to create and delete restaurants
_and_ their specific reviews.

**Bonus**: Implement **edit** functionality for restaurants and reviews. You
will probably want to include an additional button with each restaurant and
review that, when clicked, will open an input where a user could modify the
contents of a specific item. You will then need to dispatch an **update** action
to the reducer to update the store.
