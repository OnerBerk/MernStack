import React, { Fragment, useState} from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

  import Contact from './component/pages/contact/contact' 
  import Navbar from './component/componentUi/Navbar/navbar'
  import Home from './component/pages/home/home'
  import Register from './component/pages/user/userRegister'
  import Login from './component/pages/user/userLogin'
  import Logout from './component/pages/user/userLogout'
  import Place from './component/pages/place/place'

  import ProtectedRoute from './auth/ProtectedRoute/protectedRoute'

  import './App.css';

  //redux
  import {Provider } from 'react-redux' 
  import store from './store'
  export const UserContext = React.createContext()


  function App(props) {

    const [userData, setUserData] = useState({
      token:undefined,
      user:undefined
    })

    

    return (
      <Provider store={store}> 
      <UserContext.Provider value={{userData, setUserData}}>
        <Router>
          <Fragment>
              <Navbar/>
            <section className="container">
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/logout" component={Logout}/>
                <Route exact path="/contact" component={Contact}/>
                <ProtectedRoute exact path="/places" component={Place}/>
              </Switch>
              </section>
              </Fragment>
        </Router>
    </UserContext.Provider>
      </Provider>
    );
  }

  export default App;
