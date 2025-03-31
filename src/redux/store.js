import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './reducers';

// Redux DevTools setup
const composeEnhancers = 
  (typeof window !== 'undefined' && 
   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || 
  compose;

// Create store 
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store; 

// redux toolkit
// import { configureStore } from '@reduxjs/toolkit'
// import rootReducer from './reducers'
// const store = configureStore({ reducer: rootReducer })