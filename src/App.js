import React, { Component } from 'react';
import RestaurantsContainer from './containers/RestaurantsContainer';

export class App extends Component {
  render() {
    return (
      <div className="App">
        <RestaurantsContainer />
      </div>
    );
  }
};
