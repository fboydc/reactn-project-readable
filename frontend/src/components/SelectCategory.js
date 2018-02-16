/*******************************************************************************************
Component: SelectCategory.js
Description:
Renders the select category option in our new post and edit post views.


Class Methods:
none

React Methods:
2. componentWillMount - see method description
3. render - see method description
********************************************************************************************/

import React, { Component } from 'react';
import * as api from '../utils/api';
import { connect } from 'react-redux';
import * as actions from '../actions/';

class SelectCategory extends Component {



	/***************************************
	Name: componentWillMount
	Description:
	Fetches all the categories in our application,
	present in our api-server database.
	****************************************/
	componentWillMount(){
		const { categories } = this.props;

		if(categories.length === 0)
			this.props.getAllCategories();

	}



	/***************************************
	Name: render
	Description:
	renders the select html element with the
	categories from our api-server. If we are
	on edit view, then this option will be disabled

	****************************************/
	render(){
		const { categories, handler, value} = this.props;

		if(this.props.edit){
			return(
				<select value={value} onChange={handler} disabled>
					<option value=''>select category</option>
					{categories.map((category) => (
						<option value={category.path} key={category.path}>{category.name}</option>
					))}
				</select>
			)
		}else{
			return(
				<select value={value} onChange={handler} className="post-selectbox">
					<option value=''>select category</option>
					{categories.map((category) => (
						<option value={category.path} key={category.path}>{category.name}</option>
					))}
				</select>
			)
		}

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
		getAllCategories: ()=>api.getCategories().then((categories)=>{
			dispatch(actions.feedCategories(categories));
		})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectCategory);