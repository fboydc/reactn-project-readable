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

	openModal(){
		this.setState({open: true});
		this.props.getCommentDetails(this.props.id).then(()=>{
			const { author, body } = this.props.currentComment;
			this.setState({author, body});
		});




	}

	closeModal(){
		this.setState({author:'', body: '', open: false, errors: []});

	}


	onBodyChange(e){
		this.setState({body: e.target.value})
	}


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



	render(){

		const {errors} = this.state;
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