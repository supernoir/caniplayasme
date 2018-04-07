import React from 'react';
import PropTypes from 'prop-types';

export default class ErrorMessage extends React.Component {
	render() {
		return (
			<div className="error">
				<p className="error-message">
					<span className="error-message-tag">Error</span>
					{this.props.message}
				</p>
			</div>
		);
	}
}

ErrorMessage.propTypes = {
	message: PropTypes.string.isRequired
};
