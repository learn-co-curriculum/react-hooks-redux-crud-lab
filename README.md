# Yelpish Lab

## Objectives

Implement a Yelp-like application with restaurants and reviews.

## Overview

In this lab, we will practice creating and removing various items. We are working with two different resources, with each restaurant having many reviews and reviews belonging to a restaurant.

## Instructions

1. You'll first need to create a __RestaurantInput__ component that allows a user to create new restaurants. You will then need a __Restaurants__ component that displays a list of restaurants, and a __Restaurant__ component which is responsible for each restaurant. Users should also be able to delete restaurants, and to implement that you will need to give each restaurant an id.  

> Note To implement ids, it may be worth integrating another library in the reducer called ccuid. You can see that we already imported it in the reducer file for you.
The library will generate a unique id for you:

  ```javascript
  import cuid from 'cuid';

  console.log(cuid());
  // ch72gsb320000udocl363eofy
  ```

2. You will also need to create a reviews resource. Users should be able to create a review that is specifically associated with the related restaurant, and those reviews should be displayed underneath the related restaurant. Users should also be able to delete a specific review.  
