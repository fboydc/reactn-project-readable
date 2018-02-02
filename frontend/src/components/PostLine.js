import React, { Component } from 'react';
import '../css/postlist.css';
import { Link } from 'react-router-dom';
import * as api from '../utils/api';
import { connect } from 'react-redux';
import * as actions from '../actions/';

class PostLine extends Component {

	constructor(){
		super();
		this.deletePost = this.deletePost.bind(this);
		this.upVote = this.upVote.bind(this);
		this.downVote = this.downVote.bind(this);

	}


	deletePost(){
		const { id } = this.props.post;
		this.props.deletePost(id);
	}

	upVote(){
		const { id } = this.props.post;
		this.props.upVote(id);

	}

	downVote(){
		const { id } = this.props.post;
		this.props.downVote(id);
	}




	render(){
		const { id, title, body, author, voteScore, commentCount, date, category } = this.props.post;
		return (
			<div className="postlist-content">
				<div className="postlist-header">
					<big>
						<b><Link to={`${category}/${id}`}>{title}</Link></b>
					</big>
					<span className="right">
						<Link to={`edit/${id}`}>edit</Link>|
						<button onClick={this.deletePost}>delete</button>
					</span>

				</div>
				<div className="postlist-footer">
					<div className="postlist-footer-row">
						<span>&nbsp;</span>
						<span className="postlist-footer-row-column2"><button onClick={this.upVote}>up</button>|<button onClick={this.downVote}>down</button></span>
					</div>
					<div className="postlist-footer-row">
						<span>By: {author}</span>
						<span className="postlist-footer-row-column2"> Score: {voteScore}</span>
					</div>
					<div className="postlist-footer-row">
						<span>Comments: {commentCount}</span>
						<span className="postlist-footer-row-column2"> Created: {date}</span>
					</div>
				</div>
			</div>
			)
	}
}

function mapDispatchToProps(dispatch){
	return {
		deletePost: (id)=>{
			api.deletePost(id).then((post)=>{
				dispatch(actions.deletePost(post.id))
			})
		},
		upVote: (id)=>{
			api.postUpVote(id).then(()=>{
				dispatch(actions.upvotePost(id))
			})
		},
		downVote: (id)=>{
			api.postDownVote(id).then(()=>{
				dispatch(actions.downvotePost(id))
			})
		},
		sortByScore: (id)=>{
			dispatch(actions.sortByScore(id))
		}
	}
}

export default connect(null, mapDispatchToProps)(PostLine);