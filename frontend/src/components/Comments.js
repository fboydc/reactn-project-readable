import React, { Component } from 'react';
import '../css/framework.css';
import { connect } from 'react-redux';



class Comments extends Component {

	render(){
		const { comments } = this.props

		if(comments.length > 0){
			return(
			<div className="col-12">
								{
									comments.map((comment)=>(
										<div className="grid" key={comment.id}>
											<div className="row">
												<div className="col-12">
													<strong>{comment.author}:</strong>
												</div>
											</div>
											<div className="row">
												<div className="col-12 comment-body">
													<em>{comment.body}</em>
												</div>
											</div>
											<hr/>
										</div>

									))
								}
			</div>
		    );
		}else{
			return (<p>No comments available</p>)
		}

	}
}

function mapStateToProps({ currentPost: { comments }}){
	console.log("comments", comments)
	return {
		comments: comments
	}

}



export default connect(mapStateToProps, null)(Comments);