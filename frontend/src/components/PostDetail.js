import React, { Component } from 'react';
import * as api from '../utils/api';
import { convertDate } from '../utils/dateconverter';
import * as actions from '../actions/';
import { connect } from 'react-redux';
import  '../css/framework.css';
import  '../css/postdetail.css';
import  '../css/comments.css';
import { Link } from 'react-router-dom';



class PostDetail extends Component {

	componentWillMount(){
		const { match: { params } } = this.props;
		this.props.getPostDetails(params.post_id);
		this.props.getComments(params.post_id);

	}



	render(){
		const {title, body, author, date, voteScore, comments} = this.props.currentPost;

		console.log("comments", comments);
		return(
			<div className="postdetail-grid">
				<div className="row">
					<div className="col-12">
						<Link to="/">Take me back</Link>
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<h2 className="postdetail-header"> >> {title}</h2>
					</div>
				</div>
				<div className="row">
					<div className="col-6">
						<span>Date of creation: {date}</span>
					</div>
					<div className="col-6">
						<span className="right">score: {voteScore}</span>
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						By: <span className="author">{author}</span>
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<p className="postdetail-body">{body}</p>
					</div>
				</div>
				<div className="comments-grid">
					<div className="row">
						<div className="col-6">
							<h3 className="comments-section-title">Comments</h3>
						</div>	
						<div className="col-6">
							<span className="right">add</span>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							
								{
									comments.map((comment)=>(
										<div className="grid">
										<div className="row">
											<div className="col-12">
												<strong>{comment.author}:</strong>
											</div>
										</div>
										<div className="row">
											<div className="col-12">
												<em>{comment.body}</em>
											</div>
										</div>
										<hr/>
										</div>

									))
								}
							
						</div>
					</div>
				</div>
			</div>


			)
	}

}


function mapStateToProps({ currentPost }){
	return {
		currentPost: {
			...currentPost,
			date: convertDate(new Date(currentPost.timestamp))
		}
	}
}

function mapDispatchToProps(dispatch){
	return {
		getPostDetails: (id)=> {
			api.getPostDetails(id).then((post)=>{
				dispatch(actions.loadPost(post));
			})
		},
		getComments: (id) => {
			api.getComments(id).then((comments)=>{
				dispatch(actions.feedComments(comments));
			})
		}
	}
}





export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)