/*******************************************************************************************
Component: Posts.js
Description:
Contains the layout for our posts widget in the category view page.

Defined Properties:
none

Class Methods:
none

React Methods:
1. componentWillReceiveProps - see method description
2. componentWillMount - see method description
3. render - see method description - see method description
********************************************************************************************/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import  * as api from '../utils/api';
import * as actions from '../actions/';
import { convertDate } from '../utils/dateconverter'
import PostLine from './PostLine';

class Posts extends Component {




   /***********************************************
   Name: componentWillReceiveProps
   Description:
   changes the displayed posts depending on the category
   props received as passed in the CategoryView component.
   ***********************************************/
   componentWillReceiveProps(nextProps){
     const { category } = nextProps;

      if (category !== this.props.category){
        if(!category){
          this.props.getAllPosts();
        }else{
          this.props.getPostsByCategory(category);
        }

     }


   }


   /***********************************************
   Name: componentWillMount
   Description:
   Gets the proper posts depending on the props passed
   by react-router-dom (depending on the url typed in
   the browser).
   ***********************************************/
	 componentWillMount(){

      const { category } = this.props;
      if(category)
    	   this.props.getPostsByCategory(category);
      else
        this.props.getAllPosts();

  	}


  /***********************************************
   Name: render
   Description:
   Renders our post widget if any results are retrieved,
   otherwise a message is shown to the user indicating
   the lack of any.
   ***********************************************/
	render(){

		const { posts } = this.props;
    if(posts.length === 0){
      return (
              <div>
                <p>
                  Sorry, no data available
                </p>
              </div>
              );
    }
		return (

			<ul className="posts">
				{ posts.map((post)=>{
					return <PostLine key={post.id} post={post} isSmall={this.props.isSmall}/>
				})}
			</ul>
		)
	}
}


function mapStateToProps({ posts }) {
  const { entries } = posts;
  console.log("entries", entries);
  return {
    posts: entries.map((post)=>(

         {
    	   ...post,
    	   date: convertDate(new Date(post.timestamp))
        }
      )
    )
  }
}

function mapDispatchToProps(dispatch) {
  return{
    getAllPosts: ()=> api.getPosts().then((posts)=> {
      dispatch(actions.feedPosts(posts));
      dispatch(actions.sortByTimestamp(posts));
    }),
    getPostsByCategory: (category)=> api.getCategoryPosts(category).then((posts)=>{
      dispatch(actions.feedPosts(posts));
    }),

  }

}



export default connect(mapStateToProps, mapDispatchToProps)(Posts);