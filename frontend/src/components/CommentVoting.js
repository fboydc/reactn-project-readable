import React, { Component } from 'react';
import * as api from '../utils/api';
import * as actions from '../actions'
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';



class CommentVoting extends Component {


	constructor(){
		super();
		this.upVote = this.upVote.bind(this)
		this.downVote = this.downVote.bind(this)
	}

	upVote(){
		const {id, commentUpVote} = this.props;
		commentUpVote(id);
	}

	downVote(){
		const {id, commentDownVote} = this.props;
		commentDownVote(id);
	}


	render(){
		return (
			<span className="comment-likes">
				<button type="button" onClick={this.upVote} className="likebutton"><FontAwesome name="thumbs-up"/></button>
				<button type="button" onClick={this.downVote} className="likebutton"><FontAwesome name="thumbs-down"/></button>
			</span>

		)
	}

}

function mapDispatchToProps(dispatch){
	return {
		commentUpVote: (id) => {
			api.commentUpVote(id).then((comment)=>{
				dispatch(actions.upvoteComment(id));
			})
		},

		commentDownVote: (id) => {
			api.commentDownVote(id).then((comment)=>{
				dispatch(actions.downvoteComment(id));
			})
		}
	}
}

export default connect(null, mapDispatchToProps)(CommentVoting)


