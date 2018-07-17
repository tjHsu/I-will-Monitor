import React, {Component} from 'react';

import ShowcaseButton from './ShowcaseButton';
// import {ParallelCoordinates} from 'index';
// import api from '../api';
// import {MarkSeries,XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries,ParallelCoordinates} from 'react-vis';
import {ParallelCoordinates} from 'react-vis';

const DATA = [{
  explosions: 3,
  wow: 10,
  dog: 8,
  sickMoves: 9,
  nice: 7
}];

const DOMAIN = [
  {name: 'nice', domain: [0, 100], tickFormat: t => t},
  {name: 'explosions', domain: [0, 7.1]},
  {name: 'wow', domain: [0, 11]},
  {name: 'dog', domain: [0, 16]},
  {name: 'sickMoves', domain: [0, 20]}
];

function generateData() {
  return [
    Object.keys(DATA[0]).reduce((acc, key) => {
      acc[key] = DATA[0][key] + 5 * (Math.random() - 0.5);
      return acc;
    }, {})
  ];
}

export default class AnimatedParallelCoordinates extends Component {
  state = {
    data: DATA
  }

  render() {
    const {data} = this.state;

    return (
      <div className="centered-and-flexed">
        <ParallelCoordinates
          animation
          data={data}
          domains={DOMAIN}
          style={{
            lines: {
              strokeWidth: 3,
              strokeDasharray: '2, 2'
            },
            axes: {
              text: {
                opacity: 1
              }
            },
            labels: {
              textAnchor: 'right'
            }
          }}
          margin={{
            left: 30,
            top: 90,
            bottom: 90,
            right: 50
          }}
          tickFormat={t => ''}
          width={600}
          height={300} />
        <ShowcaseButton
         onClick={() => this.setState({data: generateData()})}
         buttonContent={'UPDATE DATA'} />
      </div>
    );
  }
}