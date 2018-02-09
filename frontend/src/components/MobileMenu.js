import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';
import SortPosts from './SortPosts';
import MobileSort from './MobileSort';
import MobileNewPost from './MobileNewPost';
import MobileCategories from './MobileCategories';
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
		}else{
			this.menuContainer.className = "row hidden";
		}
	}




	render(){
		return(
			<div className="grid mobile-menu" ref={(input)=>{this.mobileMenu = input;}}>
				<div className="row">
					<ul className="col-9-medium">
						<li className="menuitems"><MobileSort /><MobileNewPost /></li>
					</ul>
					<div className="col-3-medium">
						<button className="hamburger-icon" onClick={this.toggleMenu}><FontAwesome name="bars"/>
						</button>
					</div>
				</div>
				<div className="row hidden" ref={(input)=>{this.menuContainer = input;}}>
					<MobileCategories toggleMenu={this.toggleMenu}/>
				</div>
			</div>
		);
	}
}

export default MobileMenu;