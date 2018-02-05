import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/framework.css';
import '../css/newpost.css';
import PostForm from './PostForm';
import { validate } from '../utils/validators';
import  * as api from '../utils/api';
import * as actions from '../actions/';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';



class NewPost extends Component {

	constructor(){
		super();
		this.state = {
			errors: [],
			redirect: false,
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


		this.handlers = {
			handleTitle: this.handleTitleChange,
			handleAuthor: this.handleAuthorChange,
			handleBody: this.handleBodyChange,
			handleCategory: this.handleCategoryChange,
			handleSubmit: this.handleSubmit

		}


	}



	handleSubmit(e){
		e.preventDefault();


		const {category, title, author, body } = this.state;

		const errors = validate(category, title, author, body);


		if (errors.length > 0){
			this.setState({ errors });
			return;
		}



		this.props.newPost(title, body, author, category);
		this.setState({redirect: true})
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





 	render(){

 		const { errors } = this.state;
 		const { redirect } = this.state;

 		return(
 			<div className="grid">
 				<div className="row">
 					<header className="col-12 header">
 						<h1>Add New Post</h1>
 					</header>
 				</div>
 				<div className="row">
 					<div className="col-12 back-link">
 						<Link to="/">Go back</Link>
 					</div>
 				</div>
 				<div className="row">
 					<PostForm data={this.state} handlers={this.handlers}/>
 					{redirect && (
 						<Redirect to="/"/>
 					)}
 				</div>
 			</div>
 			)
 	}
}




function mapDispatchToProps(dispatch){
	return {
		newPost: (title, body, author, category)=>api.addPost(title, body, author, category)
		.then((post) => {dispatch(actions.addPost(post))} )

	}

}


export default connect(null, mapDispatchToProps)(NewPost)