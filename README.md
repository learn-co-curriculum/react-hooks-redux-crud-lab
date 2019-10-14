# Create and Delete Lab

## Objectives

Implement a Yelp-like application where users can create and delete both
restaurants and reviews of each restaurant.

Implement a Yelp-like application with restaurants and reviews.

In this lab, we will practice creating and removing various items. We are
working with two different resources, with each restaurant having many reviews
and reviews belonging to a restaurant. Similar to the previous Redux delete lab,
implement container components to connect to your Redux store - one for
restaurants and one for reviews.

**Hint**: Container components can be nested as children just as any other
component, even if they aren't actually displaying any visual content.

## Instructions

1. Start off by working the components for restaurants. First you'll need to
create a __RestaurantsContainer__ component that will connect to Redux and pass
the appropriate props down to its children. Then you will need a
__RestaurantInput__ component that allows a user to create new restaurants. You
will then want to create a __Restaurants__ component that displays a list of
restaurants, and a __Restaurant__ component which is responsible for each
restaurant (and contains the button to _delete_). Users should also be able to
delete restaurants, and to implement that you will need to give each restaurant
an id. the

**Note**: To implement ids, it may be worth integrating another library in the
reducer called cuid. You can see that we already imported it in the reducer
file for you. The library will generate a unique id for you:

  ```javascript
  import cuid from 'cuid';

  console.log(cuid());
  // ch72gsb320000udocl363eofy
  ```

For simplicity with testing, restaurant data stored in Redux should have `text`
and `id` keys.

2. You will also need to create a reviews resource. Similar to the components
for Restaurant, users should be able to create a review that is specifically
associated with the related restaurant, and those reviews should be displayed
underneath the related restaurant. Because reviews are associated to specific
restaurants, the __ReviewsContainer__ should be nested within the __Restaurant__
component. Users should also be able to delete a specific review.

**Note**: When building your input forms, only use basic `input` elements for
this lab's tests.

Since you'll need to be able to associate reviews to restaurants, _and_ delete
specific reviews, reviews stored in Redux should have a `text` key for the
review content, a `restaurantId` key to associate and display the review with a
specific restaurant and an `id` key unique to the review itself.


## Conclusion

Once all tests are passing, you'll be able to create and delete restaurants
_and_ their specific reviews. Take note of the structure of this app -
containers can end up _anywhere_ in an app, even nested way down the component
tree. This set up can feel a bit counterintuitive initially since we could have
a presentational component that has a container component as a child, but the benefit
is that _none_ of the non-container components have any code related to Redux!
They're just firing props!

**Bonus**: So, we're now able to Create, Read and Delete in Redux. You have
learned all you need to know to complete what is required to _Update_ an item.
Think about how this would be done. You would want to probably include an
additional button with each restaurant and review that, when clicked, will
open an input where a user could modify the contents of a specific item. When
sent to your reducer, instead of _filtering_ you might consider _mapping_ &mdash; i.e.
an action where all reviews are returned, but if a review's id matches, the
_newly_ submitted content is returned instead.
