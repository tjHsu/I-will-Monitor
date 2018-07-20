import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import './About.css';
import { Container, Row, Col } from 'reactstrap';


class About extends Component {
  
  render() {      
              
    return (
    <div className="About" >
      <Container>
        <Row className="mt-5">
          <div className="mx-auto mt-1 about-text-div">
            {/* <p><strong>Verify your gusee on the trend keyword<br/>using real data from Twitter</strong></p> */}
            <p style={{fontSize:'42px'}}>
              The goal of this application is to provide a way for us to see how popular of certain keywords
              in certain areas are.<br/>
            </p>
          </div>
        </Row>
        <Row className="mt-5">
          <div className="mx-auto mt-1 about-text-div">
            <p style={{fontSize:'42px'}}>
              We can verify our guess on the trend topic with the data sampled from Twitter easily. <br/>
              And besides, we can also have a rough idea of whether we are living in an echo chamber or a filter bubble.
            </p>
          </div>
        </Row>
        <Row className="mt-5">
          <div className="mx-auto mt-1 about-text-div">
            <p style={{fontSize:'42px'}}>
              Method:<br/>
              The data is collected from Twitter API. <br/>
              With every search term, 100 sampled tweets are sent in to the backend.
              Only those happened in the past 24 hours count and were accumulated.<br/>
              In the end, the number shows how many tweets out of 100 happened in the past 24 hours.
            </p>
          </div>
        </Row>
      </Container>
    </div>
    );
  }
}

export default About;
