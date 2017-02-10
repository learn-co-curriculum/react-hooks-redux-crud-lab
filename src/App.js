import React, { Component } from 'react';
import RestaurantInput from './components/restaurants/RestaurantInput';
import Restaurants from './components/restaurants/Restaurants';

export class App extends Component {
  render() {
    return (
      <div className="App">
        <RestaurantInput store={this.props.store} />
        <Restaurants store={this.props.store}/>
      </div>
    );
  }
};
