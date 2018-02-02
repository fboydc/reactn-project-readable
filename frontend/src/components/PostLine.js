import React, { Component } from 'react';
import '../css/postlist.css';
import { Link } from 'react-router-dom';
import * as api from '../utils/api';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import VotingOptions from './VotingOptions';

class PostLine extends Component {

	constructor(){
		super();
		this.deletePost = this.deletePost.bind(this);

	}


	deletePost(){
		const { id } = this.props.post;
		this.props.deletePost(id);
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
						<a href="" onClick={this.deletePost}>delete</a>
					</span>

				</div>
				<div className="postlist-footer">
					<div className="postlist-footer-row">
						<span>&nbsp;</span>
						<span className="right">
							<VotingOptions id={id}/>
						</span>
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
		sortByScore: (id)=>{
			dispatch(actions.sortByScore(id))
		}
	}
}

export default connect(null, mapDispatchToProps)(PostLine);