import React from 'react';
import Query from './components/Query';
import Header from './components/Header';
import Footer from './components/Footer';

export default class App extends React.Component {
	render() {
		return (
			<div className="app">
				<Header />
				<Query />
				<Footer />
			</div>
		);
	}
}
