import React, { Component } from 'react'
import Restaurant from './Restaurant'

class Restaurants extends Component {
  constructor(props){
    super(props)
    this.state = {text: ''}
  }
  render(){
    let storeState = this.props.store.getState()
    let restaurants = storeState.restaurants.map((restaurant) => {
      return <Restaurant id={restaurant.id} store={this.props.store} text={restaurant.text}/>
    })
    return(
      <ul>
        {restaurants}
      </ul>
    )
  }
}

export default Restaurants;
