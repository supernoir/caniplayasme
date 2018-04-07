import React from 'react';
import axios from 'axios';

import Results from './Results';
import ErrorMessage from './ErrorMessage';
import InfoMessage from './InfoMessage';

const Loading = () => {
	return <span className="loader">Loading</span>;
};

export default class Input extends React.Component {
	constructor() {
		super();

		this.state = {
			query           : '',
			hasResults      : false,
			results         : [],
			resultsAvailable: false,
			loading         : true,
			error           : false,
			errorMessage    : '',
			info            : false,
			infoMessage     : '',
			queryCount      : 0
		};

		this.testForInputValues = this.testForInputValues.bind(this);
		this.handleQueryInput = this.handleQueryInput.bind(this);
		this.fetchResults = this.fetchResults.bind(this);
	}

	testForInputValues(values) {
		let validExpression = /(\w)+/;
		return validExpression.test(values);
	}

	handleQueryInput(event) {
		let tempInput = event.target.value;
		if (this.testForInputValues(tempInput)) {
			this.setState({
				query: tempInput,
				error: false,
				info : false
			});
			try {
				this.fetchResults();
			} catch (error) {
				this.setState({
					error       : true,
					errorMessage: error
				});
			}
		} else {
			this.setState({
				resultsAvailable: false,
				error           : true,
				errorMessage    : 'Only Alphanumeric Characters (a-Z, 0-9) are permitted.'
			});
		}
	}

	componentDidMount() {
		this.setState({
			loading   : false,
			queryCount: this.state.queryCount++
		});
	}

	componentWillMount() {
		this.setState({
			loading: true
		});
	}

	fetchResults() {
		let queryParams = this.state.query;
		if (queryParams === '' || queryParams.length < 3) {
			this.setState({
				info       : true,
				infoMessage: 'Please enter at least three characters.'
			});
		} else if (queryParams !== undefined && queryParams.length >= 3) {
			try {
				axios({
					method : 'get',
					url    : '/games',
					baseURL: 'http://localhost:3030',
					params : { game: queryParams }
				}).then(data => {
					this.setState({ results: data.data.result, hasResults: true, loading: false });
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
					onKeyDown={(e)=> {if (e.key === 'Enter') {e.preventDefault();}}}
					placeholder="The Name of the Game you'd like to play"
				/>
				{this.state.info ? (
					<InfoMessage message={this.state.infoMessage} />
				) : null}
				{this.state.error ? (
					<ErrorMessage message={this.state.errorMessage} />
				) : null}
				{this.state.hasResults ? <Results results={this.state.results} /> : <p className="noresults">{`No Matching Games found`}</p> }
				{this.props.loading ? <Loading /> : null}

			</form>
		);
	}
}
