import React from 'react';
import {Provider} from 'react-redux';
import store from './store';
import Home from './home';
export let  ID_USUARIO = 251 ;
export let PERIODO_ACTUAL=7;

const App = () =>  (
    <Provider store={store}>
     
   <Home/>
    
    </Provider>
    
  );


export default App;
