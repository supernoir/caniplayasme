import React from "react";
import PropTypes from "prop-types";

export default class Results extends React.Component {
  render() {
    return (
      <ol className="results-list">
        {this.props.results.map(result => {
          return (
            <li className="results-list-item">
              {result.item.name}{" "}
              <span className="text-muted">{result.score}</span>
            </li>
          );
        })}
      </ol>
    );
  }
}

Results.propTypes = {
  results: PropTypes.array
};
