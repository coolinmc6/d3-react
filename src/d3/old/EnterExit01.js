import React, { useState, useEffect, useRef} from 'react';
import * as d3 from 'd3';

export default ({ data }) => {
  const chartRef = useRef(null)

  useEffect(() => {
    //2 different data arrays
  var dataArray1 = [30,35,45,55,70];
  var dataArray2 = [50,55,45,35,20,25,25,40];
  
  //globals
  var dataIndex=1;
  var xBuffer=50;
  var yBuffer=150;
  var lineLength=400;
  
  
  //create main svg element
  var svgDoc = d3.select(chartRef.current).append("svg")

  svgDoc.append("text")
      .attr("x",xBuffer+(lineLength/2))
      .attr("y",50)
      .text("dataset"+dataIndex);
  
  //create axis line
  svgDoc.append("line")
      .attr("x1",xBuffer)
      .attr("y1",yBuffer)
      .attr("x1",xBuffer+lineLength)
      .attr("y2",yBuffer)
  
  //create basic circles
  svgDoc.append("g").selectAll("circle")
      .data(eval("dataArray"+dataIndex))
      .enter()
      .append("circle")
      .attr("cx",function(d,i){
          var spacing = lineLength/(eval("dataArray"+dataIndex).length);
          return xBuffer+(i*spacing)
      })
      .attr("cy",yBuffer)
      .attr("r",function(d,i){return d});
  
  //button to swap over datasets
  d3.select(chartRef.current).append("button")
      .text("change data")
      .on("click",function(){
          //select new data
          if (dataIndex==1) {
              dataIndex=2;  
          } else   {
              dataIndex=1;
          }
          //rejoin data
          var circle = svgDoc.select("g").selectAll("circle")
              .data(eval("dataArray"+dataIndex));
          
          circle.exit().remove();//remove unneeded circles
          circle.enter().append("circle")
              .attr("r",0);//create any new circles needed

          //update all circles to new positions
          circle.transition()
              .duration(500)
              .attr("cx",function(d,i){
                  var spacing = lineLength/(eval("dataArray"+dataIndex).length);
                  return xBuffer+(i*spacing)
              })
              .attr("cy",yBuffer)
              .attr("r",function(d,i){return d});

          d3.select("text").text("dataset"+dataIndex);

      });//end click function
  }, [data])
  

  return (
    <div>
      <div ref={chartRef} />
    </div>
  )
}