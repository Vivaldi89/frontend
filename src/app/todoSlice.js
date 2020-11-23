import {  createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const initialState =
{
  tasks: []
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  
  reducers: {

    add: (state, action) => {
      let x = Math.round(Math.random()*10000000000)
      let obj = {
        id: x,  
        text: action.payload,
        checked: false
      }
      if (!localStorage.getItem('mode')) {localStorage.setItem('mode', 0)}
      axios.post('/add', {id: obj.id, text: obj.text, checked: obj.checked})
      state.tasks.push(obj)
      return state
    },

    remove: (state, action) => {
      let id = action.payload; 
      axios.delete('/del/' + String(id))
      return state
    },

    markAsChecked: (state, action) => {
      let id = action.payload[0];
      let checked = action.payload[1]
      axios.put('/update/'+id+'/'+checked)
      return state
    },

    clearCompleted: state => {
      axios.delete('/delcompleted')
    },

    checkAll: (state, action) => {
      if (action.payload > 0) axios.put('/checkall')
      else axios.put('/uncheckall')
    },

    all: state => {
      localStorage.setItem('mode', 0)
    },

    todo: state => {
      localStorage.setItem('mode', 1)
    },

    completed: state => {
      localStorage.setItem('mode', 2)
    },
    
    getData: (state, action) => {
      const x = action.payload
      state.tasks = x
      return state
    },
  }
});

export const { getTasks, getData, add, remove, markAsChecked, checkAll, clearCompleted, all, todo, completed} = todoSlice.actions;

export default todoSlice.reducer;