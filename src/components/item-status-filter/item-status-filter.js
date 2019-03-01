import React, { Component } from 'react';
import './item-status-filter.css';

export default class ItemStatusFilter extends Component {

  buttons = [
    { name: 'all', label: 'All', value: null },
    { name: 'active', label: 'Active', value: false },
    { name: 'done', label: 'Done', value: true }
  ];

  render() {
    const { onFiltered, filterValue } = this.props;

    const buttons = this.buttons.map(({ name, label, value }) => {
      const isActive = filterValue === value;
      const clazz = isActive ? 'btn-info' : 'btn-outline-secondary';

      return (
        <button
          className={ 'btn ' + clazz }
          onClick={ () => onFiltered(value)}
          key={ name }>
          { label }
        </button>
      );
    });

    return (
      <div className='btn-group'>
        { buttons }
      </div>
    );
  }
}
