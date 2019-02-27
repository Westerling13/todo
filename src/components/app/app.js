import React, { Component } from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';
import './app.css';

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink cup of tea'),
      this.createTodoItem('Make awesome app'),
      this.createTodoItem('Have a lunch')
    ],
    term: ''
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      return { todoData: todoData.filter((el) => el.id !== id) };
    });
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    };
  }

  addItem = (text) => {
    this.setState(({ todoData }) => {
      let newItem = this.createTodoItem(text);

      let newData = [ ...todoData, newItem ];

      return {
        todoData: newData
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id ===id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ];
  }

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };
    });
  };

  onSearchChange = (term) => {
    this.setState({ term });
  };

  search(items, term) {
    if (term.length === 0) return items;
    return items.filter( (el) => el.label.toLowerCase().includes(term.toLowerCase()) );
  }

  render() {
    const { todoData, term } = this.state;

    const visibleItems = this.search(todoData, term);
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className='todo-app'>
        <AppHeader toDo={ todoCount } done={ doneCount }/>
        <div className='top-panel d-flex'>
          <SearchPanel
            onSearchChange={  this.onSearchChange } />
          <ItemStatusFilter />
        </div>
        <TodoList
          todos={ visibleItems }
          onDeleted={ this.deleteItem }
          onToggleImportant = { this.onToggleImportant }
          onToggleDone = { this.onToggleDone }/>
        <ItemAddForm
          onAdded={ this.addItem }/>
      </div>
    );
  }
};
