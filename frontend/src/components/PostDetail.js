import React, { Component } from 'react';
import * as api from '../utils/api';
import { convertDate } from '../utils/dateconverter';
import * as actions from '../actions/';
import { connect } from 'react-redux';




class PostDetail extends Component {

	componentWillMount(){
		const { match: { params } } = this.props;
		api.getPostDetails(params.post_id).then((post)=>{
			this.props.dispatch(actions.loadPost(post));
		});
	}

	render(){
		const {title, body, author, date, voteScore } = this.props.currentPost;
		return(
			<h3>{title}</h3>
			)
	}

}


function mapStateToProps({ currentPost }){
	return {
		currentPost: {
			...currentPost,
			date: convertDate(new Date(currentPost.timestamp))
		}
	}
}





export default connect(mapStateToProps, null)(PostDetail)