import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { scaleLinear } from 'd3';
import './d3parent.css'

const D3Parent = () => {
  const chartRef = useRef(null);
  const [data, setData] = useState([30,35,45,55,70])
  // let temp = d3.select(chartRef.current).append('svg')
  const [_svgDoc, setSvgDoc] = useState(null)
  // const [circles, setCircles] = useState(null);
  const [init, setInit] = useState(false);

  //2 different data arrays
  var dataArray1 = [30,35,45,55,70];
  var dataArray2 = [50,55,45,35,20,25,25,40];

  //globals
  var dataIndex=1;
  var xBuffer=50;
  var yBuffer=150;
  var lineLength=400;

  useEffect(() => {
    if(init) return;

    let svgDoc = d3.select(chartRef.current).append('svg')
    setSvgDoc(svgDoc)
        
    //create axis line
    svgDoc.append("line")
      .attr("x1",xBuffer)
      .attr("y1",yBuffer)
      .attr("x1",xBuffer+lineLength)
      .attr("y2",yBuffer)
    
    const len = data.length;
            
    //create basic circles
    const _circles = svgDoc.append("g").selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx",function(d,i){
          var spacing = lineLength / len
          return xBuffer+(i*spacing)
      })
      .attr("cy",yBuffer)
      .attr("r",function(d,i){return d});
      // setCircles(_circles)

    setInit(true);
  }, [])

  useEffect(() => {
    
    //rejoin data
    if(!init) return;
    // var circle = _svgDoc.select("g").selectAll("circle")
    //   .data(data);
    let circles = d3.select(chartRef.current).selectAll('g').selectAll('circle').data(data);
    // console.log(data);

    circles.exit().remove();//remove unneeded circles
    circles.enter().append("circle")
        .attr("r",0).merge(circles);
    
    circles.transition()
      .duration(500)
      .attr("cx",function(d,i){
          var spacing = lineLength/(data.length);
          return xBuffer+(i*spacing)
      })
      .attr("cy",yBuffer)
      .attr("r",function(d,i){
        console.log(d);
        return d
      });

  }, [data])

  const changeDataSet = () => {
    if(data.length === 5) {
      setData([50,55,45,35,20,25,25,40])
    } else {
      setData([30,35,45,55,70])
    }
  }


  return (
    <div>
      <button onClick={changeDataSet}>Change Dataset</button>
      <div ref={chartRef} />
    </div>
  )
}

export default D3Parent;