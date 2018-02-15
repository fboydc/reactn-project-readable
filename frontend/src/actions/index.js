export const FILTER_POSTS = 'FILTER_POSTS';
export const UP_VOTE_POST = 'UP_VOTE_POST';
export const DOWN_VOTE_POST = 'DOWN_VOTE_POST';
export const FEED_POSTS = 'FEED_POSTS';
export const FEED_CATEGORIES = 'FEED_CATEGORIES';
export const FEED_COMMENTS = 'FEED_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const UP_VOTE_COMMENT = 'UP_VOTE_COMMENT';
export const DOWN_VOTE_COMMENT = 'DOWN_VOTE_COMMENT';
export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const LOAD_POST = 'LOAD_POST';
export const LOAD_COMMENT = 'LOAD_COMMENT';
export const DELETE_POST = 'DELETE_POST';
export const SORT_BY_SCORE = 'SORT_BY_SCORE';
export const SORT_BY_TIMESTAMP = 'SORT_BY_TIMESTAMP';
export const VIEWPORT_CHANGE = 'VIEWPORT_CHANGE';



export const addPost = ({id, timestamp, title, body, author, category, voteScore, deleted, commentCount}) => {
	return {
		type: ADD_POST,
		id,
		timestamp,
		title,
		body,
		author,
		category,
		voteScore,
		deleted,
		commentCount
	}
}


export const editPost = ({id, category, title, author, body})=> {
	return {
		type: EDIT_POST,
		id,
		category,
		title,
		author,
		body
	}
}

export const loadPost = ({id, category, title, author, body, timestamp, voteScore})=> {
	return {
		type: LOAD_POST,
		id,
		category,
		title,
		author,
		body,
		timestamp,
		voteScore

	}
}

export const deletePost = (id)=>{
	return {
		type: DELETE_POST,
		id
	}
}



export const filterPosts = (category)=> {
	return {
		type: FILTER_POSTS,
		category
	}
}

export const sortByScore = (posts)=> {
	return {
		type: SORT_BY_SCORE,
		posts
	}
}

export const sortByTimestamp = (posts)=> {
	return {
		type: SORT_BY_TIMESTAMP,
		posts
	}
}

export const upvotePost = (id)=> {
	return {
		type: UP_VOTE_POST,
		id
	}
}

export const downvotePost = (id)=> {
	return {
		type: DOWN_VOTE_POST,
		id
	}
}

export const feedPosts = (posts) => {
	return {
		type: FEED_POSTS,
		posts
	}
}

export const feedCategories = (categories) => {
	return {
		type: FEED_CATEGORIES,
		categories
	}
}

export const feedComments = (comments)=> {
	return {
		type: FEED_COMMENTS,
		comments

	}
}

export const addComment = (comment)=> {
	return {
		type: ADD_COMMENT,
		comment
	}
}

export const deleteComment = (id)=> {
	return {
		type: DELETE_COMMENT,
		id
	}
}

export const loadComment = (comment)=> {
	return {
		type: LOAD_COMMENT,
		comment
	}
}

export const editComment = (comment)=>{
	return {
		type: EDIT_COMMENT,
		comment
	}
}

export const upvoteComment = (id)=> {
	return {
		type: UP_VOTE_COMMENT,
		id
	}
}


export const downvoteComment = (id)=> {
	return {
		type: DOWN_VOTE_COMMENT,
		id
	}
}



export const viewportChange = (width)=>{
	return {
		type: VIEWPORT_CHANGE,
		width
	}
}






