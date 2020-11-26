import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from "./app/Components/Todoapp";
import Notfound from "./app/Components/notfound";
import Login from './app/Components/Login';
import Register from './app/Components/Register';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'; 

function App() {
  const aut = localStorage.getItem('token') || null
  let start 
    if (aut) start = Main 
    else start = Login

  return (
    <Router>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={start} />
        <Route exact path="/" component={start} />
        <Route exact path="/404" component={Notfound} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  )
}
  
 


export default App;
