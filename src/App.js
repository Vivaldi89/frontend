import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from "./app/Components/Todoapp";
import Notfound from "./app/Components/notfound";
import Login from './app/Components/Login';
import Register from './app/Components/Register';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'; 

function App() {
  const aut = localStorage.getItem('token') || null
    if (aut) {
      return (
        <Router>
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/home" component={Main} />
            <Route exact path="/404" component={Notfound} />
            <Redirect from="/login" to="/home" />
            <Redirect from="/" to="/home" />
            <Redirect to="/404" />
          </Switch>
        </Router>
      )
    }
    else {
      return (
        <Router>
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/404" component={Notfound} />
            <Redirect from="/" to="/login" />
            <Redirect to="/404" />
          </Switch>
        </Router>
  )}
}
  
 


export default App;
