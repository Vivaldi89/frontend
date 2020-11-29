import React from 'react';
import { connect } from 'react-redux';
import { add }  from '../todoSlice';
import { useState } from 'react';

const mapDispatch = {add}

const AddTodo = ({add}) => {
  const [todoText, setTodoText] = useState('');
  const onChange = e => setTodoText(e.target.value);
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!todoText.trim()) {
            return;
          }
          add(todoText);
          setTodoText('');
        }}
      >
        <input className="inp" placeholder="Enter your task name here" value={todoText} onChange={onChange} />
      </form>
    </div>
  )
}

export default connect(null, mapDispatch)(AddTodo);