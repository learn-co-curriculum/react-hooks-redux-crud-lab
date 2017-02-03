import React, { Component } from 'react'

class RestaurantInput extends Component {
  constructor(props){
    super(props)
    this.state = {text: ''}
  }
  handleOnChange(event){
    this.setState({text: event.target.value})
  }
  handleOnSubmit(event){
    event.preventDefault()
    this.props.store.dispatch({type: 'ADD_RESTAURANT', payload: this.state.text})
    this.setState({text: ''})
  }
  render(){
    return (<div>
      <form onSubmit={this.handleOnSubmit.bind(this)}>
        <input type="text" value={this.state.text} onChange={this.handleOnChange.bind(this)}/>
        <input type="submit" />
      </form>
    </div>
    )
  }
}

export default RestaurantInput;
