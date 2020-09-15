import { expect } from 'chai';
import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import RestaurantInput from '../src/components/restaurants/RestaurantInput'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import manageRestaurant, { cuidFn } from '../src/reducers/manageRestaurant'
import App from '../src/App'
import Restaurant from '../src/components/restaurants/Restaurant'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('RestaurantInput', () => {
  it('has an text input field', () => {
    const wrapper = shallow(<RestaurantInput />);
    expect(wrapper.find('input').first().type()).to.equal('input');
  });

  it('has an initial state with text key set to empty string', () => {
    const wrapper = shallow(<RestaurantInput />);
    expect(wrapper.state('text')).to.equal('');
  });

  it('changes the component state with an onChange event', () => {
    const wrapper = shallow(<RestaurantInput />);
    expect(wrapper.state('text')).to.equal('');
    let input = wrapper.find('input').first();
    input.simulate('change', { target: { value: 'Hello', name: 'text', id: 'text' } });
    expect(wrapper.state('text')).to.equal('Hello');
  });

  it('updates the state of the store after submitting the form', () => {
    const store = createStore(manageRestaurant);
    const wrapper = mount(<Provider store={store}><App /></Provider>);

    let form = wrapper.find('form');
    let input = wrapper.find('input').first();

    // console.log(store.getState());
    input.simulate('change', { target: { value: 'Hello', name: 'text', id: 'text' }});
    form.simulate('submit',  { preventDefault() {} })
    // console.log(store.getState());
    expect(store.getState().restaurants[0].text).to.equal('Hello')
  });

});

describe('Restaurants Component', () => {
  it('displays a list of restaurant components', () => {

    const store = createStore(manageRestaurant)
    store.dispatch({type: 'ADD_RESTAURANT', text: "Muzarella"})
    store.dispatch({type: 'ADD_RESTAURANT', text: "Artichoke"})
    store.dispatch({type: 'ADD_RESTAURANT', text: "Two Brothers"})
    const wrapper = mount(<Provider store={store}><App /></Provider>)
    expect(wrapper.find(Restaurant)).to.have.length(3);
  });
});

describe('Restaurant Component', () => {
  it('displays the appropriate text', () => {
    const restaurant = { text: 'hello', id: 3 }
    const wrapper = shallow(<Restaurant restaurant={restaurant} />)
    expect(wrapper.text()).to.contain('hello');
  });

  it('renders an li', () => {
    const restaurant = { text: 'hello', id: 3 }
    const wrapper = shallow(<Restaurant restaurant={restaurant} />)
    expect(wrapper.find('li')).to.have.length(1)
  });
});

describe('RestaurantInput Component with Redux', () => {
  it('has an unique id property for each element', () => {
    const store = createStore(manageRestaurant)
    const wrapper = mount(<Provider store={store}><App /></Provider>)
    let form = wrapper.find('form')
    let input = wrapper.find('input').first()

    input.simulate('change', { target: { value: 'Sbarro', name: 'text', id: 'text' }});
    form.simulate('submit',  { preventDefault() {} })
    input.simulate('change', { target: { value: 'La Villa', name: 'text', id: 'text' }});
    form.simulate('submit',  { preventDefault() {} })

    let ids = store.getState().restaurants.map((restaurant) => {
      return restaurant.id
    })

    expect(store.getState().restaurants[0].text).to.equal('Sbarro')
    expect(store.getState().restaurants[1].text).to.equal('La Villa')
    expect(new Set(ids).size === ids.length).to.equal(true)
  });
});

describe('Restaurant Component with Redux', () => {
  it('has the restaurant as a prop', () => {
    const store = createStore(manageRestaurant);

    const wrapper = mount(<Provider store={store}><App /></Provider>)

    let form = wrapper.find('form')
    let input = wrapper.find('input').first()

    input.simulate('change', { target: { value: 'Blooming Hill Farm', name: 'text', id: 'text' }});
    form.simulate('submit',  { preventDefault() {} })

    wrapper.update()

    expect(wrapper.find(Restaurant).props().restaurant).to.exist


  });


  it('has a button that dispatches a DELETE_RESTAURANT action with the proper id when clicked', ()=> {
    const store = createStore(manageRestaurant);
    store.dispatch({type: 'ADD_RESTAURANT', text: 'Bagel World'})

    const wrapper = mount(<Provider store={store}><App /></Provider>)

    let deleteButton = wrapper.find('button').first();

    deleteButton.simulate('click',  { preventDefault() {} });

    expect(store.getState().restaurants.length).to.equal(0);


  });

  it('updates the state of the store to remove the component', () => {
    const store = createStore(manageRestaurant);
    const wrapper = mount(<Provider store={store}><App /></Provider>)

    let form = wrapper.find('form');
    let input = wrapper.find('input').first();

    input.simulate('change', { target: { value: 'Bagel Pub', name: 'text', id: 'text' }});
    form.simulate('submit',  { preventDefault() {} });

    input.simulate('change', { target: { value: 'Chip Shop', name: 'text', id: 'text' }});
    form.simulate('submit',  { preventDefault() {} });

    let restaurant = store.getState().restaurants[1];

    wrapper.update()

    let deleteButton = wrapper.find('button').first();

    deleteButton.simulate('click');

    expect(store.getState().restaurants.length).to.equal(1);
    expect(store.getState().restaurants[0].text).to.equal('Chip Shop');

    input.simulate('change', { target: { value: 'Song', name: 'text', id: 'text' }});
    form.simulate('submit',  { preventDefault() {} });

    deleteButton = wrapper.find('button').last();

    deleteButton.simulate('click');

    expect(store.getState().restaurants.length).to.equal(1);
    expect(store.getState().restaurants[0].text).to.equal('Chip Shop');
  });
});
