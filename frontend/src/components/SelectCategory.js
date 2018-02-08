import React, { Component } from 'react';
import * as api from '../utils/api';
import { connect } from 'react-redux';
import * as actions from '../actions/';

class SelectCategory extends Component {




	componentWillMount(){
		const { categories } = this.props;

		if(categories.length === 0)
			this.props.getAllCategories();

	}




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