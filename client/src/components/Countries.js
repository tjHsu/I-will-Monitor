import React, { Component } from 'react';
import api from '../api';
import {MarkSeries,XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries,ParallelCoordinates} from 'react-vis';

class Countries extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stats: []
    }
  }
  componentDidMount() {
    api.getStat()
      .then(stats => {
        console.log("Debug: areaCount:",stats.map((c)=> c.areaCount))
        this.setState({
          stats: stats
        })
      })
      .catch(err => console.log(err))
  }
  render() {                
    return (
      <div className="Stats">
      {/* <XYPlot
          width={300}
          height={300}>
          <HorizontalGridLines />
          <LineSeries
            data={[
              { x: 1, y: 10 },
              { x: 1, y: 6 },
              { x:2, y:8},
              { x: 3, y: 15 }
            ]} />
          <XAxis />
          <YAxis />
        </XYPlot>
        
        <ParallelCoordinates data={
          [{
            neatExplosions: 6.9,
            wow: 10,
            dog: 8,
            sickMoves: 9,
            nice: 7
          }]
        } domains={
          [
            { name: 'nice', domain: [0, 100] },
            { name: 'explosions', domain: [6.9, 7.1], getValue: d => d.neatExplosions },
            { name: 'wow', domain: [0, 11] },
            { name: 'sickMoves', domain: [0, 20] }
          ]
        } height={300} width={400}
         /> */}
        {/* {this.state.stats} */}
        
        <h2>List of stats</h2>
        {this.state.stats.map((c, i) => 
          <li key={i}>
            {c.keyword}
            (
            {c.areaCount.map(x => x.country+ ", ")}
            )            
          </li>
        )}
        {/* {this.state.stats.map((c, i) => <li key={i}>{c.areaCount.country} </li>)} */}
      </div>
    );
  }
}

export default Countries;
