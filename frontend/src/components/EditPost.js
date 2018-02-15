import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as api from '../utils/api'
import * as actions from '../actions/';
import { Link } from 'react-router-dom';
import SelectCategory from './SelectCategory';
import { Redirect } from 'react-router-dom';



class EditPost extends Component {


	constructor(){
		super();
		this.state = {
			errors: [],
			redirect: false,
			id: '',
			author: '',
			category: '',
			title: '',
			body: ''
		}

		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleAuthorChange = this.handleAuthorChange.bind(this);
		this.handleBodyChange = this.handleBodyChange.bind(this);
		this.handleCategoryChange = this.handleCategoryChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);

	}



	componentWillMount(){
		this.handleWindowSizeChange();
		window.addEventListener('resize', this.handleWindowSizeChange);
		const { match: { params }} = this.props;

		this.props.getPostDetails(params.post_id).then(()=> {
			const { id, title, author, category, body } = this.props.currentPost;
			this.setState({id: id, title: title, category: category, author: author, body: body});
		})

	}

	componentWillUnmount(){
		window.removeEventListener('resize', this.handleWindowSizeChange);
	}

	handleWindowSizeChange(){
		this.props.viewportChange(window.innerWidth);
	}



	handleTitleChange(event){
		this.setState({title: event.target.value});
	}
	handleAuthorChange(event){
		this.setState({author: event.target.value});
	}
	handleBodyChange(event){
		this.setState({body: event.target.value});
	}
	handleCategoryChange(event){
		this.setState({category: event.target.value});
	}

	handleSubmit(e){
		e.preventDefault();

		const {  id, title, body } = this.state;

		api.updatePost(id, title, body).then(()=>{
			this.setState({redirect: true})
		});


	}


	render(){

 		const { errors } = this.state;
 		const { redirect } = this.state;

 		const { width } = this.props;
		const isMedium = (width <= 899);

		if(isMedium){
			console.log("not-normal")
			return(
				<div className="grid main-container mobile-grid">
	 				<div className="row">
	 					<header className="col-12-medium header">
	 						<h1>My New Post</h1>
	 					</header>
	 				</div>
	 				<div className="row">
	 					<div className="col-12-medium">
		 					<Link to="/" className="large-button back-button">Go back</Link>
	 					</div>
	 				</div>
	 				<div className="row">
	 					<div className="col-12-medium">
		 					<form className="grid mobile_form" onSubmit={this.handleSubmit}>
		 						{errors.map(error=>(
		 							<p key={error}>Error: {error}</p>
		 						))}

		 						<div className="row">
		 							<div className="col-12-medium">
		 								<label className="title">Category:</label>
		 							</div>
		 						</div>
		 						<div className="row">
		 							<div className="col-12-medium">
		 								<SelectCategory handler={this.handleCategoryChange} value={this.state.category}/>
		 							</div>
		 						</div>
		 						<div className="row">
		 							<div className="col-12-medium">
		 								<label className="title">Title:</label>
		 							</div>
		 						</div>
		 						<div className="row">
		 							<div className="col-12-medium">
		 								<input
	 									id="title"
	 									value={this.state.title}
	 									onChange={this.handleTitleChange}
	 									name="title" type="text" />
		 							</div>
		 						</div>
		 						<div className="row">
		 							<div className="col-12-medium">
		 								<label className="author">Author:</label>
		 							</div>
		 						</div>
		 						<div className="row">
		 							<div className="col-12-medium">
		 								<input id="author"
	 									   value={this.state.author}
	 									   onChange={this.handleAuthorChange}
	 									   type="text"></input>
		 							</div>
		 						</div>
		 						<div className="row">
		 							<div className="col-12-medium">
		 								<label className="body">Body:</label>
		 							</div>
		 						</div>
		 						<div className="row">
		 							<div className="col-12-medium">
		 								<textarea id="body"
	 										  value={this.state.body}
	 										  onChange={this.handleBodyChange}
	 										  />
		 							</div>
		 						</div>
		 						<div className="row">
		 							<div className="col-12-medium">
		 								<button className="large-button">Submit</button>
		 							</div>
		 						</div>
		 					</form>
		 					{redirect && (
		 						<Redirect to="/"/>
		 					)}
	 					</div>
	 					<div className="col-3">
						</div>
	 				</div>
 				</div>
			)
		}
		else {
			return(
 			<div className="grid main-container">
 				<div className="row">
 					<header className="col-12 header">
 						<h1>My New Post</h1>
 					</header>
 				</div>
 				<div className="row">
 					<div className="col-3">
 					</div>
 					<div className="col-6">
 					<form className="grid input_form" onSubmit={this.handleSubmit}>
	 						{errors.map(error=>(
	 							<p key={error}>Error: {error}</p>
	 							))}
	 						<div className="row">
	 							<div className="col-3">
	 								<Link to="/" className="large-button back-button">Go back</Link>
	 							</div>
	 							<div className="col-9">
	 							</div>
	 						</div>
	 						<div className="row">
	 							<div className="col-3">
	 								<label className="title">Category:</label>
	 							</div>
	 							<div className="col-9">
	 								<SelectCategory handler={this.handleCategoryChange} value={this.state.category}/>
	 							</div>
	 						</div>
	 						<div className="row">
	 							<div className="col-3">
	 								<label className="title">Title:</label>
	 							</div>
	 							<div className="col-9">
	 								<input
	 									id="title"
	 									value={this.state.title}
	 									onChange={this.handleTitleChange}
	 									name="title" type="text" />
	 							</div>
	 						</div>
	 						<div className="row">
	 							<div className="col-3">
	 								<label className="author">Author:</label>
	 							</div>
	 							<div className="col-9">
	 								<input id="author"
	 									   value={this.state.author}
	 									   onChange={this.handleAuthorChange}
	 									   type="text"></input>
	 							</div>
	 						</div>
	 						<div className="row">
	 							<div className="col-3">
	 								<label className="body">Body:</label>
	 							</div>
	 							<div className="col-9">
	 								<textarea id="body"
	 										  value={this.state.body}
	 										  onChange={this.handleBodyChange}
	 										  rows="10" cols="30"/>
	 							</div>
	 						</div>
	 						<div className="row">
	 							<div className="col-3">

	 							</div>
	 							<div className="col-9">
	 								<button className="large-button">Submit</button>
	 							</div>
	 						</div>
	 				</form>
 					{redirect && (
 						<Redirect to="/"/>
 					)}
 					</div>
 				</div>
 			</div>
 			)
		}

 	}s
}



function mapStateToProps({ currentPost, viewportSize }){
	return {
		currentPost: currentPost,
		width: viewportSize.width
	}
}


function mapDispatchToProps(dispatch){
	return {
		viewportChange: (width)=>{
			dispatch(actions.viewportChange(width))
		},
		getPostDetails: (id)=>(
			api.getPostDetails(id).then((post)=>{
				dispatch(actions.loadPost(post))
			})
		)
	}
}



export default connect(mapStateToProps, mapDispatchToProps)(EditPost)