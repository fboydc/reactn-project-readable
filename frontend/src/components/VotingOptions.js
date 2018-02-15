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


	upVote(e){
		console.log("props", this.props);
		const { id, currentPost } = this.props;
		this.props.upVote(id, currentPost);

	}

	downVote(e){
		console.log("props", this.props);
		const { id, currentPost } = this.props;
		this.props.downVote(id, currentPost);
	}



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