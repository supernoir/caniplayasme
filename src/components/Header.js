import React from 'react';

export default class Header extends React.Component {
	render() {
		return (
			<div className="header">
				<h1 className="brand">
					Can I <span className="highlighted">play</span> as Me?
				</h1>
				<h3 className="claim">Lets you find female-lead Video Games</h3>
			</div>
		);
	}
}
