import { expect } from 'chai';
import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import manageRestaurant, { cuidFn } from '../src/reducers/manageRestaurant';
import App from '../src/App';
import Restaurant from '../src/components/restaurants/Restaurant';
import ReviewInput from '../src/components/reviews/ReviewInput';
import Reviews from '../src/components/reviews/Reviews';
import ReviewsContainer from '../src/containers/ReviewsContainer';
import Review from '../src/components/reviews/Review';
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('ReviewInput Component', () => {
  it('displays the ReviewInput component as a child of each Restaurant Component', () => {
    const store = createStore(manageRestaurant);
    store.dispatch({type: 'ADD_RESTAURANT', text: 'Bogota'})
    const wrapper = mount(<Provider store={store}><App /></Provider>);
    expect(wrapper.find(ReviewInput)).to.have.length(1);
  });

  it('has two text input fields, one for review input, and another for submitting', () => {
    const wrapper = shallow(<ReviewInput />);
    expect(wrapper.find('input').first().type()).to.equal('input');
    expect(wrapper.find('input').last().type()).to.equal('input');
    expect(wrapper.find('input').length).to.eql(2)
  });

  it('has an initial state with text key set to empty string', () => {
    const wrapper = shallow(<ReviewInput />);
    expect(wrapper.state('text')).to.equal('');
  });

  it('changes the component state with an onChange event', () => {
    const wrapper = shallow(<ReviewInput />);
    expect(wrapper.state('text')).to.equal('');
    let input = wrapper.find('input').first();
    input.simulate('change', { target: { value: 'Hello', name: 'text', id: 'text' } });
    expect(wrapper.state('text')).to.equal('Hello');
  })

  it('adds a review to the store when the form is submitted', () => {
    const store = createStore(manageRestaurant);
    store.dispatch({type: 'ADD_RESTAURANT', text: 'Rice Thai Kitchen'})

    const wrapper = mount(<Provider store={store}><App /></Provider>);

    let input = wrapper.find(Restaurant).find('input').first()
    let form = wrapper.find(Restaurant).find('form');

    input.simulate('change', { target: { value: 'Better Ingredients', name: 'text', id: 'text' } });
    form.simulate('submit',  { preventDefault() {} });

    wrapper.update()

    expect(wrapper.find(Review).html()).to.include('Better Ingredients')
  });

  it('updates the state of the store after submitting the form', () => {
    const store = createStore(manageRestaurant);
    store.dispatch({type: 'ADD_RESTAURANT', text: 'Blue Ribbon'})

    const wrapper = mount(<Provider store={store}><App /></Provider>);

    let input = wrapper.find(Restaurant).find('input').first()
    let form = wrapper.find(Restaurant).find('form');

    input.simulate('change', { target: { value: 'Better Pizza', name: 'text', id: 'text' } });
    form.simulate('submit',  { preventDefault() {} });

    expect(store.getState().reviews.length).to.equal(1);
  });

  it('sets a property of restaurantId on the review input component from the parent components id', () => {
    const store = createStore(manageRestaurant);
    store.dispatch({type: 'ADD_RESTAURANT', text: 'The Helm'})

    const wrapper = mount(<Provider store={store}><App /></Provider>);

    let review = wrapper.find(ReviewInput);

    expect(review.props().restaurantId).to.equal(store.getState().restaurants[0].id);
  });

  it('associates the review with the restaurant with a foreign key on the review', () => {
    const store = createStore(manageRestaurant);
    store.dispatch({type: 'ADD_RESTAURANT', text: 'Burger Loft'})

    const wrapper = mount(<Provider store={store}><App /></Provider>);

    let reviewForm = wrapper.find(Restaurant).find('form');
    let textField =  wrapper.find(Restaurant).find('input').first();

    textField.simulate('change', { target: { value: 'Hello', name: 'text', id: 'text' } });
    reviewForm.simulate('submit',  { preventDefault() {} });

    expect(store.getState().reviews[0].restaurantId).to.equal(store.getState().restaurants[0].id);
  });
});

