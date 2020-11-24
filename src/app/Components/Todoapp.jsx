import React from 'react';
import '../../styles/Checkbox.css';
import '../../styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoInput from "./TodoInput";
import Tasks from "./Items";

function Main() {
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

  export default Main;