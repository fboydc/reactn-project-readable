import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import * as api from '../utils/api';
import { Link } from 'react-router-dom';


class MobileCategories extends Component {

	componentWillMount(){
		this.props.getAllCategories();
	}



	render(){
		const { categories } = this.props

		return (
			<div className="col-12-medium">
				<div className="row">
					<div className="col-12-medium">
						<Link className="mobile-menu-link" to="/" onClick={this.props.toggleMenu}>all</Link>
					</div>
				</div>
					{
					categories.map((category)=> {
						const {name,path} = category;
							return (
								<div className="row" key={path}>
									<div className="col-12-medium">
										<Link to={path} className="mobile-menu-link" onClick={this.props.toggleMenu}>{name}</Link>
									</div>
								</div>
							)
						})
					}
			</div>
		)
	}
}


function mapStateToProps({ categories }){
	const { entries } = categories;
	return {
		 categories: entries
	}
}

function mapDispatchToProps(dispatch){
	return {
		getAllCategories: ()=> api.getCategories().then((categories)=>{
			dispatch(actions.feedCategories(categories))
		}),
    	filterPosts: (category) => dispatch(actions.filterPosts(category))
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(MobileCategories);