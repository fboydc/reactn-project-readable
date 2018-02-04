import { guid } from './uuidGenerator'

const _URL = "http://localhost:3001/";
const GETHEADERS = { headers: {'Authorization':'Readable'}};
const POSTHEADERS = { headers: {'Authorization':'Readable',
								'Content-Type':'application/json'}};




//---------------------GET REQUESTS-----------------------

export const getCategories = () => (fetch(`${_URL}categories`, GETHEADERS)
				.then((response) =>(response.json())).then((categories)=>(categories.categories)));

export const getPosts = () => (fetch(`${_URL}posts`, GETHEADERS)
			.then((response)=>(response.json())));

export const getCategoryPosts = (category) => (fetch(`${_URL}${category}/posts`, GETHEADERS)
			.then((response)=>(response.json())));

export const getPostDetails = (id) => (fetch(`${_URL}posts/${id}`, GETHEADERS)
			.then((response)=>(response.json())));

export const getComments = (id) => (fetch(`${_URL}posts/${id}/comments`, GETHEADERS)
			.then((response)=>(response.json())));

export const getCommentDetails = (id) => (fetch(`${_URL}comments/${id}`, GETHEADERS)
			.then((response)=>(response.status === 200 ? response.json() : null)));





//---------------------POST REQUESTS-----------------------

export const addPost = (title, body, author, category) => (

	fetch(`${_URL}posts`, {
	...POSTHEADERS,
	method: 'POST',
	body: JSON.stringify({
				id: guid(),
				timestamp: Date.now(),
				title: title,
				body: body,
				author: author,
				category: category
		  })

		}).then((response)=>(response.json()))
);



export const postUpVote = (id) => (
	fetch(`${_URL}posts/${id}`, {
		...POSTHEADERS,
		method: 'POST',
		body: JSON.stringify({
			option: "upVote"
		})

	}).then((response)=>(response.json()))
);


export const postDownVote = (id) => (
	fetch(`${_URL}posts/${id}`, {
		...POSTHEADERS,
		method: 'POST',
		body: JSON.stringify({
			option: "downVote"
		})

	}).then((response)=>(response.json()))
);

export const addComment = (postid, body, author) => (
	fetch(`${_URL}comments`, {
		...POSTHEADERS,
		method: 'POST',
		body: JSON.stringify({
			id: guid(),
			timestamp: Date.now(),
			body: body,
			author: author,
			parentId: postid
		})
	}).then((response)=>(response.json()))
);

export const commentUpVote = (id) => (
	fetch(`${_URL}comments/${id}`, {
		...POSTHEADERS,
		method: 'POST',
		body: JSON.stringify({
			option: "upVote"
		})
	}).then((response)=>(response.json()))

);

export const commentDownVote = (id) => (
	fetch(`${_URL}comments/${id}`, {
		...POSTHEADERS,
		method: 'POST',
		body: JSON.stringify({
			option: "downVote"
		})
	}).then((response)=>(response.json()))

);


//---------------------PUT REQUESTS-----------------------

export const updatePost = (id, title, body) => (
	fetch(`${_URL}posts/${id}`, {
		...POSTHEADERS,
		method: 'PUT',
		body: JSON.stringify({
			title: title,
			body: body
		})
	}).then((response)=>(response.json()))
);


export const editComment = (id, body) => (
	fetch(`${_URL}comments/${id}`, {
		...POSTHEADERS,
		method: 'PUT',
		body: JSON.stringify({
			timestamp: Date.now(),
			body: body
		})
	}).then((response)=>(response.json()))
);

//-------------------DELETE REQUESTS-------------------------

export const deletePost = (id) => (
	fetch(`${_URL}posts/${id}`, {
		...POSTHEADERS,
		method: 'DELETE'
	}).then((response)=>(response.json()))
);

export const deleteComment = (id) => (
	fetch(`${_URL}comments/${id}`, {
		...POSTHEADERS,
		method: 'DELETE'
	}).then((response)=>(response.json()))
);



