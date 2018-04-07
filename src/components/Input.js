import React from 'react';
import axios from 'axios';
import ErrorMessage from './ErrorMessage';

const Loading = () => {
	return <span className="loader">Loading</span>;
};

export default class Input extends React.Component {
	constructor() {
		super();

		this.state = {
			query           : '',
			results         : [],
			resultsAvailable: false,
			loading         : true,
			error           : false,
			errorMessage    : ''
		};

		this.testForInputValues = this.testForInputValues.bind(this);
		this.handleQueryInput = this.handleQueryInput.bind(this);
		this.fetchResults = this.fetchResults.bind(this);
	}

	testForInputValues(values) {
		let validExpression = /^[a-z0-9]+$/;
		return validExpression.test(values);
	}

	handleQueryInput(event) {
		let tempInput = event.target.value;
		if (this.testForInputValues(tempInput) === true) {
			if (tempInput.length < 3) {
				this.setState({
					query: tempInput,
					error: false
				});
				try {
					this.fetchResults();
				} catch (error) {
					this.setState({
						error       : true,
						errorMessage: error
					});
				}
			}
		} else {
			this.setState({
				error       : true,
				errorMessage: 'Only Alphanumeric Characters (a-Z, 0-9) are permitted.'
			});
		}
	}

	componentWillMount() {
		this.setState({
			loading: true
		});
	}

	fetchResults() {
		let queryParams = this.state.query;

		if (
			queryParams !== '' &&
      queryParams !== undefined &&
      queryParams.length < 3
		) {
			try {
				axios({
					method : 'get',
					url    : '/games',
					baseURL: 'http://localhost:3030',
					params : { game: queryParams }
				}).then(data => {
					this.setState({ results: data.data.result, loading: false });
				});
			} catch (error) {
				this.setState({
					error       : true,
					errorMessage: error
				});
			}
		}
	}

	render() {
		return (
			<form className="query-input">
				<input
					className="query-input-text"
					type="text"
					onChange={this.handleQueryInput}
					placeholder="The Name of the Game you'd like to play"
				/>
				{this.state.error ? (
					<ErrorMessage message={this.state.errorMessage} />
				) : null}
				<ol className="results-list">
					{this.state.loading ? <Loading /> : null}
					{this.state.results.map(result => {
						return (
							<li className="results-list-item">
								{result.item.name}{' '}
								<span className="text-muted">{result.score}</span>
							</li>
						);
					})}
				</ol>
			</form>
		);
	}
}
