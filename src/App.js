import React from 'react';
import './styles/App.css';
import TodoInput from "./app/Components/TodoInput";
import Tasks from "./app/Components/Items";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Checkbox.css';


function App() {
  return (
    <div className="row">
      <div className="col-12 cont">
        <div className="App mx-auto">
          <header className="App-header">
            Your todo list
          </header>
          <section  className="border rounded-0 shadow-lg mb-5 bg-white">
            <TodoInput />
            <Tasks />
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
