import React, { Component } from 'react';
// import axios from 'axios'
// import logo from './logo.svg';
// import './App.css';
// import {Route, Link} from 'react-router-dom'

class SearchBarKeywords extends Component {
  render(){
    return (
      <div>
      <h2>{this.props.title}</h2>
      <form onSubmit={this.props.onAdd} action="" name={this.props.name}>
      <div className="form-group">
        
      <input type="text" className="form-control" value={this.props.searchText} name={this.props.name} placeholder="put query" onChange={this.props.onChangeText} />
      <input type="submit" className="btn btn-primary" value="Add this!" name="Add location" />
      </div>
      </form>
      
      </div>
    )    
  }

}

export default SearchBarKeywords;