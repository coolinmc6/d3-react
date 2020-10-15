import React, { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';

const Scatterplot = ({ data: myData }) => {
  const [data, setData] = useState(new Array(10).fill('').map((d,i) => {
    return [Math.random() * 10, Math.random() * 100]
  }))
  const gRef = useRef(null)
  const xScale = d3.scaleLinear().domain([0,data.length-1]).range([0, 500 - 100]);
  const yScale = d3.scaleLinear().domain([0, 100]).range([250, 0]);
  const transitionDuration = 500;

  const updateData = () => {
    setData(new Array(10).fill('').map((d,i) => {
      return [Math.random() * 10, Math.random() * 100]
    }))
  }
  
  const update = () => {
    d3.select(gRef.current)
    .selectAll('circle')
    .data(data)
    .join(
      function(enter) {
        return enter
          .append('circle')
          .style('opacity', 0);
      },
      function(update) {
        return update;
      },
      function(exit) {
        return exit
          .transition()
          .duration(transitionDuration)
          .attr('r', 0)
          .style('opacity', 0)
          .attr('cx', 1000)
          .attr('cy', -1000)
          .on('end', function() {
            d3.select(this).remove();
          });
      }
    )
    .attr('cx', function(d, i) {
      return xScale(d[0])
    })
    .attr('cy', function(d, i) {
      return yScale(d[1])
    })
    .transition()
    .duration(transitionDuration)
    .attr('r', function(d) {
      return 5;
    })
    .style('opacity', 1);
  }

  useEffect(() => {
    update();
  }, [data])

  return (
    <>
      <button onClick={() => updateData()}>Update this Shit</button>
      <svg width="500" height="250">
        <g ref={gRef} className="container" transform="translate(0, 0)"></g>
      </svg>
    </>
  )

}

export default Scatterplot;