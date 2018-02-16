/*******************************************************************************************
Component: MobileSort.js
Description:
Renders our sorting control for small viewport devices

Defined Properties:
1.sortByDate - <Function>
2.sortByScore - <Function>

Class Methods:
1.sortByDate - see method description
2.sortByScore - see method description

React Methods:
1. render - see description
********************************************************************************************/


import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';
import * as actions from '../actions';
import { connect} from 'react-redux';



class MobileSort extends Component {

	constructor(){
		super();
		this.sortByDate = this.sortByDate.bind(this);
		this.sortByScore = this.sortByScore.bind(this);
	}

	/****************************************************
	Name:sortByDate
	Parameters: none
	Returns: nothing
	Description:
	dispatches our sortByDate action, which reorders our
	posts by descending date order.
	****************************************************/
	sortByDate(){
		const { posts } = this.props;
		this.props.sortByDate(posts);

	}

	/****************************************************
	Name:sortByScore
	Parameters: none
	Returns: nothing
	Description:
	dispatches our sortByScore action, which reorders our
	posts by descending score order.
	****************************************************/
	sortByScore(){
		const { posts } = this.props;
		this.props.sortByScore(posts);
	}

	/****************************************************
	Name:render
	Description:
	renders our sort by date as a button with a calendar icon.
	renders our sort by score as a button with a start icon.
	****************************************************/
	render(){
		return(
			<span><button type="button" onClick={this.sortByDate}><FontAwesome name="calendar"/></button>
			<button type="button" onClick={this.sortByScore}><FontAwesome name="star" /></button></span>
		);
	}
}


function mapStateToProps({posts}){
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

export default connect(mapStateToProps, mapDispatchToProps)(MobileSort);