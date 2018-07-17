
import React, {Component} from 'react';
import {format} from 'd3-format';

// import {ParallelCoordinates} from 'index';
// import React, {Component} from 'react';

// import ShowcaseButton from './ShowcaseButton';
// import {ParallelCoordinates} from 'index';
// import api from '../api';
// import {DiscreteColorLegend,MarkSeries,XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries,ParallelCoordinates, LabelSeries} from 'react-vis';
import {DiscreteColorLegend,ParallelCoordinates} from 'react-vis';

// import DiscreteColorLegend from 'legends/discrete-color-legend';




const DATA = [
  {label:'Mercedes', mileage: 7, price: 10, safety: 8, performance: 9, interior: 7, warranty: 7},
  {label:'Honda', mileage: 8, price: 6, safety: 9, performance: 6, interior: 3, warranty: 9},
  {label:'Chevrolet', mileage: 5, price: 4, safety: 6, performance: 4, interior: 5, warranty: 6}
];

const ITEMS = [
    'MERCEDES',
    'HONDA',
    'CHEVROLET'
]

const basicFormat = format('.2r');
const wideFormat = format('.3r');

export default class BasicParallelCoordinates extends Component {
  render() {
    return (
        <div>
            <DiscreteColorLegend
      orientation="horizontal"
      width={300}
      items={ITEMS}
    />
      <ParallelCoordinates
      
       data={DATA} 
        tickFormat={t => wideFormat(t)}
        
        startingAngle={0}
        margin={50}
        /* colorRange={['#172d47', '#911116', '#998965']} */
        domains={[
          {name: 'mileage', domain: [0, 10]},
          {name: 'price', domain: [2, 16], tickFormat: t => `$${basicFormat(t)}`, getValue: d => d.price},
          {name: 'safety', domain: [5, 10], getValue: d => d.safety},
          {name: 'performance', domain: [0, 10], getValue: d => d.performance},
          {name: 'interior', domain: [0, 7], getValue: d => d.interior},
          {name: 'warranty', domain: [10, 2], getValue: d => d.warranty}
        ]}
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