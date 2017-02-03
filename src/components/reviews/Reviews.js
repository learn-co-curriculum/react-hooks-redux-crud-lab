import React, { Component } from 'react'
import Review from './Review'

class Reviews extends Component {
  constructor(props){
    super(props)
    this.state = {text: ''}
  }
  render(){
    let associatedReviews = this.props.store.getState().reviews.filter((review) => {
      return review.restaurantId === this.props.restaurantId;
    })
    let reviews = associatedReviews.map((review) => {
      return <Review store={this.props.store} id={review.id} text={review.text}/>
    })
    return(
      <ul>
        {reviews}
      </ul>
    )
  }
}

export default Reviews;
