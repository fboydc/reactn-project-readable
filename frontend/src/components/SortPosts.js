import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../css/sortposts.css';



class SortPosts extends Component {

	constructor(){
		super();
		this.state = {
			value: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSort = this.handleSort.bind(this);
	}

	componentWillMount(){
		this.setState({value: 'timestamp'});

	}



	handleChange(e){
		this.setState({value: e.target.value});


	}

	handleSort(){
		const { value } = this.state;
			const { posts } = this.props

			console.log("value", value);

			if(value === 'voteScore'){
				console.log("here in votescore");
				this.props.sortByScore(posts)
			}

			if(value === 'timestamp'){
				console.log("here in timestamp");
				this.props.sortByDate(posts)
			}
	}

	render(){

		return(
			<span className="sort-container">
				<span>
					<label className="sort-label">Criteria:</label>
				</span>
				<span className="sort-select">
					<select value={this.state.value} onChange={this.handleChange} className="selectbox">
						<option value="timestamp">date</option>
						<option value="voteScore">score</option>
					</select>
				</span>
				<span>
					<button onClick={this.handleSort} className="large-button">sort</button>
				</span>
			</span>
			)
	}
}


function mapStateToProps({ posts }){
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


export default connect(mapStateToProps, mapDispatchToProps)(SortPosts)