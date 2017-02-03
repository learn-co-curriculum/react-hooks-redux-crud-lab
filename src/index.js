import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import createStore from './createStore'
import manageRestaurant from './reducers/manageRestaurant'
const store = createStore(manageRestaurant)
export const renderer = {render: render}


function render(){

  ReactDOM.render(
    <App store={store} />,
    document.getElementById('root')
  );
}



store.dispatch({type: 'buddy'})
