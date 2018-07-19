import React, { Component } from 'react';
// import axios from 'axios'
// import logo from './logo.svg';
// import './App.css';
// import {Route, Link} from 'react-router-dom'

class SearchBarKeywords extends Component {
  render(){
    return (
      <div>
      <form onSubmit={this.props.onAdd} action="" name={this.props.name}>
      <div className="form-group">
        
      <input type="text" className="form-control" value={this.props.searchText} name={this.props.name} placeholder={this.props.hint} onChange={this.props.onChangeText} onBlur={this.props.onAdd} />
      
      {/* <input type="submit" className="btn btn-primary" value="Add this!" name="Add location" /> */}
      </div>
      </form>
      
      </div>
    )    
  }

}

export default SearchBarKeywords;