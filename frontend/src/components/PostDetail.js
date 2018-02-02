import React, { Component } from 'react';
import * as api from '../utils/api';
import { convertDate } from '../utils/dateconverter';
import * as actions from '../actions/';
import { connect } from 'react-redux';
import  '../css/framework.css';
import  '../css/postdetail.css';
import  '../css/comments.css';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import Comments from './Comments';
import VotingOptions from './VotingOptions';




class PostDetail extends Component {


	constructor(){
		super();
		this.deletePost = this.deletePost.bind(this);
		this.state = {
			redirect: false
		}
	}

	componentWillMount(){
		const { match: { params } } = this.props;
		this.props.getPostDetails(params.post_id);
		this.props.getComments(params.post_id);

	}

	deletePost(){
		const { id } = this.props.currentPost;

		this.props.deletePost(id).then(()=>{
			this.setState({redirect: true});
		});
	}



	render(){
		const {id, title, body, author, date, voteScore, comments} = this.props.currentPost;
		const { redirect } = this.state;
		console.log("redirect", redirect);

		if(redirect){
			return (redirect && (<Redirect to="/"/>))
		}


		return(

			<div className="postdetail-grid">
				<div className="row">
					<div className="col-12">
						<Link to="/">Take me back</Link>
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<h2 className="postdetail-header"> >> {title}</h2>
					</div>
				</div>
				<div className="row">
					<div className="col-6">
						<span>Date of creation: {date}</span>
					</div>
					<div className="col-6">
						<span className="right">score: {voteScore}</span>
					</div>
				</div>
				<div className="row">
					<div className="col-6">
						By: <span className="author">{author}</span>
					</div>
					<div className="col-6">
						<span className="right">
							<VotingOptions id={id} currentPost={true}/>
						</span>
					</div>
				</div>
				<div>
					<div className="row">
						<div className="col-6">
							<Link to={`../edit/${id}`}>edit</Link>|
							<button onClick={this.deletePost}>delete</button>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<p className="postdetail-body">{body}</p>
					</div>
				</div>
				<div className="comments-grid">
					<div className="row">
						<div className="col-6">
							<h3 className="comments-section-title">Comments</h3>
						</div>
						<div className="col-6">
							<span className="right">add</span>
						</div>
					</div>
					<div className="row">
						<Comments />

					</div>
				</div>

			</div>


			)
	}

}


function mapStateToProps({ currentPost }){
	console.log("current post", currentPost);
	return {
		currentPost: {
			...currentPost,
			date: convertDate(new Date(currentPost.timestamp))
		}
	}
}

function mapDispatchToProps(dispatch){
	return {
		getPostDetails: (id)=> {
			api.getPostDetails(id).then((post)=>{
				dispatch(actions.loadPost(post));
			})
		},
		getComments: (id) => {
			api.getComments(id).then((comments)=>{
				dispatch(actions.feedComments(comments));
			})
		},
		deletePost: (id) =>(
			api.deletePost(id).then((post)=>{
			dispatch(actions.deletePost(post.id))
		}))

	}
}





export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)