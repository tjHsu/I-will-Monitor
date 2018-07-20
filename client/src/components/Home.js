import React, { Component } from 'react';
import { format } from 'd3-format';
import { Button } from 'reactstrap';
import { Route, Link, Switch } from 'react-router-dom';
import './Home.css';
import ReactLoading from 'react-loading';
import api from '../api';
import { DiscreteColorLegend, ParallelCoordinates } from 'react-vis';
import Loading  from 'react-loading-animation';
import { UncontrolledAlert } from 'reactstrap';
import { UncontrolledCarousel } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import './PlayGround.css';




// import { AppRegistry, Text } from 'react-native';
// import backgroundPicture from '../background.jpg';
const basicFormat = format('.1r');
const wideFormat = format('.1r');

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      keywords:[],
      locations:[],
      stats: [],
      data: [],
      // domain: [{ name: "DE", domain: [0, 100] }, { name: "IT", domain: [0, 100] }, { name: "FR", domain: [0, 100] }],
      domain: [],
      items: [],
      searchTextKeyword: '',
      searchTextLocation: '',
      searchText:'',
      isLoadingState: 0,
      isQueryNone:undefined
    }
    // this.handleChange = this.handleChange.bind(this)
    this.handleDoSearch = this.handleDoSearch.bind(this)
    this.handleFirstDemo = this.handleFirstDemo.bind(this)
    this.handleSecondDemo = this.handleSecondDemo.bind(this)
    this.handleThirdDemo = this.handleThirdDemo.bind(this)

    // this.handleAdd = this.handleAdd.bind(this)
    // this.handleDelete = this.handleDelete.bind(this)
  }

  handleFirstDemo(){
    console.log("Handle first search")
    this.setState({
      keywords:["kawahi","Dončić"],
      locations:["San Antonio","Toronto","Madrid"]
    },
    this.handleDoSearch 
    )
  }

  handleSecondDemo(){
    console.log("Handle second search")
    this.setState({
      keywords:["ANGULAR","REACT","VUE"],
      locations:["SYDNEY","MELBOURNE"]
    },
    this.handleDoSearch 
    )
  }

  handleThirdDemo(){
    console.log("Handle third search")
    this.setState({
      keywords:["台北","東京"],
      locations:["BERLIN","TAIPEI","TOKYO"]
    },
    this.handleDoSearch 
    )
  }



  handleDoSearch() {
    console.log("Let us do search")
    this.setState({
      isLoadingState:1
    })
    let quearyString = ""
    quearyString+="keyword="
    for (let i = 0; i < this.state.keywords.length; i++) {
      quearyString+=`${this.state.keywords[i]},`
    }
    quearyString=quearyString.slice(0,-1)

    quearyString+="&location="
    for (let j = 0; j < this.state.locations.length; j++) {
      quearyString+=`${this.state.locations[j]},`
    }
    quearyString=quearyString.slice(0,-1)

    console.log("DEBUG query", quearyString);

    // this.props.history.push("/playground?"+quearyString)
    
    if(quearyString==="keyword&location"){
      console.log("No query get")
      this.setState({
        isLoadingState:0,
        isQueryNone:1
      })
      
    }
else{
    // quearyString+="keyword="+this.state.keywords+"&location="+this.state.locations
    api.findStat(quearyString)
      .then(stats => {
        console.log("Found data: ",stats)
        function compare(a, b) {
          if (a.keyword < b.keyword)
            return -1;
          if (a.keyword > b.keyword)
            return 1;
          return 0;
        }
        stats.sort(compare)

        let Data = []
        let newItem = []
        let obj = {}
        let temp = stats[0].keyword;

        let Domain = []
        let domainObj = {}
        obj["name"] = temp
        newItem.push(temp)
        
        for (let i = 0; i < stats.length; i++) {
          console.log("inside forloop")
          if (stats[i].keyword !== temp) {
            Data.push(obj)
            temp = stats[i].keyword
            newItem.push(temp)
            obj = {}
            obj["name"] = temp
          }
          obj[stats[i].location] = stats[i].count
          if(Domain.filter(x=>x.name.includes(stats[i].location)).length===0){
          domainObj = {}
          domainObj["name"] = stats[i].location
          domainObj['domain'] = [0, 100]
          Domain.push(domainObj)
          }
        }
        Data.push(obj)
        // console.log("DEBUG Data befor setstate: ",Data)
        // console.log("DEBUG Domain befor setstate: ",Domain)
        // console.log("DEBUG newItem befor setstate: ",newItem)
        // console.log("DEBUG stats befor setstate: ",stats)
        //////////////////
        this.setState({
          data: Data,
          domain: Domain,
          items: newItem,
          stats: stats,
          isLoadingState:0,
          isQueryNone:0
        })
        console.log("Debug Data:", this.state.data)
        console.log("Debug Domain:", this.state.domain)
        console.log("Debug Item:", this.state.items)
      })
      .catch(err => console.log(err))
  

    }
    }







  render() {      
              
    return (
<div className="Home" >
<Container>
  <Row >
    <Col xs="4">
      <Row className="mt-5">
        <div className="my-square">
        <p><strong>
              I wonder how popular is 
              <br/> 
                <span class="item-12">"Kawhi"</span>
                <span class="item-22">"Dončić"</span>
              <br/> in 
              <br/>
                <span class="item-13">MADRID</span>
                <span class="item-23">SANANTONIO</span>
                <span class="item-33">TORONTO</span>
              <br/>
              
            </strong></p>
            <Button color="dark" outline size="lg" className="float-right" onClick={this.handleFirstDemo} >Explore</Button>{' '}
        </div>
      </Row>      
      <Row className="mt-5">
        <div className="my-square">
        <p><strong>
              I wonder how popular is 
              <br/> 
                <span class="item-13">"ANGULAR"</span>
                <span class="item-23">"REACT"</span>
                <span class="item-33">"VUE"</span>
              <br/> in 
              <br/>
                <span class="item-12">Sydney</span>
                <span class="item-22">MELBOURNE</span>
              <br/>
              
            </strong></p>
            <Button color="dark" outline size="lg" className="float-right" onClick={this.handleSecondDemo} >Explore</Button>{' '}
        </div>
      </Row>
      <Row className="mt-5">
        <div className="my-square">
        <p><strong>
              I wonder how popular is 
              <br/> 
                <span class="item-12">"台北"</span>
                <span class="item-22">"東京"</span>
              <br/> in 
              <br/>
                <span class="item-13">BERLIN</span>
                <span class="item-23">TAIPEI</span>
                <span class="item-33">TOKYO</span>
              <br/>
              
            </strong></p>
            <Button color="dark" outline size="lg" className="float-right" onClick={this.handleThirdDemo} >Explore</Button>{' '}
        </div>
      </Row>
    </Col>
    <Col xs="1">
      <Row className="sticky-square">
        <div className="legend-box">
          <DiscreteColorLegend
              height={400}
              width={150}
              items={this.state.items}
          />
        </div>
      </Row>
    </Col>
    <Col xs="6" >
      <Row className="sticky-square">
        <div className="chart-box">
          <div className="loader">
            {this.state.isLoadingState===1? 
              <Loading isLoading={this.state.isLoadingState===1} >
            </Loading> : null
            }
          </div>
          <ParallelCoordinates
            animation
              data={this.state.data}
              tickFormat={t => wideFormat(t)}

              startingAngle={0}
              margin={50}
              domains={this.state.domain}
              showMarks
              width={800}
              height={400}
              style={{
                axes: {
                  line: {},
                  ticks: {},
                  text: {}
                },
                labels: {
                  fontSize: 14
                },
                line: {
                  strokeOpacity: 1
                }
              }}>
            </ParallelCoordinates>
          </div>
        </Row>
 
    </Col>
  </Row>
    <Row className="mt-5 mb-5">
      <div className="mx-auto mt-5 demo-text-div">
        <p><strong>Want to explore more behind the trend?</strong></p>
        <Link className="btn btn-outline-dark btn-lg" to="/playground">Go to Demo and Try</Link> 
      </div>
    </Row>
    {/* <Row>  
      <div className="mx-auto demo-button-div">
        <Link className="btn btn-outline-dark btn-lg" to="/playground">Go to Demo and Try</Link> 
      </div>
    </Row> */}
</Container>
</div>
    );
  }
}

export default Home;
