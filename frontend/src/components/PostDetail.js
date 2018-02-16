/*******************************************************************************************
Component: PostDetail.js
Description:
Displays our post detail view.

Defined Properties:
1. state: used for handling our controlled form, when adding a new
	redirect <boolean>

2. deletePost - <Function>

Class Methods:
1. deletePost - see method description
2. handleWindowSizeChange - see method description

React Methods:
1. componentWillMount - see method description
2. componentWillUnmount - see method descrition
3. render - see method description
********************************************************************************************/


import React, { Component } from 'react';
import * as api from '../utils/api';
import { convertDate } from '../utils/dateconverter';
import * as actions from '../actions/';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import Comments from './Comments';
import VotingOptions from './VotingOptions';
import NewComment from './NewComment';
import Modal from 'react-modal';
import FontAwesome from 'react-fontawesome';




class PostDetail extends Component {


	constructor(){
		super();
		this.deletePost = this.deletePost.bind(this);

		this.state = {
			redirect: false,
		}


	}
	/*********************************************************
	Name: componentWillMount
	Description:
	binds our react-modal with the 'body' html element,
	preloads our redux store with the size of the viewport,
	and gets the data and comments of the post passed by
	react-router-dom props. We also bind our viewport size handler
	the window 'resize' event.
	*********************************************************/
	componentWillMount(){
		Modal.setAppElement('body');
		this.handleWindowSizeChange();
		const { match: { params } } = this.props;
		this.props.getPostDetails(params.post_id);
		this.props.getComments(params.post_id);
		window.addEventListener('resize', this.handleWindowSizeChange);

	}

	/*********************************************************
	Name: componentWillUnmount
	Description:
	remove our event listener from the window object.
	*********************************************************/
	componentWillUnmount(){
		window.removeEventListener('resize', this.handleWindowSizeChange);
	}

	/*********************************************************
	Name: deletePost
	Parameters: none
	returns: nothing
	Description:
	makes a DELETE request to our api-server, and updates
	the redux store accordingly
	*********************************************************/
	deletePost(){
		const { id } = this.props.currentPost;

		this.props.deletePost(id).then(()=>{
			this.setState({redirect: true});
		});
	}


	/*********************************************************
	Name: handleWindowSizeChange
	Parameters: none
	returns: nothing
	Description:
	Our resize event handler, which updates our redux store
	accordingly.
	*********************************************************/
	handleWindowSizeChange(){
		this.props.viewportChange(window.innerWidth);
	}


	/*********************************************************
	Name: render
	Description:
	Renders our post data as passed by the react-router-dom,
	otherwise if this post is not found on the api-server,
	a simple message shows to the user indicating that this post
	doesn't exist

	Child Components:
	1.VotingOptions- props: currentPost <boolean>, isMedium <boolean>,
	2. Comments - props: isMedium <boolean>


	*********************************************************/
	render(){
		const {id, title, body, author, date, voteScore, comments} = this.props.currentPost;
		const { redirect } = this.state;
		const { width } = this.props;
		const isMedium = (width <= 899);


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

			<div className="grid postdetail-container">
				<div className="row">
					<div className="col-12 col-12-medium">
						<Link to="/" className="large-button">Take me back</Link>
					</div>
				</div>
				<div className="row">
					<div className="col-12 col-12-medium">
						<h2 className="postdetail-header"> >> {title}</h2>
					</div>
				</div>
				<div className="row">
					<div className="col-6 col-6-medium">
						<span>Date of creation: {date}</span>
					</div>
					<div className="col-6 col-6-medium">
						<span className="right">score: {voteScore}</span>
					</div>
				</div>
				<div className="row">
					<div className="col-6 col-6-medium">
						By: <span className="author">{author}</span>
					</div>
					<div className="col-6 col-6-medium">
						<span className="right">
							<VotingOptions id={id} currentPost={true} isMedium={isMedium}/>
						</span>
					</div>
				</div>
				<div>
					<div className="row">
						<div className="col-6 col-12-medium">
							<Link to={`../edit/${id}`}><FontAwesome name="edit" className="editbutton"/></Link>
							<button onClick={this.deletePost} className="deletebutton"><FontAwesome name="trash-alt"/></button>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-12 col-12-medium">
						<p className="postdetail-body">{body}</p>
					</div>
				</div>
				<div className="comments-grid">
					<div className="row">
						<div className="col-6 col-12-medium">
							<h3 className="comments-section-title">Comments: {comments.length}</h3>
						</div>
						<div className="col-6 col-12-medium">
							<span className="right"><NewComment isMedium={isMedium}/></span>
						</div>
					</div>
					<div className="row">
						<Comments isMedium={isMedium}/>
					</div>
				</div>
			</div>



			)
	}

}


function mapStateToProps({ currentPost, viewportSize }){
	return {
		width: viewportSize.width,
		currentPost: {
			...currentPost,
			date: convertDate(new Date(currentPost.timestamp))
		}
	}
}

function mapDispatchToProps(dispatch){
	return {
		viewportChange: (width)=>{
			dispatch(actions.viewportChange(width))
		},
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


	}
}





export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)