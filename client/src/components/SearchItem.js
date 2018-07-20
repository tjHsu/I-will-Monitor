import React, { Component } from 'react';

class SearchItem extends Component {
  render() {                
    return (

      <button type="button" className={this.props.styleButton} name={this.props.tag} onClick={this.props.onDelete}>
  {this.props.tag} <span className="badge badge-light" name={this.props.tag} onClick={this.props.onDelete}>x</span>
</button>
      

      
    );
  }
}

export default SearchItem;

      {/* <tr>
        <td>{this.props.todo.text}</td>
        <td>{this.props.todo._owner.name}</td>
        <td><button onClick={this.props.onDelete}>Delete</button></td>
      </tr>  */}