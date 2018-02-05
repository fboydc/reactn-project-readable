import React, { Component } from 'react';
import Modal from 'react-modal';
import * as actions from '../actions';
import { validate } from '../utils/commentsvalidator';
import { connect } from 'react-redux';
import * as api from '../utils/api';




class CommentFormModal extends Component {

	constructor(){
		super();
		this.state = {
			errors: []
		}

		this.handleNewCommentSubmit = this.handleNewCommentSubmit.bind(this);
	}



	


	handleNewCommentSubmit(){
		const { commentAuthor, commentBody  } = this.props.data;
		const { id, addComment } = this.props;
		const { closeModal } = this.props.handlers; 
		console.log("here inside", this.props);
		const errors = validate(commentAuthor, commentBody);

		if(errors.length > 0){
			this.setState({ errors })
			return;
		}

		addComment(id, commentBody, commentAuthor);
		closeModal();

	}


	render(){

		const { edit } = this.props;
		const { open, commentAuthor, commentBody } = this.props.data;
		const { errors }= this.state;
		const { onAuthorChange, onBodyChange, closeModal } = this.props.handlers;

		if(this.props.edit){



			return(
				<Modal isOpen={open} className="postdetail-newcomment-modal" overlayClassName="postdetail-newcomment-overlay">
				<div className="grid">
						<div className="row">
							<div className="col-12">
								<button className="right" onClick={closeModal}>close</button>
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
								<span><input type="text" value={commentAuthor} onChange={onAuthorChange}/></span>
							</div>
						</div>
						<div className="row">
							<div className="col-5">
								<span className="right">body:</span>
							</div>
							<div className="col-7">
								<span><textarea
								rows="10" cols="30" type="text" value={commentBody} onChange={onBodyChange}/></span>
							</div>
						</div>
						<div className="row">
							<div className="col-5">

							</div>
							<div className="col-7">
								<button className="button" onClick={this.handleNewCommentSubmit}>add</button>
							</div>
						</div>
					</div>
			</Modal>
				)
			
		}

		const { handleNewCommentSubmit, close } = this.props
		return(
			<Modal isOpen={open} className="postdetail-newcomment-modal" overlayClassName="postdetail-newcomment-overlay">
				<div className="grid">
						<div className="row">
							<div className="col-12">
								<button className="right" onClick={closeModal}>close</button>
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
								<span><input type="text" value={commentAuthor} onChange={onAuthorChange}/></span>
							</div>
						</div>
						<div className="row">
							<div className="col-5">
								<span className="right">body:</span>
							</div>
							<div className="col-7">
								<span><textarea
								rows="10" cols="30" type="text" value={commentBody} onChange={onBodyChange}/></span>
							</div>
						</div>
						<div className="row">
							<div className="col-5">

							</div>
							<div className="col-7">
								<button className="button" onClick={this.handleNewCommentSubmit}>add</button>
							</div>
						</div>
					</div>
			</Modal>
			);
	}
}





function mapDispatchToProps(dispatch){
	return {
		addComment: (id, body, author) => (
			api.addComment(id, body, author).then((comment)=>{
				dispatch(actions.addComment(comment))
			})
		)
	}
}

export default connect(null, mapDispatchToProps)(CommentFormModal);