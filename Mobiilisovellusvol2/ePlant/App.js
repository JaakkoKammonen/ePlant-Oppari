import React from 'react';
import MainNavigation from './Navigation';
import allReducers from './src/components/Redux/02-reducers/allReducers'
import {createStore} from "redux"
import {Provider} from 'react-redux'

export default function App() 
{
  let myStore = createStore(
    allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

  return (
    <Provider store={myStore}>
    <MainNavigation/>
    </Provider>
  );
}
