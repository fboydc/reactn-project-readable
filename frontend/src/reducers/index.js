import { combineReducers } from 'redux';

import {
	ADD_POST,
	EDIT_POST,
	LOAD_POST,
	FILTER_POSTS,
	UP_VOTE_POST,
	DOWN_VOTE_POST,
	FEED_POSTS,
	FEED_CATEGORIES,
	FEED_COMMENTS,
	ADD_COMMENT,
	DELETE_COMMENT,
	DELETE_POST,
	SORT_BY_SCORE,
	SORT_BY_TIMESTAMP
} from '../actions';





const posts = (state = { entries: []} , action) => {
	switch(action.type) {
		case ADD_POST: {
			const { id, timestamp, title, body, author, category} = action
			return {
				...state,
				entries: [
					...state.entries,
						{
							id: id,
							timestamp: timestamp,
							title: title,
							body: body,
							author: author,
							category: category,
							voteScore: 0,
							deleted: false,
							commentCount: 0
						}
				]
			}
		}

		case EDIT_POST: {
			const { id, category, title, author, body } = action;
			return {
				...state,
				entries: state.entries.map((entry) =>{
					if(entry.id === action.id){
						return{
							...entry,
							id: id,
							category: category,
							title: title,
							author: author,
							body: body
						}
					}

					return
				})
			}
		}

		case DELETE_POST: {
			const { id } = action;
			return{
				...state,
				entries: state.entries.filter((entry)=>(entry.id !== id))
			}
		}

		case FEED_POSTS:
			return {
				...state,
				entries: action.posts
			}


		case UP_VOTE_POST:
			return {
				...state,
				entries: state.entries.map((entry)=>{
					if (entry.id === action.id){
						const newScore = entry.voteScore + 1;
						return {
							...entry,
							voteScore: newScore
						}
					}


					return entry


				})
			}
		case DOWN_VOTE_POST:
			return {
				...state,
				entries: state.entries.map((entry)=>{
					if (entry.id === action.id){
						const newScore = entry.voteScore - 1;
						return {
							...entry,
							voteScore: newScore
						}
					}


					return entry;

				})
			}
		case SORT_BY_SCORE:
			const scoreSorted = [...state.entries];
			scoreSorted.sort((a,b)=>{
				if(a.voteScore > b.voteScore)
					return -1
				if(a.voteScore < b.voteScore)
					return 1;
				return 0;
			});

			return{
				...state,
				entries: scoreSorted
			}


		case SORT_BY_TIMESTAMP:
			const dateSorted = [...state.entries];
			dateSorted.sort((a,b)=>{
				if(a.timestamp > b.timestamp)
					return -1;
				if(a.timestamp < b.timestamp)
					return 1;
				return 0;
			});

			return {
				...state,
				entries: dateSorted
			}


		default:
			return state
	}



}


const categories = (state = { entries: []}, action)=>{
	switch(action.type){
		case FEED_CATEGORIES:
			return {
				...state,
				entries: action.categories
			}
		case FILTER_POSTS:
			return {
				...state,
				entries: state.entries.map((entry) => (entry.category === action.category))
			}
		default:
			return state
	}
}

const currentPost = (state = { comments: []}, action) => {
	switch(action.type){
		case LOAD_POST:
			const { id, category, title, author, body, timestamp, voteScore} = action;

			return {
				...state,
				id: id,
				category: category,
				timestamp: timestamp,
				title: title,
				author: author,
				body: body,
				voteScore: voteScore,
			}
		case FEED_COMMENTS:

			return {
				...state,
				comments: action.comments

			}
		case ADD_COMMENT:

			return{
				...state,
				comments:[
					...state.comments,
					{
						...action.comment
					}
				]
			}

		case DELETE_COMMENT:

			return {
				...state,
				comments: state.comments.filter((comment)=>(comment.id != action.id))
			}

		default:
			return state
	}
}




export default combineReducers({
	posts,
	categories,
	currentPost
})

