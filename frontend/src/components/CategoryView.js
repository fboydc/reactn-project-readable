/*******************************************************************************************
Component: CategoryView.js
Description:
The root view of our application. In here we see our categories and posts
widget as well as our sorting and "add new" controls.

Defined Properties:
handleWindowSizeChange = <Function>


Class Methods:
1. handleWindowSizeChange - see method description

React Methods:
1. componentWillMount - see description
2. componentWillUnmount - see description
2. render - see method description

********************************************************************************************/

import React, { Component } from 'react';
import Categories from './Categories';
import SortPosts from './SortPosts';
import NewPost from './NewPost';
import { Link } from 'react-router-dom';
import Posts from './Posts';
import MobileMenu from './MobileMenu';
import * as actions from '../actions';
import {connect} from 'react-redux';


class CategoryView extends Component {


	constructor(){
		super();
		this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
	}


	/*******************************************************************
	Name: componentWillMount
	Description:
	We make a call to our handleWindowSizeChange method,
	so that when we initially load the application on a low-res viewport
	we dispatch our viewportChange action and our redux store will be updated
	with our initial viewport size. We also bind this same method as an event
	listener to our window resize event.
	********************************************************************/
	componentWillMount() {
		this.handleWindowSizeChange();
		window.addEventListener('resize', this.handleWindowSizeChange);
	}

	/********************************************************************
	Name: componentWillUnmount
	Description:
	Making sure we remove our event listener after we change views, and
	this component is no longer relevant in the DOM
	********************************************************************/
	componentWillUnmount(){
		window.removeEventListener('resize', this.handleWindowSizeChange);
	}

	/********************************************************************
	Name: handleWindowSizeChange
	Description:
	dispatches our viewportChange action, which in turn updates our viewportSize
	property of our store
	********************************************************************/
	handleWindowSizeChange(){
		this.props.viewportChange(window.innerWidth);
	}


	/***********************************************************************
	Name: render
	Description:
	displays our category view; depending on  the width of the viewport passed from
	our redux store, the appropiate html layout will be displayed. As we tend to
	have more vertical layouts for mobile apps, we have to change our layout
	accordingly.

	Child Components:
	1. Mobile Menu - props: isMedium <boolean> - Only used for mobile devices
	2. Posts - props: category <object>, isSmall <boolean>
	3. SortPosts - props: none
	4. Categories - props: none

	************************************************************************/
	render(){
		const { match: { params }} = this.props;
		const {width} = this.props;
		const isMedium = (width <= 899);
		const isSmall = (width <= 600);



		if(isMedium){

			return(
				<div className="grid main-container mobile-grid">
					<div className="row">
			          <header className="col-12 header">
			            <h1>Cool Posts</h1>
			          </header>
			        </div>
			        <div className="row">
			        	<MobileMenu isMedium={isMedium}/>
			        </div>
			        <div className="row">
			          <div className="col-12-medium">
			          	  <Posts className="posts" category={params.category} isSmall={isSmall}/>
			          </div>
			        </div>
		      	</div>
        	)
        }else{
        	return (
        		<div className="grid main-container">
					<div className="row">
			          <header className="col-12 header">
			            <h1>Cool Posts</h1>
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
			          </div>
			        </div>
		      	</div>

        	);
        }
	}
}

function mapStateToProps({viewportSize}){
	return {
		width: viewportSize.width
	}
}


function mapDispatchToProps(dispatch){
	return {
		viewportChange: (width)=>{
			dispatch(actions.viewportChange(width))
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(CategoryView);