
import React, { Component } from 'react';
import { format } from 'd3-format';
import { Button } from 'reactstrap';
// import SearchBarKeywords from './SearchBarKeywords'
// import SearchBarLocations from './SearchBarLocations'
import SearchBar from './SearchBar'
import SearchItem from './SearchItem'
import api from '../api';
import { DiscreteColorLegend, ParallelCoordinates } from 'react-vis';
// import DiscreteColorLegend from 'legends/discrete-color-legend';
// import TodoItem from './TodoItem';
// import ReactLoading from 'react-loading';
import Loading  from 'react-loading-animation';
import { UncontrolledAlert } from 'reactstrap';
import './PlayGround.css';
import { Container, Row, Col } from 'reactstrap';
// import * as qs from 'query-string';




// const DATA = [
//   { label: 'Mercedes', mileage: 7, price: 10, safety: 8, performance: 9, interior: 7, warranty: 7 },
//   { label: 'Honda', mileage: 8, price: 6, safety: 9, performance: 6, interior: 3, warranty: 9 },
//   { label: 'Chevrolet', mileage: 5, price: 4, safety: 6, performance: 4, interior: 5, warranty: 6 }
// ];

// const ITEMS = [
//   'MERCEDES',
//   'HONDA',
//   'CHEVROLET'
// ]

// const DOMAIN = [
//   { name: 'mileage', domain: [0, 10] },
//   { name: 'price', domain: [2, 16], tickFormat: t => `$${basicFormat(t)}`, getValue: d => d.price },
//   { name: 'safety', domain: [5, 10], getValue: d => d.safety },
//   { name: 'performance', domain: [0, 10], getValue: d => d.performance },
//   { name: 'interior', domain: [0, 7], getValue: d => d.interior },
//   { name: 'warranty', domain: [10, 2], getValue: d => d.warranty }
// ]
// const alert='<Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>I am an alert and I can be dismissed!</Alert>'

const basicFormat = format('.1r');
const wideFormat = format('.1r');

