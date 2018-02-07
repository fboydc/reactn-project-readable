import React, { Component } from 'react';
import Categories from './Categories';
import SortPosts from './SortPosts';
import NewPost from './NewPost';
import { Link } from 'react-router-dom';
import '../css/framework.css'
import Posts from './Posts';
import '../css/header.css';
import '../css/main.css';

class CategoryView extends Component {



	render(){
		const { match: { params }} = this.props;

		return(
		<div className="grid main-container">
			<div className="row">
	          <header className="col-12 header">
	            <h1>Check Out These Posts</h1>
	          </header>
	        </div>
	        <div className="row">
	        	<div className="col-3">
	        	</div>
	        	<div className="col-9">
		        	<SortPosts />
	        		<span><Link className="large-button" to="/newpost">add new</Link></span>
	        	</div>
	        </div>
	        <div className="row">
	          <div className="col-3">
	              <Categories />
	          </div>
	          <div className="col-9">
	          	  <Posts category={params.category}/>
	          	  <div>

	          	  </div>
	          </div>
	        </div>
	      </div>
        );
	}
}

export default CategoryView;