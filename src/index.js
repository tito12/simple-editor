import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import App from './components/App';
import { editor } from './reducers/editor.js';
import { fetchAllImages } from './actions/editor.js';


// Redux store
const store = createStore(editor, applyMiddleware(thunk));

// Fetch all images
store.dispatch(fetchAllImages());

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, 
	document.getElementById('root')
);