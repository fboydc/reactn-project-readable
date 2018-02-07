import React, { Component } from 'react';
import '../css/postlist.css';
import { Link } from 'react-router-dom';
import * as api from '../utils/api';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import VotingOptions from './VotingOptions';
import FontAwesome from 'react-fontawesome';

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
			<div className="grid postlist-content">
				<div className="row postlist-header">
					<div className="col-6">
						<big><b><Link to={`${category}/${id}`} className="post-title">{title}</Link></b></big>
					</div>
					<div className="col-6">
						<span className="right">
							<Link to={`edit/${id}`}><FontAwesome name="edit" className="editbutton"/></Link>
							<button type="button" onClick={this.deletePost} className="deletebutton"><FontAwesome name="trash-alt"/></button>
						</span>
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<span className="right">
							<VotingOptions id={id}/>
						</span>
					</div>
				</div>
				<div className="row">
					<div className="col-6">
						<span>By: {author}</span>
					</div>
					<div className="col-6">
						<span className="right"> Score: {voteScore}</span>
					</div>
				</div>
				<div className="row">
					<div className="col-6">
						<span>Comments: {commentCount}</span>
					</div>
					<div className="col-6">
						<span className="right"> Created: {date}</span>
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