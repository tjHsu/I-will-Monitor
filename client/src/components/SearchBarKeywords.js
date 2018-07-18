import React, { Component } from 'react';
// import axios from 'axios'
// import logo from './logo.svg';
// import './App.css';
// import {Route, Link} from 'react-router-dom'

class SearchBarKeywords extends Component {
  render(){
    return (
      <div>
      <h2>My Keyword Search</h2>
      <form onSubmit={this.props.onAdd} action="">
      <input type="text" value={this.props.searchText} name="searchTextKeyword" placeholder="put keywords" onChange={this.props.onChangeText} />
      <input type="submit" value="Add location" />
      </form>
      </div>
    )    
  }

}

export default SearchBarKeywords;