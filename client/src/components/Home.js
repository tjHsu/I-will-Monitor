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

    // this.handleAdd = this.handleAdd.bind(this)
    // this.handleDelete = this.handleDelete.bind(this)
  }

  handleFirstDemo(){
    console.log("Handle first search")
    this.setState({
      keywords:["kawahi"],
      locations:["San Antonio","Toronto","Madrid"]
    },
    this.handleDoSearch 
    )
  }

  handleSecondDemo(){
    console.log("Handle second search")
    this.setState({
      keywords:["Brexit"],
      locations:["London","Seoul","Melbourne"]
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
        {/* <h2>Home</h2> */}
        {/* <p>This is a sample project with the MERN stack</p> */}
        {/* <img src={backgroundPicture} className="App-logo" alt="logo" /> */}
        {/* <p><font color="white">This is some text!</font></p> */}

<div className="container"></div>
<div className="row">

<div className="col-sm-4 col-xs-6 col-lg-4 ml-5 mt-5">
  <div className="square">
    <div>
      <div>
        <div>
          <p><strong><font size="6" face="arial" >I wonder how popular is <br/> Keyword:"Kawhi" <br/> in <br/> Location:"Toronto" </font></strong></p>
          <Button color="secondary" outline size="lg" className="float-right mr-5" onClick={this.handleFirstDemo} >Explore</Button>{' '}
        </div>
      </div>
    </div>
  </div>
</div>
<div className="col-sm-4 col-xs-6 col-lg-6 ml-5 mt-5">
    
<div className="row mt-5 ">
{this.state.isLoadingState===1? 
        <Loading isLoading={this.state.isLoadingState===1} >
      </Loading> : null
          
      }
<div className="col-sm-1 col-lg-2">
      <DiscreteColorLegend
          height={400}
          width={150}
          items={this.state.items}
        />
        </div> 
      <div className="col-sm-2 col-lg-4">
        <ParallelCoordinates
        animation

          data={this.state.data}
          tickFormat={t => wideFormat(t)}

          startingAngle={0}
          margin={50}
          /* colorRange={['#172d47', '#911116', '#998965']} */
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
          }}></ParallelCoordinates>
          </div>
          </div>



</div>
</div>
<br/>
<div className="row ">
<div className="col-sm-4 col-xs-6 ml-5 mt-5">
  <div className="square">
    <div>
      <div>
        <div>
          <p><strong><font size="6" face="arial" >I wonder how popular is <br/> Keyword:"Brexit" <br/> in <br/> Location:"London" </font></strong></p>
          <Button color="secondary" outline size="lg" className="float-right mr-5" onClick={this.handleSecondDemo} >Explore</Button>{' '}
          </div>
        
      </div>
    </div>
  </div>
</div>

{/* <div className="col-sm-4 col-xs-6 col-lg-6 ml-5 mt-5">
    
    <div className="row mt-5">
    {this.state.isLoadingState===1? 
            <Loading isLoading={this.state.isLoadingState===1} >
          </Loading> : null
              
          }
    <div className="col-sm-1 col-lg-2">
          <DiscreteColorLegend
              height={400}
              width={150}
              items={this.state.items}
            />
            </div> 
          <div className="col-sm-2 col-lg-4">
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
              }}></ParallelCoordinates>
              </div>
              </div>
    
    
    
    </div> */}





</div>
<div className="row " style={{height:600}}>
<div className="col-sm-12 col-xs-12 mx-auto my-auto" >
<p><strong><font size="7" face="arial" >Want to explore more behind the trend? </font></strong></p>
<Link className="btn btn-outline-dark btn-lg" to="/playground">Go to Demo and Try</Link> 
</div>
</div>
      </div>
    );
  }
}

export default Home;