class BasicParallelCoordinates extends Component {
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
    this.handleChange = this.handleChange.bind(this)
    this.handleDoSearch = this.handleDoSearch.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleDemo = this.handleDemo.bind(this)
  }

  handleDelete(event){
    console.log("handleDelete", event.target.value,"attribute", event.target.getAttribute("name"))
    let stringTemp = event.target.getAttribute("name");
    this.setState({
      keywords: this.state.keywords.filter(keyword => !keyword.includes(stringTemp)),
      locations: this.state.locations.filter(location => !location.includes(stringTemp))
    })
    setTimeout(() => {
      console.log("DEBUG after delete state.keywords: ", this.state.keywords) 
      console.log("DEBUG after delete state.locations: ", this.state.locations)  
    }, 1000);
  }

  handleDemo(){
    this.setState({
      keywords:["REACT"],
      locations:["Berlin","PARIS"]
    },
    this.handleDoSearch
    )
  }

  handleAdd(event){
    event.preventDefault()
    console.log("handleAdd", event.target.value, event.target.getAttribute("name"))
    let arrTemp
    let stringTemp = this.state[event.target.getAttribute("name")]
    if (stringTemp !== "" && event.target.getAttribute("name").includes("Location")){
      console.log("location")
      arrTemp = this.state.locations.slice();
      this.setState({
        locations:[...arrTemp,stringTemp],
        searchTextLocation:''
      })
    } else if((stringTemp !== "" && event.target.getAttribute("name").includes("Keyword"))) {
      console.log("keyword")
      arrTemp = this.state.keywords.slice();
      this.setState({
        keywords:[...arrTemp,stringTemp],
        searchTextKeyword:''
      })
    }
    console.log("DEBUG temp string add: ", stringTemp)

    setTimeout(() => {
      console.log("DEBUG state.keywords: ", this.state.keywords) 
      console.log("DEBUG state.locations: ", this.state.locations)  
    }, 1000);
    

  }

  handleChange(event) {
    // event.preventDefault()
    // console.log("handleChange", event.target.value, event.target.getAttribute("name"))
    let objTemp={};
    objTemp[event.target.getAttribute("name")] = event.target.value
    console.log("objTemp:",objTemp)
    this.setState(
      objTemp
    )
    console.log("DEBUG event.target.value: ", event.target.value)
    setTimeout(() => {
      console.log("DEBUG state.searchtextkeyword: ", this.state.searchTextKeyword)
      console.log("DEBUG state.searchtextlocation: ", this.state.searchTextLocation)
    }, 1000);
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

    this.props.history.push("/explore?"+quearyString)
    
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

  componentDidMount() {
    this.setState({
      isLoadingState:1
    })
    // const parsed = qs.parse(this.props.location.search);
    // console.log("BEFORE parsed", this.props.location.search);
    
    // console.log("parsed", parsed);
    // console.log(Object.keys(parsed).length===0)
    // console.log(parsed.constructor === Object)
    //   let tempArr;
    //   let tempArrLocation;
    // if (Object.keys(parsed).length === 0 || parsed.keyword==null || parsed.location==null){
    //   console.log("DEBUG zero object!")
    //    tempArr = [];
    //    tempArrLocation = [];
    // } else {
    //   console.log("DEBUG non zero object!")
      
    //  tempArr = parsed.keyword.split(',')
    //  tempArrLocation = parsed.location.split(',')
    // }
    // console.log("DEBUG tempArr", tempArr)
    
    // let quearyString = ""
    // quearyString+="keyword="
    // for (let i = 0; i < tempArr.length; i++) {
    //   quearyString+=`${tempArr[i]},`
    // }
    // quearyString=quearyString.slice(0,-1)

    // quearyString+="&location="
    // for (let j = 0; j < tempArrLocation.length; j++) {
    //   quearyString+=`${tempArrLocation[j]},`
    // }
    // quearyString=quearyString.slice(0,-1)
    console.log("BEFORE parsed", this.props.location.search);
    let quearyString=this.props.location.search    
    quearyString=quearyString.slice(1)

    console.log("DEBUG query in componentDid mount:", quearyString);

  // console.log("DEBUG locationArr", tempArrLocation)
    
    // if (Object.keys(parsed).length === 0 ||parsed.keyword==null || parsed.location==null){
    //   this.setState({
    //     isLoadingState:0
    //   })

    // }
    if (quearyString.length===0 || quearyString.includes("=&")){
      this.setState({
        isLoadingState:0
      })
    } else {

    api.findStat(quearyString)
    // api.getStat()
      .then(stats => {
        
        ///new data type//
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
        console.log(Data)
        //////////////////
        this.setState({
          data: Data,
          domain: Domain,
          items: newItem,
          stats: stats,
          isLoadingState:0
        })
        console.log("Debug Data:", this.state.data)
        console.log("Debug Domain:", this.state.domain)
        console.log("Debug Item:", this.state.items)
        /////////////////////////////////////////////////////////
      })
      .catch(err => console.log(err))
    } 
 
 
 
    }
  render() {
    // if (this.state.isLoadingState===1) return (<ReactLoading type={"bubbles"} color={"white"} height={'20%'} width={'20%'} />)
    const chartWidth= window.innerWidth>800 ?　800 : 410
    const legendHeight = window.innerWidth>800 ? 400: 80
    return (
      
      <div className="PlayGround">
      <Container>
        <Row>
          <div className="mx-auto mt-5 mb-5">
          <h1>
            Explore the trend of the world
          </h1>
          </div>
        </Row>
        <Row>
          <Col>
            <SearchBar onAdd={this.handleAdd} onChangeText={this.handleChange} hint={"Keyword"} name={"searchTextKeyword"} searchText={this.state.searchTextKeyword} />
          </Col>
          <Col>
            <SearchBar onAdd={this.handleAdd} onChangeText={this.handleChange} hint={"Location"} name={"searchTextLocation"} searchText={this.state.searchTextLocation} />
          </Col>
          <Col>
            <Button onClick={this.handleDoSearch} color="primary" className="btn btn-primary btn-block">Explore</Button>        
            {this.state.isQueryNone===1&&this.state.keywords.length===0? 
              <UncontrolledAlert  color="info" className="mx-auto mt-1">
                Please put keywords before search!
              </UncontrolledAlert>: null 
            }
          </Col>
        </Row>
        <Row>
          <Col>
            {this.state.keywords.map((keyword,i) => {
                return (<SearchItem key={i} tag={keyword} onDelete={this.handleDelete} styleButton={"btn btn-info"} />)
            })}
          </Col>
          <Col>
            {this.state.locations.map((location,i) => {
            return (<SearchItem key={i} tag={location} onDelete={this.handleDelete} styleButton={"btn btn-info"} />)
            })}
          </Col>
          <Col>
          </Col>
        </Row>
        <div className="triangle-up triangle-div"></div>
        <div className="bottom-box">
          {this.state.keywords.length===0 && this.state.data.length==0&&this.state.isLoadingState==0? 
            <Row>
              <div className="mx-auto mt-5 example-box">
              Try searching with keyword REACT in location BERLIN and PARIS<br/>
              <Button color="secondary" outline onClick={this.handleDemo}>Try</Button>
              {/* <h3>Kewords = ["ANGULAR","REACT","VUE"] </h3><br/>
              <h3>Locations = ["BERLIN","PARIS","MADRID"]</h3> */}
              </div>
            </Row> : null
          }
          <Row className="chart-box">
            <div className="loader">
              {this.state.isLoadingState===1? 
                <Loading isLoading={this.state.isLoadingState===1} >
              </Loading> : null
              }
            </div>
            
            <Col md="6" className="mt-5">  
                <ParallelCoordinates
                  animation
                  data={this.state.data}
                  tickFormat={t => wideFormat(t)}
                  startingAngle={0}
                  margin={50}
                  domains={this.state.domain}
                  showMarks
                  width={chartWidth}
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
              
            </Col>
            <Col md="3" className="mt-5">
              <div className="legend-playground-box">
                <DiscreteColorLegend
                height={legendHeight}
                width={150}
                items={this.state.items}
                />
              </div>
            </Col>
          </Row>
        </div>
      </Container>
      </div>
    );
  }
}

export default BasicParallelCoordinates


      {/* <div className="row">
      <div class="col-sm">
      <h2>List of stats</h2>
      </div>
      <div class="col-sm">
      <ul className="list-group">
        {this.state.stats.map((c, i) =>
          <li key={i} className="list-group-item">
            {c.keyword}
            (
            {c.areaCount.map(x => x.country + ", ")}
            {c.location}
            )
          </li>
        )}
        </ul>      
        </div>
      </div> */}