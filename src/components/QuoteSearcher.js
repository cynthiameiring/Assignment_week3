import React, { Component } from "react";
import Quote from "./Quote";
//import PropTypes from "prop-types";
//import "./Player.css";

export default class QuoteSearcher extends Component {
  state = {
    quotes: [
      {
        _id: "5d91b45d9980192a317c8acc",
        quoteText:
          "Notice that the stiffest tree is most easily cracked, while the bamboo or willow survives by bending with the wind.",
        quoteAuthor: "Bruce Lee"
      },
      {
        _id: "5d91b45d9980192a317c8abe",
        quoteText:
          "Give me six hours to chop down a tree and I will spend the first four sharpening the axe.",
        quoteAuthor: "Abraham Lincoln"
      },
      {
        _id: "5d91b45d9980192a317c8955",
        quoteText:
          "Good timber does not grow with ease; the stronger the wind, the stronger the trees.",
        quoteAuthor: "J. Willard Marriott"
      }
    ]
  };
  // componentDidMount() {
  //   fetch("https://dog.ceo/api/breeds/list/all")
  //     .then(res => res.json())
  //     .then(data => {
  //       this.setState({ dogBreeds: Object.keys(data.message) });
  //       console.log(this.state.dogBreeds);
  //     })
  //     .then(() => this.setState({ loading: false }))
  //     .catch(() => this.setState({ error: true }));
  // }

  render() {
    // if (this.state.loading) {
    //   return <div>{"still loading"}</div>;
    // } else if (this.state.error) {
    //   return <div>{"error with fetching data"}</div>;
    // }
    return (
      <div className="quote-container">
        <h1>Quotes</h1>
        {this.state.quotes.map(this.renderQuote)}
      </div>
    );
  }

  renderQuote = quote => {
    return (
      <Quote
        text={quote.quoteText}
        author={quote.quoteAuthor}
        key={quote._id}
      />
    );
  };
}
