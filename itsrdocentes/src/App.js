import React from 'react';
import {Provider} from 'react-redux';
import store from './store';
import Home from './home';

const App = () =>  (
    <Provider store={store}>
     
   <Home/>
    
    </Provider>
    
  );


export default App;
