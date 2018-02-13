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
			errors: [],
			width: window.innerWidth
		}

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.onAuthorChange = this.onAuthorChange.bind(this);
		this.onBodyChange = this.onBodyChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
	}

	openModal(){
		this.setState({open: true})
	}

	closeModal(){
		this.setState({open: false, author: '', body: '', errors: []})
	}

	onAuthorChange(e){
		this.setState({author: e.target.value});
	}

	onBodyChange(e){
		this.setState({body: e.target.value});
	}

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

	componentWillMount() {
		window.addEventListener('resize', this.handleWindowSizeChange);
	}

	componentWillUnmount(){
		window.removeEventListener('resize', this.handleWindowSizeChange);
	}

	handleWindowSizeChange(){
		this.setState({width: window.innerWidth});
	}


	render(){
		const {errors} = this.state;
		const { width } = this.state;
		const isMedium = (width <= 899);

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