
import React, { Component } from 'react';
import { format } from 'd3-format';
import { Button } from 'reactstrap';
import SearchBar from './SearchBar'
import api from '../api';
import { DiscreteColorLegend, ParallelCoordinates} from 'react-vis';
// import DiscreteColorLegend from 'legends/discrete-color-legend';




const DATA = [
  { label: 'Mercedes', mileage: 7, price: 10, safety: 8, performance: 9, interior: 7, warranty: 7 },
  { label: 'Honda', mileage: 8, price: 6, safety: 9, performance: 6, interior: 3, warranty: 9 },
  { label: 'Chevrolet', mileage: 5, price: 4, safety: 6, performance: 4, interior: 5, warranty: 6 }
];

const ITEMS = [
  'MERCEDES',
  'HONDA',
  'CHEVROLET'
]

const DOMAIN = [
  { name: 'mileage', domain: [0, 10] },
  { name: 'price', domain: [2, 16], tickFormat: t => `$${basicFormat(t)}`, getValue: d => d.price },
  { name: 'safety', domain: [5, 10], getValue: d => d.safety },
  { name: 'performance', domain: [0, 10], getValue: d => d.performance },
  { name: 'interior', domain: [0, 7], getValue: d => d.interior },
  { name: 'warranty', domain: [10, 2], getValue: d => d.warranty }
]


const basicFormat = format('.2r');
const wideFormat = format('.3r');

class BasicParallelCoordinates extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stats: [],
      data: [],
      domain: [{ name: "DE", domain: [0, 100] }, { name: "FR", domain: [0, 100] }],
      items: [],
      searchText: 'a'
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.handleDoSearch = this.handleDoSearch.bind(this)
  }

  handleSearch(event) {
    event.preventDefault()
    console.log("handleChange", event.target.value, event.target.getAttribute("name"))
    this.setState({
      searchText: event.target.value
    })
  }

  handleDoSearch(){
    console.log("Let us do search")
    api.findStat(this.state.searchText)
      .then(stats => {
        console.log(stats)
        //   console.log("Debug: areaCount:",stats.map((c)=> c.areaCount))
        //   this.setState({
        //     stats: stats
        //   })
      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    api.getStat()
      .then(stats => {
        // console.log("Debug: areaCount:",stats.map((c)=> c.areaCount))
        // console.log("Debug Overview: ",stats)
        // this.setState({
        //   stats: stats
        // })
        /////test transfer original stats into a graphic data////
        var obj = {}
        var domainObj = {}
        // var itemObj = {}
        var newArr = []
        var newDomain = [];
        var newItem = [];
        // obj['keyT']="GANN"

        for (let i = 0; i < stats.length; i++) {
          obj['name'] = stats[i].keyword
          domainObj['name'] = stats[i].keyword
          newItem.push(stats[i].keyword)
          domainObj['domain'] = [0, 100]
          console.log("Debug Obj,", obj)
          newDomain.push(domainObj);
          // newItem.push(itemObj);
          for (let j = 0; j < stats[i].areaCount.length; j++) {
            obj[stats[i].areaCount[j].country] = stats[i].areaCount[j].count
          }
          newArr.push(obj);
          obj = {}
          domainObj = {}
          // itemObj={}
        }
        this.setState({
          data: newArr,
          // domain:newDomain,
          items: newItem,
          stats: stats
        })
        console.log("Debug Data:", this.state.data)
        console.log("Debug Domain:", this.state.domain)
        console.log("Debug Item:", this.state.items)
        /////////////////////////////////////////////////////////
      })
      .catch(err => console.log(err))
  }
  render() {
    return (
      <div>
        <SearchBar onSearch={this.handleSearch} searchText={this.state.searchText} />
        <Button onClick={this.handleDoSearch} color="primary">Search</Button>
        <h2>List of stats</h2>
        {this.state.stats.map((c, i) =>
          <li key={i}>
            {c.keyword}
            (
            {c.areaCount.map(x => x.country + ", ")}
            )
          </li>
        )}
        <DiscreteColorLegend
          orientation="horizontal"
          width={300}
          items={this.state.items}
        />
        <ParallelCoordinates

          data={this.state.data}
          tickFormat={t => wideFormat(t)}

          startingAngle={0}
          margin={50}
          /* colorRange={['#172d47', '#911116', '#998965']} */
          domains={this.state.domain}
          showMarks
          width={800}
          height={600}
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
    );
  }
}

export default BasicParallelCoordinates