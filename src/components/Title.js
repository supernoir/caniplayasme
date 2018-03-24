import React from 'react';
import PropTypes from 'prop-types';

export default class Title extends React.Component {
	render() {
		return <h1>{this.props.text}</h1>;
	}
}

Title.propTypes = {
	text: PropTypes.string.isRequired
};
