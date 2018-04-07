import React from 'react';
import PropTypes from 'prop-types';

export default class InfoMessage extends React.Component {
	render() {
		return (
			<div className="info">
				<p className="info-message">
					<span className="info-message-tag">Info</span>
					{this.props.message}
				</p>
			</div>
		);
	}
}

InfoMessage.propTypes = {
	message: PropTypes.string.isRequired
};
