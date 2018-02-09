import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';
import SortPosts from './SortPosts';
import { Link } from 'react-router-dom';



class MobileMenu extends Component {

	constructor(){
		super();
		this.toggleMenu = this.toggleMenu.bind(this);
	}

	toggleMenu(){
		const {className} = this.menuContainer;
		console.log(className);
		if(className === "row hidden"){
			this.menuContainer.className = "row responsive";
			this.sortsRow.className = "row responsive";
			this.newPost.className = "row responsive";
		}else{
			this.menuContainer.className = "row hidden";
			this.sortsRow.className = "row";
			this.newPost.className = "row";
		}
	}




	render(){
		return(
			<div className="grid mobile-menu" ref={(input)=>{this.mobileMenu = input;}}>
				<div className="row">
					<div className="col-12-medium">
						<button className="hamburger-icon" onClick={this.toggleMenu}><FontAwesome name="bars"/>
						</button>
					</div>
				</div>
				<div className="row hidden" ref={(input)=>{this.menuContainer = input;}}>
					<div className="col-12-medium">
						<div className="row" ref={(input)=>{this.sortsRow = input}}>
							<ul className="col-12-medium">
								<li className="menuitems"><SortPosts /></li>
							</ul>
						</div>
						<div className="row" ref={(input)=>{this.newPost = input}}>
							<div className="col-12-medium">
								<Link className="mobile-menu-link" to="/newpost">add new</Link>
							</div>
						</div>
					</div>
				</div>

			</div>
		);
	}
}

export default MobileMenu;