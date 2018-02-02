import React, { Component } from 'react';
import SelectCategory from './SelectCategory';


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
	 							<div className="col-6">
	 								<label className="title">Category:</label>
	 							</div>
	 							<div className="col-6">
	 								<SelectCategory handler={handleCategory} value={category}/>
	 							</div>
	 						</div>
	 						<div className="row">
	 							<div className="col-6">
	 								<label className="title">Title:</label>
	 							</div>
	 							<div className="col-6">
	 								<input
	 									id="title"
	 									value={title}
	 									onChange={handleTitle}
	 									name="title" type="text" />
	 							</div>
	 						</div>
	 						<div className="row">
	 							<div className="col-6">
	 								<label className="author">Author:</label>
	 							</div>
	 							<div className="col-6">
	 								<input id="author"
	 									   value={author}
	 									   onChange={handleAuthor}
	 									   type="text"></input>
	 							</div>
	 						</div>
	 						<div className="row">
	 							<div className="col-6">
	 								<label className="body">Body:</label>
	 							</div>
	 							<div className="col-6">
	 								<textarea id="body"
	 										  value={body}
	 										  onChange={handleBody}
	 										  rows="10" cols="30"/>
	 							</div>
	 						</div>
	 						<div className="row">
	 							<div className="col-12">
	 								<button>Create/Edit</button>
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
	 							<div className="col-6">
	 								<label className="title">Category:</label>
	 							</div>
	 							<div className="col-6">
	 								<SelectCategory handler={handleCategory} edit={this.props.edit} value={category}/>
	 							</div>
	 						</div>
	 						<div className="row">
	 							<div className="col-6">
	 								<label className="title">Title:</label>
	 							</div>
	 							<div className="col-6">
	 								<input
	 									id="title"
	 									value={title}
	 									onChange={handleTitle}
	 									name="title" type="text" />
	 							</div>
	 						</div>
	 						<div className="row">
	 							<div className="col-6">
	 								<label className="author">Author:</label>
	 							</div>
	 							<div className="col-6">
	 								<input id="author"
	 									   value={author}
	 									   disabled
	 									   onChange={handleAuthor}
	 									   type="text"></input>
	 							</div>
	 						</div>
	 						<div className="row">
	 							<div className="col-6">
	 								<label className="body">Body:</label>
	 							</div>
	 							<div className="col-6">
	 								<textarea id="body"
	 										  value={body}
	 										  onChange={handleBody}
	 										  rows="10" cols="30"/>
	 							</div>
	 						</div>
	 						<div className="row">
	 							<div className="col-12">
	 								<button>Create/Edit</button>
	 							</div>
	 						</div>
	 			</form>
			);
		}

	}
}

export default PostForm