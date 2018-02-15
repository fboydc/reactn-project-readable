/*******************************************************************************************
Component: App.js
Description:
The purpose of this component is to map each view with it's corresponding URL.

Defiend Properties:
None

React Methods:
1. render - see method description
********************************************************************************************/

import React, { Component } from 'react';
import '../css/framework.css'
import CategoryView from './CategoryView';
import PostDetail from './PostDetail';
import NewPost from './NewPost';
import EditPost from './EditPost';
import { Route, Switch } from 'react-router-dom';
import '../css/categorylist.css';
import '../css/header.css';
import '../css/main.css';
import '../css/framework.css';
import '../css/newpost.css';
import  '../css/postdetail.css';
import  '../css/comments.css';
import '../css/modal.css';
import '../css/sortposts.css';
import '../css/mobile.css';



class App extends Component {


  /********************************************************************
  Name: render
  Description:
  Routes our url to the correspding URL.

  Child Components
  1. Route - CategoryView
  2. Route - NewPost
  2. Route - CategoryView
  2. Route - EditPost
  2. Route - PostDetail

  *********************************************************************/
  render() {
    return (
      <Switch>
       <Route exact path="/" component={CategoryView} />
       <Route exact path="/newpost" component={NewPost} />
       <Route exact path="/:category" component={CategoryView} />
       <Route exact path="/edit/:post_id" component={EditPost}/>
       <Route exact path="/:category/:post_id" component={PostDetail}/>

      </Switch>
    );
  }
}

export default App;

