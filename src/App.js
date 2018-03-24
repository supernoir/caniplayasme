import React from 'react';
import Query from './components/Query';
import Header from './components/Header';
import Results from './components/Results';

export default class App extends React.Component {
	render() {
		return (
			<div className="app">
				<Header />
				<Query />
				<Results />
			</div>
		);
	}
}
