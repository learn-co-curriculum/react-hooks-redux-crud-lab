import React, { Component } from 'react'
import Reviews from './Reviews'

class ReviewInput extends Component {
  constructor(props){
    super(props)
    this.state = {text: ''}
  }
  handleOnChange(event){
    this.setState({text: event.target.value})
  }
  handleOnSubmit(event){
    event.preventDefault()
    this.props.store.dispatch({type: 'ADD_REVIEW', payload: {text: this.state.text, restaurantId: this.props.restaurantId}})
    this.setState({text: ''})
  }
  render(){
    return (<div>
      <form onSubmit={this.handleOnSubmit.bind(this)}>
        <label> Add Review </label>
        <input type="text" value={this.state.text} onChange={this.handleOnChange.bind(this)}/>
        <input type="submit" />
        <Reviews store={this.props.store} restaurantId={this.props.restaurantId} />
      </form>
    </div>
    )
  }
}

export default ReviewInput;
