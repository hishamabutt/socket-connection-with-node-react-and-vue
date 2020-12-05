import React, { useEffect } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Login from './Login';
import Test from './Test'

function App() {
 
  return (
    
      <Router>
        <div className='App'>
          <Route exact path='/' component={Login}></Route>
            <Switch>
              <Route exact path='/home' component={Home}></Route>
            </Switch>
        </div>
      </Router>
   
  );
}

export default App;
