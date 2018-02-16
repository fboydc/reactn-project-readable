/*******************************************************************************************
Component: CommentVoting.js
Description:
Displays the voting control for comments. A CommentVoting component is rendered
for each comment.

Defined Properties:
1. upVote <Function>
2. downVote <Function>


Class Methods:
1. upVote - see description
2. downVote - see description

React Methods:
2. render - see method description
********************************************************************************************/


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

	/*****************************************
	Name: upVote
	Returns: nothing
	Parameters: none
	Description:
	Send a request to our api server to increase
	the voting score for this specific comment,
	as specified by the passed props. Sequentially,
	updates our redux store by increasing voteScore
	property by one.
	******************************************/
	upVote(){
		const {id, commentUpVote} = this.props;
		commentUpVote(id);
	}

	/*****************************************
	Name: downVote
	Returns: nothing
	Parameters: none
	Description:
	Send a request to our api server to decrease
	the voting score for this specific comment,
	as specified by the passed props. Sequentially,
	updates our redux store by decreasing voteScore
	property by one.
	******************************************/
	downVote(){
		const {id, commentDownVote} = this.props;
		commentDownVote(id);
	}


	/**************************************************
	Name: render
	Description:
	Renders our two buttons, along with our fontawesome
	icon.

	Child Components - None
	**************************************************/
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


