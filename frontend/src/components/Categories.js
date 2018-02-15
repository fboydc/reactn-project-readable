/*******************************************************************************************
Component: Categories.js
Description:
Shows posts, categories, and sorting and like/dislike mechanisms

Defined Properties:
None

React Methods:
1. render - see method description
2. componentWillMount - see method description
********************************************************************************************/

import React, { Component } from 'react';
import * as api from '../utils/api';
import { connect } from 'react-redux';
import CategoryLine from './CategoryLine';
import * as actions from '../actions/';
import { Link } from 'react-router-dom';





class Categories extends Component {

	/******************************************************
	Name: componentWillMount
	Description:
	Uses our api to retrieve all the categories from
	our "Database", dispatching our feed categories action

	******************************************************/
	componentWillMount(){
		this.props.getAllCategories();
	}


	/***********************************************
	Name: render
	Child Components:
	1.Link - Provided by react-router-dom
	2.CategoryLine - Props Passed: key <String> category <object>

	Description:
	Renders a CategoryLine component for every category
	returned from the API.
	************************************************/
	render(){
		const { categories } = this.props
		return(
			<ul className="category-list">
				<li><Link to="/" className="categorylink">all</Link></li>
				{ categories.map((category) => {
					return <CategoryLine key={category.name} category={category}/>
				})}

			</ul>
			);
	}


}

function mapStateToProps({ categories }){
	const { entries } = categories;
	return {
		 categories: entries
	}
}

function mapDispatchToProps(dispatch){
	return {
		getAllCategories: ()=> api.getCategories().then((categories)=>{
			dispatch(actions.feedCategories(categories))
		}),
    	filterPosts: (category) => dispatch(actions.filterPosts(category))
	}
}




export default connect(mapStateToProps, mapDispatchToProps)(Categories);