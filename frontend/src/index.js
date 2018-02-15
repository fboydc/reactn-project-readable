/*******************************************************************************************
Name: index.js
Description:
The point of entry of our application. We encapsulate everything under the BrowserRouter tag,
so that React Router can take care of our url changes/page navigation. We also provide redux to
all of our components so that the can access state.
********************************************************************************************/

import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import reducer from './reducers';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

const store = createStore(
				reducer,
				window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
			);
ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App/>
		</Router>
	</Provider>
	, document.getElementById('root')
	);
registerServiceWorker();
