import React, { Component } from 'react';
import * as api from  '../utils/api';
import * as actions from '../actions';
import { connect } from 'react-redux';


class CommentLine extends Component {

	constructor(){
		super();
		this.deleteComment = this.deleteComment.bind(this);
	}


	deleteComment(){
		const { id } = this.props.comment;

		this.props.deleteComment(id);

	}


	render(){
		const { comment } = this.props
		console.log("comment:", comment)
		return(

			<div className="grid">
				<div className="row">
					<div className="col-12">
						<strong>{comment.author}:</strong>
					</div>
				</div>
				<div className="row">
					<div className="col-12 comment-body">
						<div className="grid">
							<div className="row">
								<div className="col-12">
									<button className="right" type="button" onClick={this.deleteComment}>delete</button>
								</div>
							</div>

							<div className="row">
								<div className="col-6">
									<p>{comment.body}</p>
								</div>
							</div>

						</div>
					</div>
				</div>
				<hr/>
			</div>

			)
	}
}

function mapDispatchToProps(dispatch){
	return{
		deleteComment: (id) => {
			api.deleteComment(id).then(()=>{
				dispatch(actions.deleteComment(id))
			})
		}
	}
}

export default connect(null, mapDispatchToProps)(CommentLine)