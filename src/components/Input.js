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
		this.handleQueryInput = this.handleQueryInput.bind(this);
		this.fetchResults = this.fetchResults.bind(this);
	}

	handleQueryInput(event) {
		let tempInput = event.target.value;

		if (tempInput.length < 3) {
			this.setState({
				query: tempInput
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
