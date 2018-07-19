import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import './Home.css';
import ReactLoading from 'react-loading';

// import { AppRegistry, Text } from 'react-native';
import backgroundPicture from '../background.jpg';
class Home extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //   }
  // }
  render() {      
    const markdownStyles = {
      
      text: {
      color: 'red'
      }
    }
              
    return (
      <div className="Home" >
        <h2>Home</h2>
        {/* <p>This is a sample project with the MERN stack</p> */}
        {/* <img src={backgroundPicture} className="App-logo" alt="logo" /> */}
        {/* <p><font color="white">This is some text!</font></p> */}

<div className="container"></div>
<div className="row">

<div className="col-sm-4 col-xs-6 ml-5">
  <div className="square">
    <div>
      <div>
        <div>
          <p><strong><font size="6" face="arial" >I wonder how popular is <br/> Keyword:"Kawhi" <br/> in <br/> Location:"Toronto" </font></strong></p>
          {/* <ReactLoading type={"bubbles"} color={"white"} height={'20%'} width={'20%'} /> */}
        </div>
      </div>
    </div>
  </div>
</div>
</div>
<br/>
<div className="row">
<div className="col-sm-4 col-xs-6 ml-5">
  <div className="square">
    <div>
      <div>
        <div><p><strong><font size="6" face="arial" >I wonder how popular is <br/> Keyword:"Brexit" <br/> in <br/> Location:"London" </font></strong></p></div>
      </div>
    </div>
  </div>
</div>

</div>
<div className="row" style={{height:600}}>
<div className="col-sm-12 col-xs-12 mx-auto my-auto" >
<p><strong><font color="white" size="7" face="arial" >Want to explore more behind the trend? </font></strong></p>
<Link class="btn btn-outline-light btn-lg" to="/playground">Go to Demo and Try</Link> 
</div>
</div>
      </div>
    );
  }
}

export default Home;
