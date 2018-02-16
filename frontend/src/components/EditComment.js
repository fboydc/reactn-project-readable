/*******************************************************************************************
Component: EditComment.js
Description:
Displays our control and modal for editing our comment's text.

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
import { connect } from 'react-redux';
import {validate} from '../utils/commentsvalidator';
import FontAwesome from 'react-fontawesome';



class EditComment extends Component {

	constructor(){
		super();
		this.state = {
			author: '',
			body: '',
			open: false,
			errors: []

		}

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
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
		this.setState({open: true});
		this.props.getCommentDetails(this.props.id).then(()=>{
			const { author, body } = this.props.currentComment;
			this.setState({author, body});
		});




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
		this.setState({author:'', body: '', open: false, errors: []});

	}


	/*******************************************************
	Name: onBodyChange
	Returns: nothing
	Parameters: <Event>
	Description:
	set our state to the current text that the user has typed
	in the text box, so that our controlled component shows
	the actual value.
	*********************************************************/
	onBodyChange(e){
		this.setState({body: e.target.value})
	}


	/*******************************************************
	Name: handleSubmit
	Returns: nothing
	Parameters: <Event>
	Description:
	Gets the actual values typed by the user from the input and textarea
	fields, and if there are no errors (i.e empty fields), we send
	an api request with the typed values back to the server-api along
	with the comment id. Upon return from this request, we update and
	sync our redux store.
	*********************************************************/
	handleSubmit(e){
		e.preventDefault();
		const {id} = this.props.currentComment;
		const {author,body} = this.state;

		const errors = validate(author, body);

		if(errors.length > 0){
			this.setState({errors})
			return;
		}

		this.props.changeComment(id, body);
		this.closeModal();
	}










	/*******************************************************
	Name: render
	Description:
	renders our button and modal for editing our respective comment.
	Again just like in previous components, depending on the viewport
	size we will render the appropiate html layout (conditioned by our
	passed isMedium property).


	Child Components:
	1.Modal - imported from react-modal package

	*********************************************************/
	render(){

		const {errors} = this.state;
		const {isMedium} = this.props;

		if(isMedium){
			return (<span>
				<button type="button" onClick={this.openModal} className="editbutton"><FontAwesome name="edit"/></button>
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
									type="text" value={this.state.body} onChange={this.onBodyChange}/></span>
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
			</span>)
		}else{
			return(
			<span>
				<button type="button" onClick={this.openModal} className="editbutton"><FontAwesome name="edit"/></button>
				<Modal isOpen={this.state.open} className="postdetail-newcomment-modal" overlayClassName="postdetail-newcomment-overlay">
					<form className="grid" onSubmit={this.handleSubmit}>
						<div className="row">
							<div className="col-12">
								<button className="right close-button" onClick={this.closeModal}><FontAwesome name="times"/></button>
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
								<span><input type="text" value={this.state.author} disabled/></span>
							</div>
						</div>
						<div className="row">
							<div className="col-5">
								<span className="right">body:</span>
							</div>
							<div className="col-7">
								<span><textarea
								rows="10" cols="30" type="text" value={this.state.body} onChange={this.onBodyChange}/></span>
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
			</span>
		);
		}

	}
}

function mapStateToProps({currentComment, currentPost}){
	return {
		currentComment: currentComment,
		currentPost: currentPost

	}
}

function mapDispatchToProps(dispatch){
	return {
		getCommentDetails: (id) => (
			api.getCommentDetails(id).then((comment)=>{
				dispatch(actions.loadComment(comment))
			})
		),
		changeComment: (id, body) => {
			api.editComment(id, body).then((comment)=>(
				dispatch(actions.editComment(comment))

			));
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(EditComment);