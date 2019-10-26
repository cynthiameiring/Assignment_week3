import React, { Component } from "react";
import Quote from "./Quote";
//import PropTypes from "prop-types";
//import "./Player.css";

export default class QuoteSearcher extends Component {
  state = {
    quotes: [],
    fetching: false,
    error: false,
    searchterm: "",
    numberOfQoutes: null
  };

  search = mysearchterm => {
    this.setState({ fetching: true });
    fetch(
      `https://quote-garden.herokuapp.com/quotes/search/${encodeURIComponent(
        mysearchterm
      )}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ numberOfQoutes: data.count });
        console.log(this.state.numberOfQoutes);
        // add the style property to the data
        const quotesWithStyle = data.results.map(quote => {
          return { ...quote, style: "black-text" };
        });
        this.setState({ quotes: quotesWithStyle, fetching: false });
        //console.log("this is my data:", this.state.quotes);
      })
      .catch(() => this.setState({ error: true }));
  };

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

  handleSubmit = event => {
    event.preventDefault();
    this.search(this.state.searchterm);
  };

  handleChange = event => {
    this.setState({
      searchterm: event.target.value
    });
  };

  render() {
    if (this.state.fetching) {
      return <div>{"Still loading.."}</div>;
    } else if (this.state.error) {
      return <div>{"Error with fetching data"}</div>;
    }
    return (
      <div className="quote-container">
        <h1>Quotes</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.searchterm}
          />
          <input type="submit" value="Search" />
        </form>
        <h2>
          Liked:{" "}
          {
            this.state.quotes.filter(quote => quote.style === "green-text")
              .length
          }{" "}
          / Disliked:{" "}
          {this.state.quotes.filter(quote => quote.style === "red-text").length}
        </h2>
        {this.state.numberOfQoutes === 0 ? (
          <p>There are no quotes, please try another search term</p>
        ) : (
          this.state.quotes.map(this.renderQuote)
        )}
      </div>
    );
  }

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
