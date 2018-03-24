import React from 'react';
import Title from './Title';

export default class Header extends React.Component {
	render() {
		return (
			<div className="header">
				<Title text={'Can I play as Me?'} />
			</div>
		);
	}
}
