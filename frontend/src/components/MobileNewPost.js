import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';


class MobileNewPost extends Component {

	render(){
		return (
			<Link to="/newpost" className="newpost-link"><FontAwesome name="plus-circle"/></Link>
		)
	}
}

export default MobileNewPost;