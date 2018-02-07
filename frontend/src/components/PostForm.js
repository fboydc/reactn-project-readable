import React, { Component } from 'react';
import SelectCategory from './SelectCategory';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';

class PostForm extends Component {

	render(){
		const { errors, category, title, author, body } = this.props.data;
		const { handleCategory, handleTitle, handleAuthor, handleBody, handleSubmit} = this.props.handlers;

			if(!this.props.edit){
					return(

				<form className="grid input_form" onSubmit={handleSubmit}>
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
	 								<SelectCategory handler={handleCategory} value={category}/>
	 							</div>
	 						</div>
	 						<div className="row">
	 							<div className="col-3">
	 								<label className="title">Title:</label>
	 							</div>
	 							<div className="col-9">
	 								<input
	 									id="title"
	 									value={title}
	 									onChange={handleTitle}
	 									name="title" type="text" />
	 							</div>
	 						</div>
	 						<div className="row">
	 							<div className="col-3">
	 								<label className="author">Author:</label>
	 							</div>
	 							<div className="col-9">
	 								<input id="author"
	 									   value={author}
	 									   onChange={handleAuthor}
	 									   type="text"></input>
	 							</div>
	 						</div>
	 						<div className="row">
	 							<div className="col-3">
	 								<label className="body">Body:</label>
	 							</div>
	 							<div className="col-9">
	 								<textarea id="body"
	 										  value={body}
	 										  onChange={handleBody}
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
			);
		}else{
			return(
				<form className="grid input_form" onSubmit={handleSubmit}>
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
	 								<SelectCategory handler={handleCategory} value={category}/>
	 							</div>
	 						</div>
	 						<div className="row">
	 							<div className="col-3">
	 								<label className="title">Title:</label>
	 							</div>
	 							<div className="col-9">
	 								<input
	 									id="title"
	 									value={title}
	 									onChange={handleTitle}
	 									name="title" type="text" />
	 							</div>
	 						</div>
	 						<div className="row">
	 							<div className="col-3">
	 								<label className="author">Author:</label>
	 							</div>
	 							<div className="col-9">
	 								<input id="author"
	 									   value={author}
	 									   onChange={handleAuthor}
	 									   type="text"></input>
	 							</div>
	 						</div>
	 						<div className="row">
	 							<div className="col-3">
	 								<label className="body">Body:</label>
	 							</div>
	 							<div className="col-9">
	 								<textarea id="body"
	 										  value={body}
	 										  onChange={handleBody}
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
			);
		}

	}
}

export default PostForm