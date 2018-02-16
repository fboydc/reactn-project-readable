/*******************************************************************************************
Component: SortPosts.js
Description:
Renders our sorting control for our post in category view. This will only
be visible in viewports with sizes > 900 px.

Defined Properties:
1. State:
	value - <String> used for our select html element in our sorting controlled component
2. handleChange -  <Function>
3. handleSort - <Function>


Class Methods:
1. handleChange - see method description
2. handleSort - see method description

React Methods:
2. componentWillMount - see method description
3. render - see method description
********************************************************************************************/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';



class SortPosts extends Component {

	constructor(){
		super();
		this.state = {
			value: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSort = this.handleSort.bind(this);
	}
	/***************************************
	Name: componentWillMount
	Description:
	Set the default value of our SortPosts component
	to timestamp or 'date'.
	***************************************/
	componentWillMount(){
		this.setState({value: 'timestamp'});

	}


	/***************************************
	Name: handleChange
	Parameters: <Event>
	Returns: none
	Description:
	change the value of our SortPosts component
	so that it's reflected whenever the user
	makes a change.
	***************************************/
	handleChange(e){
		this.setState({value: e.target.value});


	}

	/***************************************
	Name: handleSort
	Parameters: <Event>
	Returns: none
	Description:
	Call the appropiate action, depending on
	the selected sorting criteria.
	***************************************/
	handleSort(){
		const { value } = this.state;
			const { posts } = this.props

			console.log("value", value);

			if(value === 'voteScore'){
				console.log("here in votescore");
				this.props.sortByScore(posts)
			}

			if(value === 'timestamp'){
				console.log("here in timestamp");
				this.props.sortByDate(posts)
			}
	}

	/***************************************
	Name: render
	Description:
	Renders our select html element with the
	two sorting criteria
	***************************************/
	render(){

		return(
			<span className="sort-container">
				<span>
					<label className="sort-label">Criteria:</label>
				</span>
				<span className="sort-select">
					<select value={this.state.value} onChange={this.handleChange} className="selectbox">
						<option value="timestamp">date</option>
						<option value="voteScore">score</option>
					</select>
				</span>
				<span>
					<button onClick={this.handleSort} className="large-button">sort</button>
				</span>
			</span>
			)
	}
}


function mapStateToProps({ posts }){
	const { entries } = posts;
	return {
		posts: entries
	}

}

function mapDispatchToProps(dispatch){

	return {
		sortByScore: (posts)=>{
			dispatch(actions.sortByScore(posts));
		},
		sortByDate: (posts)=>{
			dispatch(actions.sortByTimestamp(posts));
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(SortPosts)