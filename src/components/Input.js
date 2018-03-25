import React from 'react';
import axios from 'axios';

const Loading = () => {
	return <span className="loader">Loading</span>;
};

class ErrorMessage extends React.Component {
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

export default class Input extends React.Component {
	constructor() {
		super();

		this.state = {
			query: '',
			results: [],
			resultsAvailable: false,
			loading: true,
			error: false,
			errorMessage: ''
		};
		this.handleQueryInput = this.handleQueryInput.bind(this);
		this.fetchResults = this.fetchResults.bind(this);
	}

	handleQueryInput(event) {
		let tempInput = event.target.value;
		this.setState({
			query: tempInput
		});
		this.fetchResults();
	}

	componentWillMount() {
		this.setState({
			loading: true
		});
	}

	fetchResults() {
		let queryParams = this.state.query;

		if (queryParams !== '' || queryParams !== undefined || queryParams.length < 3) {
			try {
				axios({
					method: 'get',
					url: '/games',
					baseURL: 'http://localhost:3030',
					params: {game: queryParams}
				}).then(data => {
					console.log(data.data.result);
					this.setState({results: data.data.result, loading: false});
				});
			} catch (error) {
				this.setState({
					error: true,
					errorMessage: error
				});
			}
		} else {
			this.setState({
				error: true,
				errorMessage: 'Your query must be at least 3 characters long'
			});
		}
	}

	componentDidMount() {
		let queryParams = '';
		axios({
			method: 'get',
			url: '/games',
			baseURL: 'http://localhost:3030',
			params: {game: queryParams}
		}).then(data => {
			console.log(data.data.result);
			this.setState({results: data.data.result, loading: false});
		});
	}

	render() {
		return (
			<form className="query-input">
				<input className="query-input-text" type="text" onChange={this.handleQueryInput} placeholder="The Name of the Game you'd like to play" />
				{this.state.error ? <ErrorMessage message={this.state.errorMessage} /> : ''}
				<ol className="results-list">
					{this.state.loading ? <Loading /> : ''}
					{this.state.results.map(result => {
						return (
							<li className="results-list-item">
								{result.item.name} <span className="text-muted">{result.score}</span>
							</li>
						);
					})}
				</ol>
			</form>
		);
	}
}
