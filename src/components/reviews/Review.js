import React, { Component } from 'react';

class Review extends Component {

  handleOnClick() {
    this.props.store.dispatch({
      type: 'DELETE_REVIEW',
      id: this.props.review.id
    });
  }

  render() {
    return (
      <div>
        <li>
          {this.props.review.text}
        </li>
        <button onClick={() => this.handleOnClick()}> X </button>
      </div>
    );
  }

};

export default Review;
