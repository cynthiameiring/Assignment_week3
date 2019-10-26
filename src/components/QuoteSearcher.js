import React, { Component } from "react";
import Quote from "./Quote";
//import PropTypes from "prop-types";
//import "./Player.css";

export default class QuoteSearcher extends Component {
  state = {
    quotes: [],
    fetching: false,
    error: false,
    searchterm: ""
  };

  componentDidMount() {
    //this.search(" ");
    console.log("testtest");
  }

  search = placeholder => {
    this.setState({ fetching: true });
    fetch(
      `https://quote-garden.herokuapp.com/quotes/search/${encodeURIComponent(
        placeholder
      )}`
    )
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
    //const value = event.target.name.value;
    //this.setState({ searchterm: "dog" });
    // this.setState({
    //   searchterm: value
    // });
    this.search("tree");
    // console.log("Submitting form...");
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    if (this.state.fetching) {
      return <div>{"Still loading.."}</div>;
    } else if (this.state.error) {
      return <div>{"Error with fetching data"}</div>;
    }
    //console.log("data", this.state.quotes);
    return (
      <div className="quote-container">
        <h1>Quotes</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="searchterm"
            onChange={this.handleChange}
            value={this.state.name}
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
        {this.state.quotes.map(this.renderQuote)}
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
