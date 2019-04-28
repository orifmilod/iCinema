import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

const middleware = [thunk];
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
}) : compose;


const enhancer = composeEnhancers(
    applyMiddleware(...middleware),
  );
const initState = {};
const store = createStore(
    rootReducer, 
    initState,
    enhancer
);

export default store;