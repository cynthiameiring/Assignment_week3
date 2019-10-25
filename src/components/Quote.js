import React, { Component } from "react";
import "./Quote.css";

export default class Quote extends Component {
  render() {
    return (
      <div className="single-quote">
        <p>{this.props.text}</p>
        <p>By: {this.props.author}</p>
      </div>
    );
  }
}
