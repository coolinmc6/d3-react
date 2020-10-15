import React, { useRef, useState} from 'react';
import * as d3 from 'd3';
import './d3two.css';
import { useEffect } from 'react';

const D3Two = ({ data }) => {
  const [myData, setMyData] = useState([ 10, 40, 30, 50, 20 ])
  // const [myData, setMyData] = useState(data)
  const circleSpacing = 50;
  const transitionDuration = 500;
  // console.log(data);

  const xScale = d3.scaleLinear().domain([0,myData.length-1]).range([0, 500 - 100]);
  const yScale = d3.scaleLinear().domain([0, 100]).range([250, 0]);

  useEffect(() => {
    console.log('useEffect')
    update();
  },[myData])

  const update = () => {
    d3.select('g.container')
    .selectAll('circle')
    .data(myData)
    .join(
      function(enter) {
        console.log({enter, myData })
        return enter
          .append('circle')
          .style('opacity', 0);
      },
      function(update) {
        return update;
      },
      function(exit) {
        console.log({exit, myData})
        return exit
          .transition()
          .duration(transitionDuration)
          .attr('r', 0)
          .style('opacity', 0)
          .attr('cx', 1000)
          .on('end', function() {
            d3.select(this).remove();
          });
      }
    )
    .attr('cx', function(d, i) {
      return i * circleSpacing;
      // return xScale(i)
    })
    .transition()
    .duration(transitionDuration)
    .attr('r', function(d) {
      return d;
    })
    .style('opacity', 1)
    // .attr('cy', function(d,i) {
    //   return yScale(d)
    // })
  }

  const updateData = (type) => {
    let _myData;
    switch(type) {
      case 'add':
        const rand = 50 * Math.random();
        _myData = [...myData, rand]
        break;
      case 'remove':
        _myData = myData.slice(0,myData.length-1)
        break;
      case 'update':
        _myData = myData.map(function(d) {
          return 50 * Math.random();
        });
        break;
    }
    setMyData(_myData)
    update();
  }

  return (
    <div>
      <div>
        <button onClick={() => updateData('add')}>Add</button>
        <button onClick={() => updateData('remove')}>Remove</button>
        <button onClick={() => updateData('update')}>Update Items</button>
      </div>
      <svg width="500" height="200">
        <g className="container" transform="translate(100, 50)"></g>
      </svg>
    </div>
  )
}

export default D3Two;