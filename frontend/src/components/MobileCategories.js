/*******************************************************************************************
Component: MobileCategories.js
Description:
Display a dropdown category menu for mobile viewports.

Defined Properties:
none

Class Methods:
none

React Methods:
1. componentWillMount - see description
2. render - see method description
********************************************************************************************/


import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import * as api from '../utils/api';
import { Link } from 'react-router-dom';


class MobileCategories extends Component {

	/*******************************************************
	Name: componentWillMount
	Description:
	Get all the categories from our server-api, and update our
	redux store.
	*********************************************************/
	componentWillMount(){
		this.props.getAllCategories();
	}


	/*******************************************************
	Name: render
	Description:
	renders a list of the existing categories, containing a anchor
	with a url path to the particular category. When clicking on any
	one of them we also want our menu to close, so that the user can
	see the result.
	*********************************************************/
	render(){
		const { categories } = this.props

		return (
			<div className="col-12-medium">
				<div className="row">
					<div className="col-12-medium">
						<Link className="mobile-menu-link" to="/" onClick={this.props.toggleMenu}>all</Link>
					</div>
				</div>
					{
					categories.map((category)=> {
						const {name,path} = category;
							return (
								<div className="row" key={path}>
									<div className="col-12-medium">
										<Link to={path} className="mobile-menu-link" onClick={this.props.toggleMenu}>{name}</Link>
									</div>
								</div>
							)
						})
					}
			</div>
		)
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


export default connect(mapStateToProps, mapDispatchToProps)(MobileCategories);