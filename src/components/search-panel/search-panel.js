import React, { Component } from 'react';
import './search-panel.css';

export default class SearchPanel extends Component {



  render() {
    const { onSearch } = this.props;
    
    return (
      <input
        type='text'
        className='form-control search-input'
        placeholder='Type to search'
        onChange={ (e) => onSearch(e.target.value) } />
    );
  }
};
