/*******************************************************************************************
Component: Comments.js
Description:
Shows all the comments for a single post.

Defined Properties:
-none


Class Methods:
-none

React Methods:
2. render - see method description

********************************************************************************************/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentLine from './CommentLine';



class Comments extends Component {

	/*******************************************************************
	Name: render
	Description:

	********************************************************************/
	render(){
		const { comments } = this.props
		const {isMedium} = this.props

		if(comments.length > 0){
			return(
			<div className="col-12 col-12-medium">

				{
					comments.map((comment)=>(
						<CommentLine comment={comment} key={comment.id} isMedium={isMedium}/>

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