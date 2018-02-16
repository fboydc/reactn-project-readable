/*******************************************************************************************
Component: VotingOptions.js
Description:
Renders our voting mechanism, used for upvoting or downvoting a post.

Defined Properties:
1. upVote - <Function>
2. downVote - <Function>

Class Methods:
1. upVote - see method description
2. downVote - see method description


React Methods:
3. render - see method description
********************************************************************************************/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as api from '../utils/api';
import * as actions from '../actions';
import FontAwesome from 'react-fontawesome';



class VotingOptions extends Component {



	constructor(){
		super();
		this.upVote = this.upVote.bind(this);
		this.downVote = this.downVote.bind(this);
	}

	/******************************************
	Name: upVote
	Parameters: none
	Returns: nothing
	Description:
	sends an UPDATE request to api-server, which
	increase the vote score in the backend, and
	updates our redux store accordingly
	*******************************************/
	upVote(e){
		const { id, currentPost } = this.props;
		this.props.upVote(id, currentPost);

	}

	/******************************************
	Name: downVote
	Paremeters: none
	Returns: nothing
	Description:
	sends an UPDATE request to api-server, which
	decreases the vote score in the backend, and
	updates our redux store accordingly
	*******************************************/
	downVote(e){
		const { id, currentPost } = this.props;
		this.props.downVote(id, currentPost);
	}


	/******************************************
	Name: render
	Description:
	renders our two buttons for upvoting/downvoting
	a post.
	*******************************************/
	render(){

		if(this.props.isMedium){
			return(
			<div>
				<button type="button" onClick={this.upVote} className="mobile-likebutton"><FontAwesome name="thumbs-up"/></button>|<button type="button" onClick={this.downVote} className="mobile-likebutton"><FontAwesome name="thumbs-down"/></button>
			</div>
			)
		}else{
			return(
			<div>
				<button type="button" onClick={this.upVote} className="likebutton"><FontAwesome name="thumbs-up"/></button>|<button type="button" onClick={this.downVote} className="likebutton"><FontAwesome name="thumbs-down"/></button>
			</div>
			)
		}

	}
}




function mapDispatchToProps(dispatch){
	return {
		upVote: (id, currentPost)=>{
			api.postUpVote(id).then(()=>{
				dispatch(actions.upvotePost(id))
			}).then(()=>{
				if(currentPost){
					api.getPostDetails(id).then((post)=>{
						dispatch(actions.loadPost(post));
					})
				}

			})
		},
		downVote: (id, currentPost)=>{
			api.postDownVote(id).then(()=>{
				dispatch(actions.downvotePost(id))
			}).then(()=>{
				if(currentPost){
					api.getPostDetails(id).then((post)=>{
						dispatch(actions.loadPost(post));
					})
				}
			})
		}

	}
}

export default connect(null, mapDispatchToProps)(VotingOptions)