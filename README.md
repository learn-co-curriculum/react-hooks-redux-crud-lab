# Create and Delete Lab

## Objectives

* Implement a Yelp-like application where users can create and delete both
restaurants and reviews of each restaurant.

## Introduction

In this lab, we will practice creating and removing various items using Redux. 
We are working with two different resources, restaurants and reviews, with each 
restaurant having many reviews and reviews belonging to a restaurant. You will 
implement container components to connect each resource to your Redux store.


## Instructions

#### Restaurants ####

Start off by working on the components for displaying restaurants. First, 
you'll need a __RestaurantInput__ component that allows a user to create new 
restaurants. Your form should have two inputs: a text input to enter the name
of the restaraunt, and an input with type equal `submit`. 

Next, you will build out the __RestaurantsContainer__ component that will 
connect to Redux and pass the appropriate props down to its children. You will 
then want to create a __Restaurants__ component that renders a list of 
restaurants, and a __Restaurant__ component that is responsible for each 
individual restaurant. 

Users should also be able to delete restaurants, so you will need to wire up 
the button rendered in the Restaurant component and give each restaurant an ID. 
To do that, you may want to use the `cuid` library that we have already imported 
into the reducer file for you. Like the `uuid` library we have used in previous 
labs, `cuid` will generate a unique id for you:

  ```javascript
  import cuid from 'cuid';

  console.log(cuid());
  // ch72gsb320000udocl363eofy
  ```

Restaurants stored in Redux should have `text` and `id` keys.

#### Reviews ####

Next you will work on the reviews resource. You will make a __ReviewInput__ 
component that will enable users to create a review that is associated with 
a specific restaurant. As with the __RestaurantInput__ component, the form 
should have a text input for the content of the review along with an input of 
type `submit`.

Next you will build out the __ReviewsContainer__, __Reviews__, and __Review__ 
components. The __ReviewsContainer__ should be nested within the __Restaurant__ 
component so reviews are displayed underneath the restaurant they belong to. 
Users should also be able to delete a specific review.

**Note**: Take note of the structure of this app: containers can end up _anywhere_ 
in an app, even nested way down the component tree. This setup can feel a bit 
counterintuitive initially since we could have a presentational component that 
has a container component as a child, but the benefit is that _none_ of the 
non-container components have any code related to Redux! They're just firing 
props!

Since you'll need to be able to associate reviews to restaurants, _and_ delete
specific reviews, reviews stored in Redux should have a `text` key for the
review content, a `restaurantId` key to associate and display the review with a
specific restaurant and an `id` key unique to the review itself. 

**Note**: Although each review belongs to a specific restaurant, that 
relationship should be implemented using the `restaurantId` key, *not* in the 
structure of the store's state. In order to get the tests passing, the state will 
need to be structured as follows:

  ```javascript
    {
      restaurants: [],
      reviews: []
    }
  ```

**Hint**: To simplify coding of the `manageRestaurant` reducer, you may want to
use Redux's `combineReducers` function that was introduced in an earlier lesson. 

## Conclusion

Once all tests are passing, you'll be able to create and delete restaurants _and_ 
their specific reviews. 

**Bonus**: Implement __edit__ functionality for restaurants and reviews. You will 
probably want to include an additional button with each restaurant and review 
that, when clicked, will open an input where a user could modify the contents of 
a specific item. You will then need to dispatch an __update__ action to the 
reducer to update the store.

