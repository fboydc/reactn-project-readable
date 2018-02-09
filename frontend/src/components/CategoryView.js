import React, { Component } from 'react';
import Categories from './Categories';
import SortPosts from './SortPosts';
import NewPost from './NewPost';
import { Link } from 'react-router-dom';
import Posts from './Posts';
import MobileMenu from './MobileMenu';


class CategoryView extends Component {


	constructor(){
		super();
		this.state = {
			width: window.innerWidth,
		};
		this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
	}

	componentWillMount() {
		window.addEventListener('resize', this.handleWindowSizeChange);
	}

	componentWillUnmount(){
		window.removeEventListener('resize', this.handleWindowSizeChange);
	}

	handleWindowSizeChange(){
		this.setState({width: window.innerWidth});
	}

	render(){
		const { match: { params }} = this.props;
		const { width } = this.state;
		const isMedium = (width <= 899);
		const isSmall = (width <= 600);



		if(isMedium){

			return(
				<div className="grid main-container mobile-grid">
					<div className="row">
			          <header className="col-12 header">
			            <h1>Check Out These Posts</h1>
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
			          </div>
			        </div>
		      	</div>

        	);
        }
	}
}

export default CategoryView;