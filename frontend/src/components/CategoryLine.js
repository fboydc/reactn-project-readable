/*******************************************************************************************
Component: CategoryLine.js
Description:
Represents each category as retrieved from the api-server api.

Defined Properties:
None

React Methods:
1. render - see method description

********************************************************************************************/

import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class CategoryLine extends Component {


	/************************************************
	Name: render
	Description:
	renders the anchor tag with its respective path
	as specified by its passed category prop.
	***********************************************/
	render(){

		const { name, path } = this.props.category;

		return(
			<li>
				<Link to={path} className="categorylink">{name}</Link>
			</li>
			)
	}
}




export default CategoryLine;