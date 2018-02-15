import React, { Component } from 'react';
import { connect } from 'react-redux';
import  * as api from '../utils/api';
import * as actions from '../actions/';
import { convertDate } from '../utils/dateconverter'
import PostLine from './PostLine';

class Posts extends Component {





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


	 componentWillMount(){

      const { category } = this.props;
      if(category)
    	   this.props.getPostsByCategory(category);
      else
        this.props.getAllPosts();

  	}

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