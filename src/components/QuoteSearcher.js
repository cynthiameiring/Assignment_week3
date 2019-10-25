import React, { Component } from "react";
import Quote from "./Quote";
//import PropTypes from "prop-types";
//import "./Player.css";

export default class QuoteSearcher extends Component {
  state = {
    quotes: [],
    fetching: true,
    error: false,
    totalLikes: 0,
    totalDislikes: 0
  };
  componentDidMount() {
    fetch("https://quote-garden.herokuapp.com/quotes/search/tree")
      .then(res => res.json())
      .then(data => {
        // add the style property to the data
        const quotesWithStyle = data.results.map(quote => {
          return { ...quote, style: "black-text" };
        });
        this.setState({ quotes: quotesWithStyle });
        //console.log("this is my data:", this.state.quotes);
      })
      .then(() => this.setState({ fetching: false }))
      .catch(() => this.setState({ error: true }));
  }

  render() {
    if (this.state.fetching) {
      return <div>{"Still loading.."}</div>;
    } else if (this.state.error) {
      return <div>{"Error with fetching data"}</div>;
    }
    return (
      <div className="quote-container">
        <h1>Quotes</h1>
        {this.state.quotes.map(this.renderQuote)}
      </div>
    );
  }

  likeQuote = quoteId => {
    //console.log("like button works:", quoteId);
    const updatedStyle = this.state.quotes.map(quote => {
      if (quote._id === quoteId) {
        return { ...quote, style: "green-text" };
      }
      return quote;
    });
    this.setState({ quotes: updatedStyle });
  };

  dislikeQuote = quoteId => {
    const updatedStyle = this.state.quotes.map(quote => {
      if (quote._id === quoteId) {
        return { ...quote, style: "red-text" };
      }
      return quote;
    });
    this.setState({ quotes: updatedStyle });
  };

  renderQuote = quote => {
    return (
      <Quote
        text={quote.quoteText}
        author={quote.quoteAuthor}
        id={quote._id}
        key={quote._id}
        like={this.likeQuote}
        dislike={this.dislikeQuote}
        style={quote.style}
      />
    );
  };
}
