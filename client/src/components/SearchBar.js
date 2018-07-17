import React, { Component } from 'react';
// import axios from 'axios'
// import logo from './logo.svg';
// import './App.css';
// import {Route, Link} from 'react-router-dom'

class SearchBar extends Component {
  render(){
    return (
      <div>
      <h2>MySearch</h2>
      <form action="">
      <input type="text" value={this.props.searchText} name="name" placeholder="enter the id" onChange={this.props.onSearch} />
      {/* <input type="submit" value="Search" onClick={this.props.onSearch} placeholder="lala"/> */}
      </form>
      </div>
    )    
  }

}

export default SearchBar;