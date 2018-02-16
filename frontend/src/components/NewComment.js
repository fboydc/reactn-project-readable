/*******************************************************************************************
Component: NewComment.js
Description:
Displays our control for creating a new comment.

Defined Properties:
1. state: used for handling our controlled form
	author <String>
	body <String>
	open <boolean>
	errors <array<String>>
2. openModal  - <Function>
3. closeModal - <Function>
4. onBodyChange - <Function>
5. handleSubmit - <Function>

Class Methods:
1. openModal - see method description
2. closeModal - see method description
3. onBodyChange - see method description
4. handleSubmit - see method description

React Methods:
2. render - see method description
********************************************************************************************/


import React, { Component } from 'react';
import Modal from 'react-modal';
import * as api from '../utils/api';
import * as actions from '../actions';
import { validate } from '../utils/commentsvalidator';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';




class NewComment extends Component {


	constructor(){
		super();
		this.state = {
			open: false,
			author:'',
			body: '',
			errors: []
		}

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.onAuthorChange = this.onAuthorChange.bind(this);
		this.onBodyChange = this.onBodyChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

	}

	/*******************************************************
	Name: openModal
	Returns: nothing
	Parameters: none
	Description:
	sets our state's open property to true, causing a rerender
	and consequently making our modal show. Makes an api request
	to retreive our comment data, and then update our component
	state with the relevant date which in turn updates our comment
	edit form.
	*********************************************************/
	openModal(){
		this.setState({open: true})
	}

	/*******************************************************
	Name: closeModal
	Returns: nothing
	Parameters: none
	Description:
	Reset our component state so that the fields are empty,
	and close our modal by setting our component's state open
	property to false.
	*********************************************************/
	closeModal(){
		this.setState({open: false, author: '', body: '', errors: []})
	}

	/*******************************************************
	Name: onAuthorChange
	Returns: nothing
	Parameters: <Event>
	Description:
	set our state to the current text that the user has typed
	in the author input, so that our controlled component shows
	the actual value.
	*********************************************************/
	onAuthorChange(e){
		this.setState({author: e.target.value});
	}

	/*******************************************************
	Name: onBodyChange
	Returns: nothing
	Parameters: <Event>
	Description:
	set our state to the current text that the user has typed
	in the body input, so that our controlled component shows
	the actual value.
	*********************************************************/
	onBodyChange(e){
		this.setState({body: e.target.value});
	}

	/*******************************************************
	Name: handleSubmit
	Returns: nothing
	Parameters: <Event>
	Description:
	Handles our form submit; if all validations are passed,
	I.E. (no input are empty), then we send the data to our
	api-server, which in turn creates the new post. Consequently,
	we updated our redux post with thew new post.
	*********************************************************/
	handleSubmit(e){
		e.preventDefault();
		const { author, body } = this.state;
		const { id, addComment } = this.props;

		const errors = validate(author, body);

		if(errors.length > 0){
			this.setState({errors})
			return;
		}else{
			addComment(id, body, author);
			this.closeModal();
		}


	}



	/*******************************************************
	Name: render.
	Description:
	Renders the correct html layout depending on the viewport size,
	conditioned my the isMedium prop.
	*********************************************************/
	render(){
		const {errors} = this.state;
		const { width } = this.state;
		const {isMedium} = this.props;

		if(isMedium){
			return (
				<span>
					<button type="button" onClick={this.openModal} className="large-button">comment</button>
					<Modal isOpen={this.state.open} className="postdetail-newcomment-modal" overlayClassName="postdetail-newcomment-overlay">
						<form className="grid" onSubmit={this.handleSubmit}>
							<div className="row">
								<div className="col-12">
									<button className="right close-button" onClick={this.closeModal}><FontAwesome name="times"/></button>
								</div>
							</div>
							<div className="row">
								<div className="col-12">
									<h2 className="centered test">Add comment</h2>
								</div>
							</div>
							<div className="row">
								<div className="col-12">
								{
									errors.map((error)=>(
										<p>{error}</p>
									))
								}
								</div>
							</div>
							<div className="row">
								<div className="col-2-medium">
									<span className="right">author:</span>
								</div>
								<div className="col-10-medium">
									<input type="text" value={this.state.author} onChange={this.onAuthorChange} />
								</div>
							</div>
							<div className="row">
								<div className="col-2-medium">
									<span className="right">body:</span>
								</div>
								<div className="col-10-medium">
									<span><textarea className="comment-input"
									type="text" value={this.state.Body} onChange={this.onBodyChange}/></span>
								</div>
							</div>
							<div className="row">
								<div className="col-2-medium">

								</div>
								<div className="col-10-medium">
									<button className="button submit-modal">add</button>
								</div>
							</div>
						</form>
					</Modal>
				</span>
			)
		}else{
			return(

			<span>
				<button type="button" onClick={this.openModal} className="large-button">comment</button>
				<Modal isOpen={this.state.open} className="postdetail-newcomment-modal" overlayClassName="postdetail-newcomment-overlay">

					<form className="grid" onSubmit={this.handleSubmit}>
						<div className="row">
							<div className="col-12">
								<button className="right close-button" onClick={this.closeModal}><FontAwesome name="times"/></button>
							</div>
						</div>
						<div className="row">
							<div className="col-12">
								<h2 className="centered test">Add comment</h2>
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
								<input type="text" value={this.state.author} onChange={this.onAuthorChange} />
							</div>
						</div>
						<div className="row">
							<div className="col-5">
								<span className="right">body:</span>
							</div>
							<div className="col-7">
								<span><textarea className="comment-input"
								rows="10" cols="30" type="text" value={this.state.Body} onChange={this.onBodyChange}/></span>
							</div>
						</div>
						<div className="row">
							<div className="col-5">

							</div>
							<div className="col-7">
								<button className="button submit-modal">add</button>
							</div>
						</div>
					</form>
				</Modal>
			  </span>);
		}


	}
}


function mapStateToProps({currentPost}){
	return {
		id: currentPost.id
	}
}


function mapDispatchToProps(dispatch){
	return {
		addComment: (id, body, author) => {
			api.addComment(id, body, author).then((comment)=>{
				dispatch(actions.addComment(comment))
			})
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(NewComment)