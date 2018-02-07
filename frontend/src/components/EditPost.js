import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as api from '../utils/api'
import * as actions from '../actions/';
import { Link } from 'react-router-dom';
import PostForm from './PostForm';
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

		this.handlers = {
			handleTitle: this.handleTitleChange,
			handleAuthor: this.handleAuthorChange,
			handleBody: this.handleBodyChange,
			handleCategory: this.handleCategoryChange,
			handleSubmit: this.handleSubmit

		}

	}



	componentWillMount(){
		const { match: { params }} = this.props;

		api.getPostDetails(params.post_id).then((post)=>{
			this.props.dispatch(actions.loadPost(post))
		}).then(()=> {

			const { id, title, author, category, body } = this.props.currentPost;
			console.log("currentPost", this.props.currentPost);
			this.setState({id: id, title: title, category: category, author: author, body: body});
		})

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

		const { errors, redirect } = this.state;
 		const { category, id } = this.props.currentPost;

 		return(
 			<div className="grid main-container">
 				<div className="row">
 					<header className="col-12 header">
 						<h1>Edit Post</h1>
 					</header>
 				</div>
 				<div className="row">
 					<div className="col-3">
 					</div>
 					<div className="col-6">
	 					<PostForm data={this.state} handlers={this.handlers} edit={true}/>
	 					{redirect && (
	 						<Redirect to={`/${category}/${id}`}/>
	 					)}
 					</div>
 				</div>
 			</div>
		);
	}
}



function mapStateToProps({ currentPost }){
	return {
		currentPost: currentPost
	}
}







export default connect(mapStateToProps, null)(EditPost)