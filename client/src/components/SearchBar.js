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
      <form onSubmit={this.props.onAdd} action="" name={this.props.name}>
      <input type="text" value={this.props.searchText} name={this.props.name} placeholder="put query" onChange={this.props.onChangeText} />
      <input type="submit" name="Add location" />
      </form>
      </div>
    )    
  }

}

export default SearchBarKeywords;