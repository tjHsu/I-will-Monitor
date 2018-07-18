import React, { Component } from 'react';
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
        <p>This is a sample project with the MERN stack</p>
        {/* <img src={backgroundPicture} className="App-logo" alt="logo" /> */}
        <p><font color="white">This is some text!</font></p>

<div className="container"></div>
<div className="row">

<div className="col-sm-4 col-xs-6 mx-auto">
  <div className="square">
    <div>
      <div>
        <div><p><strong><font color="white" size="6" face="arial" >I wondering how popular is <br/> Keyword:"Kawhi" <br/> in <br/> Location:"Toronto" </font></strong></p></div>
      </div>
    </div>
  </div>
</div>
</div>
<br/>
<div className="row">
<div className="col-sm-4 col-xs-6 mx-auto">
  <div className="square">
    <div>
      <div>
        <div><p><strong><font color="white" size="6" face="arial" >I wondering how popular is <br/> Keyword:"Brexit" <br/> in <br/> Location:"London" </font></strong></p></div>
      </div>
    </div>
  </div>
</div>

</div>


      </div>
    );
  }
}

export default Home;
