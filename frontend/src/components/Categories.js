import React, { Component } from 'react';
import * as api from '../utils/api';
import { connect } from 'react-redux';
import CategoryLine from './CategoryLine';
import * as actions from '../actions/';
import { Link } from 'react-router-dom';





class Categories extends Component {

	componentWillMount(){
		this.props.getAllCategories();
	}



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