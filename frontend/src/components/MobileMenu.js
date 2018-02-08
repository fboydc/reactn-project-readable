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
		if(className === "mobile-menu-row hidden"){
			console.log("here");
			this.menuContainer.className = "mobile-menu-row responsive";
		}else{
			this.menuContainer.className = "mobile-menu-row hidden";
		}
	}




	render(){
		return(
			<div className="mobile-menu-grid mobile-menu" ref={(input)=>{this.mobileMenu = input;}}>
				<div className="mobile-menu-row">
					<div className="col-12-medium">
						<button className="hamburger-icon" onClick={this.toggleMenu}><FontAwesome name="bars"/>
						</button>
					</div>
				</div>
				<div className="mobile-menu-row hidden" ref={(input)=>{this.menuContainer = input;}}>
					<div className="col-12-medium mobile-menugrid">
						<div className="mobile-menu-row">
							<ul className="col-12-medium">
								<li className="menuitems"><SortPosts /></li>
							</ul>
						</div>
						<div className="mobile-menu-row">
							<div className="col-12-medium">
								<span className="center"><Link className="large-button" to="/newpost">add new</Link></span>
							</div>
						</div>
					</div>
				</div>

			</div>
		);
	}
}

export default MobileMenu;