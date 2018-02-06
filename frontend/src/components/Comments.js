import React, { Component } from 'react';
import '../css/framework.css';
import { connect } from 'react-redux';
import CommentLine from './CommentLine';



class Comments extends Component {

	render(){
		const { comments } = this.props

		if(comments.length > 0){
			return(
			<div className="col-12">

				{
					comments.map((comment)=>(
						<CommentLine comment={comment} key={comment.id} />

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
	const sorted = comments;
	return {
		 comments: sorted.sort((a, b)=>{
		 	if(a.timestamp > b.timestamp)
		 		return -1
		 	if(a.timestamp < b.timestamp)
		 		return 1;
		 	return 0;
		 })
	}

}





export default connect(mapStateToProps, null)(Comments);