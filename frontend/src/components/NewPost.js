import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
			body: '',
			width: window.innerWidth
		}

		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleAuthorChange = this.handleAuthorChange.bind(this);
		this.handleBodyChange = this.handleBodyChange.bind(this);
		this.handleCategoryChange = this.handleCategoryChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);


		this.handlers = {
			handleTitle: this.handleTitleChange,
			handleAuthor: this.handleAuthorChange,
			handleBody: this.handleBodyChange,
			handleCategory: this.handleCategoryChange,
			handleSubmit: this.handleSubmit

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

 		const { width } = this.state;
		const isMedium = (width <= 899);

		if(isMedium){
			return(
				<div className="grid main-container">
 				<div className="row">
 					<header className="col-12 header">
 						<h1>My New Post</h1>
 					</header>
 				</div>
 				<div className="row">
 					<div className="col-12">
	 					<PostForm data={this.state} handlers={this.handlers} isMedium={isMedium}/>
	 					{redirect && (
	 						<Redirect to="/"/>
	 					)}
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
 					<PostForm data={this.state} handlers={this.handlers}/>
 					{redirect && (
 						<Redirect to="/"/>
 					)}
 					</div>
 				</div>
 			</div>
 			)
		}

 	}
}




function mapDispatchToProps(dispatch){
	return {
		newPost: (title, body, author, category)=>api.addPost(title, body, author, category)
		.then((post) => {dispatch(actions.addPost(post))} )

	}

}


export default connect(null, mapDispatchToProps)(NewPost)