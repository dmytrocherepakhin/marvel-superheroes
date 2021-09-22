import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import rootReducer from './store/reducers/rootReducer';
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from 'redux-saga';
import { sagaWatcher } from './store/sagas/rootSaga';

const saga = createSagaMiddleware();

export const store = createStore(
  rootReducer,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)(applyMiddleware(saga))
);

saga.run(sagaWatcher);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
