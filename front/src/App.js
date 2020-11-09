import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Contact from './component/pages/contact' 
import Navbar from './component/componentUi/Navbar/navbar'
import Home from './component/pages/home'
import Register from './component/pages/user/userRegister'
import Login from './component/pages/user/userLogin'
import './App.css';
//redux
import {Provider } from 'react-redux' 
import store from './store'


function App(props) {
  
  return (
    <Provider store={store}>
      <Router>
            <Navbar/>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/contact" component={Contact}/>
            </Switch>
      </Router>
    </Provider>
  );
}

export default App;
