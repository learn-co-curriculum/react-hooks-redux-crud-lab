import { expect } from 'chai';
import React from 'react';
import { shallow, mount } from 'enzyme';
import RestaurantInput from '../src/components/restaurants/RestaurantInput';
import sinon from 'sinon';
import { renderer } from '../src/index';
import createStore from '../src/createStore';
import manageRestaurant, { cuidFn } from '../src/reducers/manageRestaurant';
import { App } from '../src/App';
import Restaurants from '../src/components/restaurants/Restaurants';
import Restaurant from '../src/components/restaurants/Restaurant';
import ReviewInput from '../src/components/reviews/ReviewInput';
import Reviews from '../src/components/reviews/Reviews';
import Review from '../src/components/reviews/Review';

describe('ReviewInput Component', () => {
  it('displays the ReviewInput component as a child of each Restaurant Component', () => {
    const store = createStore(manageRestaurant);
    const restaurant = { id: 1, text: 'hello' };
    const wrapper = shallow(<Restaurant store={store} restaurant={restaurant} />);
    expect(wrapper.find(ReviewInput)).to.have.length(1);
  });

  it('has a text input field', () => {
    const wrapper = shallow(<ReviewInput />);
    expect(wrapper.find('input').first().type()).to.equal('input');
  });

  it('has an initial state with text key set to empty string', () => {
    const wrapper = shallow(<ReviewInput />);
    expect(wrapper.state('text')).to.equal('');
  });

  it('has changes the state on a keydown', () => {
    const wrapper = shallow(<ReviewInput />);
    expect(wrapper.state('text')).to.equal('');
    let input = wrapper.find('input').first();
    input.simulate('change', { target: { value: 'Hello' } });
    expect(wrapper.state('text')).to.equal('Hello');
  })

  it('dispatches an action on submitting the form', () => {
    const store = createStore(manageRestaurant);
    sinon.stub(store, "dispatch");
    const wrapper = shallow(<ReviewInput store={store} />);
    let input = wrapper.find('input').first();
    let form = wrapper.find('form');
    input.simulate('change', { target: { value: 'Hello' } });
    form.simulate('submit',  { preventDefault() {} });
    store.dispatch.restore()
  });

  it('updates the state of the store after submitting the form', () => {
    const store = createStore(manageRestaurant);
    const wrapper = shallow(<ReviewInput store={store} />);
    let form = wrapper.find('form');
    let input = wrapper.find('input').first();
    input.simulate('change', { target: { value: 'Hello' } });
    form.simulate('submit',  { preventDefault() {} });
    expect(store.getState().reviews[0].text).to.equal('Hello');
  });

  it('sets a property of restaurantId on the review component from the parent components id', () => {
    const store = createStore(manageRestaurant);
    const restaurant = { id: 1, text: 'hello' };
    const wrapper = shallow(<Restaurant store={store} restaurant={restaurant} />)
    let review = wrapper.find(ReviewInput);
    expect(review.props().restaurantId).to.equal(restaurant.id);
  });

  it('associates the review with the restaurant with a foreign key on the review', () => {
    const store = createStore(manageRestaurant);
    let restaurantId = 34039;
    const wrapper = shallow(<ReviewInput store={store} restaurantId={restaurantId}/>)
    let reviewForm = wrapper.find('form');
    let textField =  wrapper.find('input').first();
    textField.simulate('change', { target: { value: 'Hello' } });
    reviewForm.simulate('submit',  { preventDefault() {} });
    expect(store.getState().reviews[0].restaurantId).to.equal(restaurantId);
  });
});

// move on to testing the reviews component
describe('Reviews Component', () => {
  it('is a child of each review input component', () => {
    const store = createStore(manageRestaurant);
    const wrapper = shallow(<ReviewInput store={store} />);
    expect(wrapper.find(Reviews)).to.have.length(1);
  });

  it('displays a review for when it is associated with the restaurant', () => {
    const store = createStore(manageRestaurant);
    sinon.stub(store, 'getState').returns({
      restaurants: [
        { id: 1, text: 'hello' },
        { id: 2, text: 'goodbye' },
        { id: 3, text: 'ciao' }
      ], 
      reviews: [
        { id: 1, restaurantId: 1, text: 'it was good' },
        { id: 2, restaurantId: 1, text: 'it was good' }
      ]
    });
    let restaurantId = 1;
    const wrapper = mount(<Reviews store={store} restaurantId={1} />);

    expect(wrapper.find(Review)).to.have.length(2);
  });

  it('does not display any review unassociated with the restaurant', () => {
    const store = createStore(manageRestaurant);
    sinon.stub(store, 'getState').returns({
      restaurants: [
        { id: 1, text: 'hello' },
        { id: 2, text: 'goodbye' },
        { id: 3, text: 'ciao' }
      ], 
      reviews: [
        { id: 1, restaurantId: 1, text: 'it was good' },
        { id: 2, restaurantId: 1, text: 'it was very good' },
        { id: 2, restaurantId: 2, text: 'it was very bad' }
      ]
    });
    let restaurantId = 1;
    const wrapper = mount(<Reviews store={store} restaurantId={1} />);
    expect(wrapper.find(Review)).to.have.length(2);
    expect(wrapper.text()).to.contain('it was good');
    expect(wrapper.text()).to.not.contain('bad');
  });

  it('has an unique id property that for each element', () => {
    const store = createStore(manageRestaurant);
    let restaurantId = 34039;
    const wrapper = shallow(<ReviewInput store={store} restaurantId={restaurantId} />);
    let reviewForm = wrapper.find('form');
    let textField =  wrapper.find('input').first();
    textField.simulate('change', { target: { value: 'Hello' } });
    reviewForm.simulate('submit',  { preventDefault() {} });
    textField.simulate('change', { target: { value: 'Ciao' } });
    reviewForm.simulate('submit',  { preventDefault() {} });
    let ids = store.getState().restaurants.map(restaurant => restaurant.id);
    expect(new Set(ids).size === ids.length).to.equal(true);
  });

  it('has a button that dispatches a DELETE_RESTAURANT action with the proper id when clicked', ()=> {
    const store = createStore(manageRestaurant);
    const review = { id: 1, text: 'hello' };
    const wrapper = shallow(<Review store={store} review={review} />);
    let deleteButton = wrapper.find('button').first();
    let stub = sinon.stub(store, "dispatch");;
    deleteButton.simulate('click',  { preventDefault() {} });
    expect(stub.calledWith(sinon.match({ type: 'DELETE_REVIEW', id: 1 }))).to.equal(true);
  });

  it('updates the state of the store to remove the component', () => {
    const store = createStore(manageRestaurant);
    store.dispatch({type: '@@INIT'});
    const wrapper = mount(<ReviewInput store={store} />);
    let form = wrapper.find('form');
    let input = wrapper.find('input').first();
    input.simulate('change', { target: { value: 'Hello' } });
    form.simulate('submit',  { preventDefault() {} });
    input.simulate('change', { target: { value: 'ciao' } });
    form.simulate('submit',  { preventDefault() {} });
    
    let review = store.getState().reviews[1];
    const ReviewComponent = shallow(<Review store={store} review={review} />)
    let deleteButton = ReviewComponent.find('button').first();
    deleteButton.simulate('click');
    expect(store.getState().reviews.length).to.equal(1);
    let numberReviews = store.getState().reviews.length;
    let lastReview = store.getState().reviews[numberReviews -1];
    expect(lastReview.text).to.equal('Hello');
  });
});
