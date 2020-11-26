import {  createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const initialState =
{
  tasks: [],
  mode: Number(localStorage.getItem('mode')) || null,
  refresher: 0
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  
  reducers: {

    logout: (state, action) => {
      localStorage.removeItem('token')
      state.tasks = []
      return state
    },
    
    add: (state, action) => {
      let x = Math.round(Math.random()*10000000000)
      let obj = {
        id: x,  
        text: action.payload,
        checked: false
      }
      let config = {
        headers: {
          'todo-token': localStorage.getItem('token') || null,
        }
      }
      if (!localStorage.getItem('mode')) {localStorage.setItem('mode', 0)}
      if (state.tasks.findIndex(el => el.text === obj.text) === -1){
        axios.post('/add', {id: obj.id, text: obj.text, checked: obj.checked}, config)
        state.tasks.push(obj)
      }
      return state
    },

    remove: (state, action) => {
      let config = {
        headers: {
          'todo-token': localStorage.getItem('token') || null,
        }
      }
      let id = action.payload; 
      axios.delete('/del/' + String(id), config)
      state.tasks = state.tasks.filter((item) => item.id !== id)
      return state
    },

    markAsChecked: (state, action) => {
      let config = {
        headers: {
          'todo-token': localStorage.getItem('token') || null,
        }
      }
      let id = action.payload[0];
      let checked = action.payload[1]
      axios.put('/update/'+String(id)+'/'+String(checked), config)
      let requiredIndex = state.tasks.findIndex(x => x.id === id)
      state.tasks[requiredIndex].checked = checked
      return state
    },

    clearCompleted: state => {
      let config = {
        headers: {
          'todo-token': localStorage.getItem('token') || null,
        }
      }
      axios.delete('/delcompleted', config)
      state.tasks = state.tasks.filter((el) => el.checked === false)
      return state
    },

    checkAll: (state, action) => {
      let config = {
        headers: {
          'todo-token': localStorage.getItem('token') || null,
        }
      }
      if (action.payload > 0) {
        axios.put('/checkall', config)
        state.tasks.forEach(el => el.checked = true)
      }
      else {
        axios.put('/uncheckall', config)
        state.tasks.forEach(el => el.checked = false)
      }
      return state
    },

    all: state => {
      localStorage.setItem('mode', 0)
      state.mode = 0
      return state
    },

    todo: state => {
      localStorage.setItem('mode', 1)
      state.mode = 1
      return state
    },

    completed: state => {
      localStorage.setItem('mode', 2)
      state.mode = 2
      return state
    },
    
    getData: (state, action) => {
      const x = action.payload
      state.tasks = x
      return state
    },
    
    
  }
});

export const { loginRender, getData, add, remove, markAsChecked, checkAll, clearCompleted, all, todo, completed } = todoSlice.actions;

export default todoSlice.reducer;