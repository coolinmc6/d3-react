import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ height, width, margin, data }) => {
  const svgRef = useRef(null);

  const draw = () => {
    console.log({ data, margin, width });
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Create X and Y Scales
    const xScale = d3.scaleLinear()
      .domain([0,data.length])
      .range([0, chartWidth]);
    
    const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([chartHeight, 0])

    // Create X and Y Axes
    const xAxis = d3.axisBottom(xScale)
    const yAxis = d3.axisLeft(yScale)

    // Place Axes
    d3.select(svgRef.current).select('.x-axis').call(xAxis)
    d3.select(svgRef.current).select('.y-axis').call(yAxis);

    console.log(d3);

    // Build the bars
    d3.select(svgRef.current).select('g.bars').selectAll('rect')
      .data(data)
      .transition()
      .duration(1000)
      .attr('x', d => xScale(d.x))
      .attr('y', d => yScale(d.y))
      .attr('width', d => chartWidth / data.length)
      .attr('height', d => chartHeight - yScale(d.y))
      .style('fill', (d,i) => ['red', 'blue', 'green'][i % 3])
  }

  useEffect(() => {
    draw()
  }, [data])

  const bars = data.map((d, i) => <rect key={d.x} />)
  return (
    <>
      <svg ref={svgRef}
        height={height}
        width={width} 
        style={{ backgroundColor: '#f7f7f7'}} 
      >
        <g className="bars" style={{ transform: `translate(${margin.left}px, ${margin.top}px)`}}>
          {bars}
        </g>
        <g className="x-axis" style={{ transform: `translate(${margin.left}px, ${height - margin.bottom}px)`}}/>
        <g 
          className="y-axis"
          style={{ transform: `translate(${margin.left}px, ${margin.top}px)`}}
        />
      </svg>
    </>
  )

}

export default BarChart;

/*
First attempt
- What is the general pattern?

*/