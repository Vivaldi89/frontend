import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from "./app/Components/Todoapp";
import Notfound from "./app/Components/notfound";
import Testpage from "./app/Components/Testpage";
import { BrowserRouter as Router, Route } from 'react-router-dom'; //, Switch, Link, Redirect

function App() {
  
  
  return (
    <Router>
      <Route exact path="/" component={Main} />
      <Route exact path="/test" component={Testpage} />
      {/* <Route component={Notfound} /> */}
    </Router>
    
  );
}

export default App;