// move on to testing the reviews component
describe('Reviews Component', () => {
  it('is a child of the ReviewsContainer component', () => {
    const store = createStore(manageRestaurant);
    store.dispatch({type: 'ADD_RESTAURANT', text: 'Home'})

    const wrapper = mount(<Provider store={store}><App /></Provider>);

    expect(wrapper.find(ReviewsContainer).html()).to.include(wrapper.find(Reviews).html())
  });

  it('displays a review for when it is associated with the restaurant', () => {
    const store = createStore(manageRestaurant);
    store.dispatch({type: 'ADD_RESTAURANT', text: 'LoKi'})
    let restaurantId = store.getState().restaurants[0].id
    store.dispatch({ type: 'ADD_REVIEW', review: { text: "Was great", restaurantId } })
    store.dispatch({ type: 'ADD_REVIEW', review: { text: "Was not great", restaurantId } })
    const wrapper = mount(<Provider store={store}><App /></Provider>);


    expect(wrapper.find(Review)).to.have.length(2);
  });

  it('does not display any review unassociated with the restaurant', () => {
    const store = createStore(manageRestaurant);
    store.dispatch({type: 'ADD_RESTAURANT', text: 'Tarry Lodge'})
    let restaurantId = store.getState().restaurants[0].id
    store.dispatch({ type: 'ADD_REVIEW', review: { text: "it was good", restaurantId } })
    store.dispatch({ type: 'ADD_REVIEW', review: { text: "it was great", restaurantId } })
    store.dispatch({ type: 'ADD_REVIEW', review: { text: "it was bad", restaurantId: "test"} })
    const wrapper = mount(<Provider store={store}><App /></Provider>);
    expect(wrapper.find(Review)).to.have.length(2);
    expect(wrapper.text()).to.contain('it was good');
    expect(wrapper.text()).to.not.contain('bad');
  });

  it('has an unique id property that for each element', () => {
    const store = createStore(manageRestaurant);
    store.dispatch({type: 'ADD_RESTAURANT', text: 'The Kings Head'})
    const wrapper = mount(<Provider store={store}><App /></Provider>);
    let reviewForm = wrapper.find(Restaurant).find('form');
    let textField =  wrapper.find(Restaurant).find('input').first();

    textField.simulate('change', { target: { value: 'Walked for miles at night for this place', name: 'text', id: 'text' } });
    reviewForm.simulate('submit',  { preventDefault() {} });

    textField.simulate('change', { target: { value: 'Totally worth it', name: 'text', id: 'text' } });
    reviewForm.simulate('submit',  { preventDefault() {} });

    let ids = store.getState().restaurants.map(restaurant => restaurant.id);

    expect(new Set(ids).size === ids.length).to.equal(true);
  });

  it('has a button that dispatches a DELETE_REVIEW action when clicked', ()=> {
    const store = createStore(manageRestaurant);
    store.dispatch({type: 'ADD_RESTAURANT', text: 'The Kings Head'})
    let restaurantId = store.getState().restaurants[0].id
    store.dispatch({ type: 'ADD_REVIEW', review: { text: "became friends with bartender", restaurantId } })

    const wrapper = mount(<Provider store={store}><App /></Provider>);

    let deleteButton = wrapper.find('button').last();

    deleteButton.simulate('click',  { preventDefault() {} });
    wrapper.update()

    expect(wrapper.find(Review).length).to.equal(0)
  });

  it('updates the state of the store to remove the component', () => {
    const store = createStore(manageRestaurant);
    store.dispatch({type: 'ADD_RESTAURANT', text: 'The Kings Arms'})
    let restaurantId = store.getState().restaurants[0].id

    const wrapper = mount(<Provider store={store}><App /></Provider>);

    let form = wrapper.find(Restaurant).find('form');
    let input = wrapper.find(Restaurant).find('input').first();

    input.simulate('change', { target: { value: 'Pricey', name: 'text', id: 'text' } });
    form.simulate('submit',  { preventDefault() {} });
    input.simulate('change', { target: { value: 'I would rather walk 4 miles at night to the next town', name: 'text', id: 'text' } });
    form.simulate('submit',  { preventDefault() {} });

    let deleteButton = wrapper.find('button').last();

    deleteButton.simulate('click',  { preventDefault() {} });


    let numberReviews = store.getState().reviews.length;

    let lastReview = store.getState().reviews[numberReviews -1];

    expect(lastReview.text).to.equal('Pricey');
  });
});
