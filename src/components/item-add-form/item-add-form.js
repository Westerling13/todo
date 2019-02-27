import React, { Component } from 'react';
import './item-add-form.css';

export default class ItemAddForm extends Component {

  render() {
    const { onAdded } =this.props;

    return (
      <div className='item-add-form'>
        <button
          className='btn btn-outline-primary'
          onClick={ () => onAdded('Do something useful') }>
          Add new item
        </button>
      </div>
    );
  }
};
