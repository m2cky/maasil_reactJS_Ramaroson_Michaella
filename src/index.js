import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import thunkMiddleware from 'redux-thunk';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/reducer';

import { composeWithDevTools } from 'redux-devtools-extension'

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
const store= createStore(reducer,composedEnhancer);

const render=()=>{ReactDOM.render(<Provider store={store}><Router>
         <Route component={App} />
      </Router></Provider> , document.getElementById('root'));
}
render();

store.subscribe(render)
