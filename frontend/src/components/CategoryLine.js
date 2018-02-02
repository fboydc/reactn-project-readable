import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class CategoryLine extends Component {



	render(){

		const { name, path } = this.props.category;

		return(
			<li>
				<Link to={path}>{name}</Link>
			</li>
			)
	}
}




export default CategoryLine;