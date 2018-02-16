/*******************************************************************************************
Component: MobileNewPost.js
Description:
Display our new post button in category view as a "+" icon for mobile devices

Defined Properties:
none

Class Methods:
none

React Methods:
1. render - see description
********************************************************************************************/

import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';


class MobileNewPost extends Component {

	/****************************************************
	Name:render
	Description:
	renders our "+" button on mobile devices, used to navigate users
	to the new post view.
	****************************************************/
	render(){
		return (
			<Link to="/newpost" className="newpost-link"><FontAwesome name="plus-circle"/></Link>
		)
	}
}

export default MobileNewPost;