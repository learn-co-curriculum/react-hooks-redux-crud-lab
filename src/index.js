import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import createStore from './createStore';
import manageRestaurant from './reducers/manageRestaurant';

const store = createStore(manageRestaurant);

function render() {
  ReactDOM.render(
    <App store={store} />,
    document.getElementById('root')
  );
};

export const renderer = { render: render };

store.dispatch({ type: '@@init' });
