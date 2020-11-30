import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from "./app/Components/Todoapp";
import Notfound from "./app/Components/notfound";
import Login from './app/Components/Login';
import Register from './app/Components/Register';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'; 

function App() {
    return (
      <Router>
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/404" component={Notfound} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" component={Main} />
          <Redirect from="/" to="/home" />
          <Redirect to="/404" />
        </Switch>
      </Router>
    )
}
  
export default App;
