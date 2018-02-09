import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';
import * as actions from '../actions';
import { connect} from 'react-redux';



class MobileSort extends Component {

	constructor(){
		super();
		this.sortByDate = this.sortByDate.bind(this);
		this.sortByScore = this.sortByScore.bind(this);
	}


	sortByDate(){
		const { posts } = this.props;
		this.props.sortByDate(posts);

	}

	sortByScore(){
		const { posts } = this.props;
		this.props.sortByScore(posts);
	}

	render(){
		return(
			<span><button type="button" onClick={this.sortByDate}><FontAwesome name="calendar"/></button>
			<button type="button" onClick={this.sortByScore}><FontAwesome name="star" /></button></span>
		);
	}
}


function mapStateToProps({posts}){
	const { entries } = posts;
	return {
		posts: entries
	}
}


function mapDispatchToProps(dispatch){
	return {
		sortByScore: (posts)=>{
			dispatch(actions.sortByScore(posts));
		},
		sortByDate: (posts)=>{
			dispatch(actions.sortByTimestamp(posts));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileSort);