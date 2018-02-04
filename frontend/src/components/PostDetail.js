import React, { Component } from 'react';
import * as api from '../utils/api';
import { convertDate } from '../utils/dateconverter';
import * as actions from '../actions/';
import { connect } from 'react-redux';
import  '../css/framework.css';
import  '../css/postdetail.css';
import  '../css/comments.css';
import { validate } from '../utils/commentsvalidator';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import Modal from 'react-modal';
import Comments from './Comments';
import VotingOptions from './VotingOptions';




class PostDetail extends Component {


	constructor(){
		super();
		this.deletePost = this.deletePost.bind(this);
		this.openCommentsModal = this.openCommentsModal.bind(this);
		this.closeCommentsModal = this.closeCommentsModal.bind(this);
		this.handleCommentAuthorChange = this.handleCommentAuthorChange.bind(this);
		this.handleCommentBodyChange = this.handleCommentBodyChange.bind(this);
		this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
		this.state = {
			redirect: false,
			newCommentModal: false,
			commentAuthor: '',
			commentBody: '',
			errors: []
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
		this.setState({newCommentModal: true});
	}

	closeCommentsModal(){
		this.setState({newCommentModal: false, commentAuthor: '', commentBody: '', errors: []});
	}

	handleCommentAuthorChange(e){
		this.setState({commentAuthor: e.target.value})
	}

	handleCommentBodyChange(e){
		this.setState({commentBody: e.target.value})
	}

	handleCommentSubmit(){
		const { commentAuthor, commentBody } = this.state;
		const { id } = this.props.currentPost; 

		const errors = validate(commentAuthor, commentBody);

		if(errors.length > 0){
			this.setState({ errors })
			return;
		}

		this.props.addComment(id, commentAuthor, commentBody);
		this.closeCommentsModal();

	}	





	render(){
		const {id, title, body, author, date, voteScore, comments} = this.props.currentPost;
		const { redirect, errors } = this.state;
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
							<span className="right"><button onClick={this.openCommentsModal}>add</button></span>
						</div>
					</div>
					<div className="row">
						<Comments />

					</div>
				</div>
				<Modal isOpen={this.state.newCommentModal} className="postdetail-newcomment-modal" overlayClassName="postdetail-newcomment-overlay">
					<div className="grid">
						<div className="row">
							<div className="col-12">
								<button className="right" onClick={this.closeCommentsModal}>close</button>
							</div>
						</div>
						<div className="row">
							<div className="col-12">
								<h2 className="centered">Add comment</h2>
							</div>
						</div>
						<div className="row">
							<div className="col-5">
							</div>
							<div className="col-7">
							{ 
								errors.map((error)=>(
									<p>{error}</p>
								))
							}
							</div>
						</div>
						<div className="row">
							<div className="col-5">
								<span className="right">author:</span>
							</div>
							<div className="col-7">
								<span><input type="text" value={this.state.commentAuthor} onChange={this.handleCommentAuthorChange}/></span>
							</div>
						</div>
						<div className="row">
							<div className="col-5">
								<span className="right">body:</span>
							</div>
							<div className="col-7">
								<span><textarea
								rows="10" cols="30" type="text" value={this.state.commentBody} onChange={this.handleCommentBodyChange}/></span>
							</div>
						</div>
						<div className="row">
							<div className="col-5">
								
							</div>
							<div className="col-7">
								<button className="button" onClick={this.handleCommentSubmit}>add</button>
							</div>
						</div>
					</div>
				</Modal>
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
		})),
		addComment: (id, body, author) => (
			api.addComment(id, body, author).then((comment)=>{
				dispatch(actions.addComment(comment))
			})
		)

	}
}





export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)