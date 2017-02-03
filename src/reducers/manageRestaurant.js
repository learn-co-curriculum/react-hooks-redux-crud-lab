import cuid from 'cuid';
export const cuidFn = cuid
export default function manageRestaurants(state = {restaurants: [], reviews: []}, action){
  switch (action.type) {
    case 'ADD_RESTAURANT':
      let restaurant = Object.assign({}, {text: action.payload}, {id: cuidFn()})
      return Object.assign(state, {}, {restaurants: state.restaurants.concat(restaurant)})
    case 'DELETE_RESTAURANT':
      let restaurants = state.restaurants.filter(function(restaurant){
        return restaurant.id !== action.id
      })
      return Object.assign({}, state, {restaurants: restaurants})
      case 'ADD_REVIEW':
        let review = Object.assign({}, {text: action.payload.text, restaurantId: action.payload.restaurantId}, {id: cuidFn()})
        return Object.assign({}, state, {reviews: state.reviews.concat(review)})
      case 'DELETE_REVIEW':
        let reviews = state.reviews.filter(function(review){
          return review.id !== action.id
        })
      return Object.assign({}, state, {reviews: reviews})
    default:
      return state;
  }
}
