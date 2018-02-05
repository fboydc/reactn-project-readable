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
import Modal from 'react-modal';
import Comments from './Comments';
import VotingOptions from './VotingOptions';
import CommentFormModal from './CommentFormModal';




class PostDetail extends Component {


	constructor(){
		super();
		this.deletePost = this.deletePost.bind(this);
		this.openCommentsModal = this.openCommentsModal.bind(this);
		this.closeCommentsModal = this.closeCommentsModal.bind(this);
		this.handleCommentAuthorChange = this.handleCommentAuthorChange.bind(this);
		this.handleCommentBodyChange = this.handleCommentBodyChange.bind(this);
		this.state = {
			redirect: false,
			commentAuthor: '',
			commentBody: '',
			open: false
		}

		this.handlers = {
			onAuthorChange: this.handleCommentAuthorChange,
			onBodyChange: this.handleCommentBodyChange,
			closeModal: this.closeCommentsModal
		}
	}

	componentWillMount(){
		Modal.setAppElement('body');
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

	openCommentsModal(){
		this.setState({open: true});
	}

	closeCommentsModal(){

		this.setState({open: false, commentAuthor: '', commentBody: '', errors: []});
	}


	handleCommentAuthorChange(e){
		this.setState({commentAuthor: e.target.value})
	}

	handleCommentBodyChange(e){
		this.setState({commentBody: e.target.value})
	}

	render(){
		const {id, title, body, author, date, voteScore, comments} = this.props.currentPost;
		const { redirect } = this.state;
		if(redirect){
			return (redirect && (<Redirect to="/"/>))
		}else if(!id){
			return(
					<div className="postdetail-grid">
						<div className="row">
							<div className="col-12">
								<p>Post not available</p>
							</div>	
						</div>
					</div>

				)
			
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
							<span className="right"><button onClick={this.openCommentsModal}>add</button></span>
						</div>
					</div>
					<div className="row">
						<Comments />
					</div>
				</div>
				<CommentFormModal id={id}  data={this.state} handlers={this.handlers}/>
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