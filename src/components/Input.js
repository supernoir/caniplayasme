import React from 'react';

export default class Input extends React.Component {
	render() {
		return (
			<form>
				<label>
					What would you like to play?
					<input type="text" placeholder="The Name of the Game you'd like to play" />
				</label>
			</form>
		);
	}
}
