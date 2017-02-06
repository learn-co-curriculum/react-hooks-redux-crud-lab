import { expect } from 'chai';
import React from 'react'
import { shallow, mount } from 'enzyme'
import RestaurantInput from '../src/components/restaurants/RestaurantInput'
import sinon from 'sinon'
import { renderer } from '../src/index'
import createStore from '../src/createStore'
import manageRestaurant, { cuidFn } from '../src/reducers/manageRestaurant'
import { App } from '../src/App'
import Restaurants from '../src/components/restaurants/Restaurants'
import Restaurant from '../src/components/restaurants/Restaurant'


describe('RestaurantInput', () => {
  it('has an text input field', () => {
    const wrapper = shallow(<RestaurantInput />)
    expect(wrapper.find('input').first().type()).to.equal('input');
  });

  it('has an initial state with text key set to empty string', () => {
    const wrapper = shallow(<RestaurantInput />)
    expect(wrapper.state('text')).to.equal('')
  });

  it('has changes the state on a keydown', () => {
    const wrapper = shallow(<RestaurantInput />)
    expect(wrapper.state('text')).to.equal('')
    let input = wrapper.find('input').first()
    input.simulate('change', { target: { value: 'Hello' } })
    expect(wrapper.state('text')).to.equal('Hello')
  })

  it('dispatches an action on submitting the form', () => {
    const store = createStore(manageRestaurant)
    sinon.stub(store, "dispatch");
    const wrapper = shallow(<RestaurantInput store={store} />)
    let input = wrapper.find('input').first()
    let form = wrapper.find('form')
    input.simulate('change', { target: { value: 'Hello' } })
    form.simulate('submit',  { preventDefault() {} })
    store.dispatch.restore();
    // add in an expect
  });

  it('updates the state of the store after submitting the form', () => {
    const store = createStore(manageRestaurant)
    const wrapper = shallow(<RestaurantInput store={store}/>)
    sinon.stub(renderer, "render");
    let form = wrapper.find('form')
    let input = wrapper.find('input').first()
    input.simulate('change', { target: { value: 'Hello' } })
    form.simulate('submit',  { preventDefault() {} })
    expect(store.getState().restaurants[0].text).to.equal('Hello')
  });

});

describe('Restaurants Component', () => {
  it('displays a list of restaurant components', () => {
    const store = createStore(manageRestaurant)
    sinon.stub(store, 'getState').returns({restaurants: [{id: 1, text: 'hello'},
      {id: 2, text: 'goodbye'}, {id: 3, text: 'ciao'}
      ]});
    const wrapper = shallow(<Restaurants store={store}/>)
    expect(wrapper.find(Restaurant)).to.have.length(3);
  });
});

describe('Restaurant Component', () => {
  it('displays the appropriate text', () => {
    const wrapper = shallow(<Restaurant text='hello'/>)
    expect(wrapper.text()).to.contain('hello');
  });

  it('renders an li', () => {
    const wrapper = shallow(<Restaurant text='hello'/>)
    expect(wrapper.find('li')).to.have.length(1)
  });
});

describe('redux', () => {
  it('has an unique id property that for each element', () => {
    const store = createStore(manageRestaurant)
    const wrapper = shallow(<RestaurantInput store={store}/>)
    // sinon.stub(renderer, "render");
    let form = wrapper.find('form')
    let input = wrapper.find('input').first()
    input.simulate('change', { target: { value: 'Hello' } })
    form.simulate('submit',  { preventDefault() {} })


    input.simulate('change', { target: { value: 'ciao' } })
    form.simulate('submit',  { preventDefault() {} })

    let ids = store.getState().restaurants.map(function(restaurant){
      return restaurant.id
    })
    expect(store.getState().restaurants[0].text).to.equal('Hello')
    expect(store.getState().restaurants[1].text).to.equal('ciao')
    // ensure that each id is unique
    expect(new Set(ids).size === ids.length).to.equal(true)
  });
})

describe('restaurant Component with redux', () => {
  it('has the id as a property of the component', () => {
    const store = createStore(manageRestaurant)
    sinon.stub(store, 'getState').returns({restaurants: [{id: 1, text: 'hello'},
      {id: 2, text: 'goodbye'}, {id: 3, text: 'ciao'}
      ]});
    const wrapper = shallow(<Restaurants store={store}/>)
    expect(wrapper.find({id: 1})).to.have.length(1);
  })

  it('has a button that dispatches an DELETE_RESTAURANT action when clicked', ()=> {
    const store = createStore(manageRestaurant)
    const wrapper = shallow(<Restaurant store={store} id={1} text={'hello'}/>)
    let deleteButton = wrapper.find('button').first()
    let stub = sinon.stub(store, "dispatch");
    deleteButton.simulate('click',  { preventDefault() {} })
    expect(stub.calledWith(sinon.match({type: 'DELETE_RESTAURANT'}))).to.equal(true)
  })

  it('has a button that dispatches an DELETE_RESTAURANT action with the proper id when clicked', ()=> {
    const store = createStore(manageRestaurant)
    const wrapper = shallow(<Restaurant store={store} id={1} text={'hello'}/>)
    let deleteButton = wrapper.find('button').first()
    let stub = sinon.stub(store, "dispatch");
    deleteButton.simulate('click',  { preventDefault() {} })
    expect(stub.calledWith(sinon.match({type: 'DELETE_RESTAURANT', id: 1}))).to.equal(true)
  })

  it('updates the state of the store to remove the component', () => {
    const store = createStore(manageRestaurant)
    const wrapper = mount(<RestaurantInput store={store}/>)
    let form = wrapper.find('form')
    let input = wrapper.find('input').first()
    input.simulate('change', { target: { value: 'Hello' } })
    form.simulate('submit',  { preventDefault() {} })
    input.simulate('change', { target: { value: 'ciao' } })
    form.simulate('submit',  { preventDefault() {} })
    let secondRestaurant = store.getState().restaurants[1]
    const RestaurantComponent = shallow(<Restaurant store={store} id={secondRestaurant.id} text={secondRestaurant.text}/>)
    let deleteButton = RestaurantComponent.find('button').first()
    deleteButton.simulate('click')
    expect(store.getState().restaurants.length).to.equal(1)
    expect(store.getState().restaurants[0].text).to.equal('Hello')
  });
})
