import React, { Component } from "react";
import "./Quote.css";

export default class Quote extends Component {
  handleLikeButton = () => {
    this.props.like(this.props.id); // callback prop
  };
  handleDislikeButton = () => {
    this.props.dislike(this.props.id); // callback prop
  };

  render() {
    return (
      <div className="single-quote">
        <p className={this.props.style}>{this.props.text}</p>
        <p>
          By: {this.props.author}{" "}
          <button className="like-button" onClick={this.handleLikeButton}>
            Like
          </button>
          <button className="dislike-button" onClick={this.handleDislikeButton}>
            Dislike
          </button>
        </p>
      </div>
    );
  }
}
