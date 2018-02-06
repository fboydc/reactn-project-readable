import React, { Component } from 'react';
import * as api from '../utils/api';
import * as actions from '../actions'
import { connect } from 'react-redux';



class CommentVoting extends Component {


	constructor(){
		super();
		this.upVote = this.upVote.bind(this)
		this.downVote = this.downVote.bind(this)
	}

	upVote(){
		const {id, commentUpVote} = this.props;
		commentUpVote(id);
	}

	downVote(){
		const {id, commentDownVote} = this.props;
		commentDownVote(id);
	}


	render(){
		return (
			<span>
				<button type="button" onClick={this.upVote}>up</button>
				<button type="button" onClick={this.downVote}>down</button>
			</span>

		)
	}

}

function mapDispatchToProps(dispatch){
	return {
		commentUpVote: (id) => {
			api.commentUpVote(id).then((comment)=>{
				dispatch(actions.upvoteComment(id));
			})
		},

		commentDownVote: (id) => {
			api.commentDownVote(id).then((comment)=>{
				dispatch(actions.downvoteComment(id));
			})
		}
	}
}

export default connect(null, mapDispatchToProps)(CommentVoting)


