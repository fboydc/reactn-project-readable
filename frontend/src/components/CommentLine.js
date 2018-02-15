/*******************************************************************************************
Component: CommentLine.js
Description:
Represents a single comment shown in our comments component.

Defined Properties:
1.state - our react component state, used only for our edit comment
   form.

2. deleteComment - Function


Class Methods:
1. deleteComment - see method description

React Methods:
1. componentWillMount - see description
2. render - see method description

********************************************************************************************/

import React, { Component } from 'react';
import * as api from  '../utils/api';
import * as actions from '../actions';
import { connect } from 'react-redux';
import EditComment from './EditComment';
import CommentVoting from './CommentVoting';
import FontAwesome from 'react-fontawesome';



class CommentLine extends Component {

	constructor(){
		super();
		this.state = {
			commentAuthor: '',
			commentBody: '',
			open: false
		}
		this.deleteComment = this.deleteComment.bind(this);

	}





	/*******************************************************************
	Name: deleteComment
	Description:
	makes the api call to delete our comment and dispatches our deleteComment
	action syncing our redux store with our api database.
	********************************************************************/
	deleteComment(){
		const { id } = this.props.comment;

		this.props.deleteComment(id);

	}

	/*******************************************************************
	Name: componentWillMount
	Description:
	we set the state of our commentline to its whatever its corresponding
	comment is. This way, when we edit our comment, our comment modal will
	have its form pre-loaded with its data.
	********************************************************************/
	componentWillMount(){
		const { commentAuthor, commentBody} = this.props;
		this.setState({commentAuthor, commentBody});
	}





	/*******************************************************************
	Name: render
	Description:
	renders our comment along with its edit/delete like/dislike controls.
	Again, taking into consideration the width of our viewport (passed down from our
	PostDetail component) it will render the appropiate layout.

	Child Components:
	EditComment - props: id<String>, isMedium<boolean>
	CommentVoting - props: id<String>
	********************************************************************/
	render(){
		const { comment, isMedium } = this.props



		if(isMedium){
			return (
				<div className="grid comment">
					<div className="row">
						<div className="col-12-medium comment-title">
							<strong>{comment.author}:</strong>
							<span className="edit-delete"><EditComment id={comment.id} isMedium={isMedium}/>
							<button type="button" onClick={this.deleteComment} className="deletebutton"><FontAwesome name="trash"/></button></span>
						</div>
					</div>
					<div className="row">
						<div className="col-12-medium comment-body">
							<p>{comment.body}</p>
						</div>
					</div>
					<div className="row">
						<div className="col-12-medium">
							<span>Score: {comment.voteScore}</span>
						</div>
					</div>
					<div className="row">
						<div className="col-12-medium">
							<span className="right"><CommentVoting id={comment.id}/></span>
						</div>
					</div>
				</div>
			)
		}else{
			return(

			<div className="grid">
				<div className="row">
					<div className="col-12">
						<strong>{comment.author}:</strong>
					</div>
				</div>
				<div className="row">
					<div className="col-12 comment-body">
						<div className="grid">
							<div className="row">
								<div className="col-12 col-12-medium">
									<span className="right"><EditComment id={comment.id}/></span>
									<span className="right"><button type="button" onClick={this.deleteComment} className="deletebutton"><FontAwesome name="trash"/></button></span>
								</div>
							</div>

							<div className="row">
								<div className="col-12">
									<p>{comment.body}</p>
								</div>
							</div>
							<div className="row">
								<div className="col-6">

									<span>Score: {comment.voteScore}</span>
									<CommentVoting id={comment.id}/>
								</div>
								<div className="col-6">

								</div>
							</div>
						</div>
					</div>
				</div>

				<hr/>

			</div>

			)
		}

	}
}

function mapDispatchToProps(dispatch){
	return{
		deleteComment: (id) => {
			api.deleteComment(id).then(()=>{
				dispatch(actions.deleteComment(id))
			})
		}
	}
}

export default connect(null, mapDispatchToProps)(CommentLine)