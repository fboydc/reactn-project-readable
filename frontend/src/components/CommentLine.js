import React, { Component } from 'react';
import * as api from  '../utils/api';
import * as actions from '../actions';
import { connect } from 'react-redux';
import EditComment from './EditComment';
import CommentVoting from './CommentVoting';
import FontAwesome from 'react-fontawesome';



class CommentLine extends Component {

	constructor(){
		super();
		this.state = {
			commentAuthor: '',
			commentBody: '',
			open: false,
			width: window.innerWidth
		}
		this.deleteComment = this.deleteComment.bind(this);
		this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
	}






	deleteComment(){
		const { id } = this.props.comment;

		this.props.deleteComment(id);

	}

	componentWillMount(){
		window.addEventListener('resize', this.handleWindowSizeChange);
		const { commentAuthor, commentBody} = this.props;
		this.setState({commentAuthor, commentBody});
	}

	componentWillUnmount(){
		window.removeEventListener('resize', this.handleWindowSizeChange);
	}

	handleWindowSizeChange(){
		this.setState({width: window.innerWidth});
	}


	render(){
		const { comment } = this.props

		const { width } = this.state;
		const isMedium = (width <= 899);

		if(isMedium){
			return (
				<div className="grid comment">
					<div className="row">
						<div className="col-12-medium comment-title">
							<strong>{comment.author}:</strong>
							<span className="edit-delete"><EditComment id={comment.id}/>
							<button type="button" onClick={this.deleteComment} className="deletebutton"><FontAwesome name="trash"/></button></span>
						</div>
					</div>
					<div className="row">
						<div className="col-12-medium comment-body">
							<p>{comment.body}</p>
						</div>
					</div>
					<div className="row">
						<div className="col-12-medium">
							<span>Score: {comment.voteScore}</span>
						</div>
					</div>
					<div className="row">
						<div className="col-12-medium">
							<span className="right"><CommentVoting id={comment.id}/></span>
						</div>
					</div>
				</div>
			)
		}else{
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
								<div className="col-12 col-12-medium">
									<span className="right"><EditComment id={comment.id}/></span>
									<span className="right"><button type="button" onClick={this.deleteComment} className="deletebutton"><FontAwesome name="trash"/></button></span>
								</div>
							</div>

							<div className="row">
								<div className="col-12">
									<p>{comment.body}</p>
								</div>
							</div>
							<div className="row">
								<div className="col-6">

									<span>Score: {comment.voteScore}</span>
									<CommentVoting id={comment.id}/>
								</div>
								<div className="col-6">

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