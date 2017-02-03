import React, { Component } from 'react'

class Review extends Component {
  handleOnClick(){
    this.props.store.dispatch({type: 'DELETE_REVIEW', id: this.props.id})
  }
  render(){
    return(
      <li>
        {this.props.text}
        <button onClick={this.handleOnClick.bind(this)}> X </button>
      </li>
    )
  }
}

export default Review
