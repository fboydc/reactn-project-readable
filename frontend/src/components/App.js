import React, { Component } from 'react';
import '../css/framework.css'
import CategoryView from './CategoryView';
import PostDetail from './PostDetail';
import NewPost from './NewPost';
import EditPost from './EditPost';
import { Route, Switch } from 'react-router-dom';



class App extends Component {



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

