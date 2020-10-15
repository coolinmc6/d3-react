import React, { useRef, useState } from 'react';
import * as d3 from 'd3';
import { useEffect } from 'react';

// https://codesandbox.io/s/618mr9r6nr?from-embed=&file=/src/index.js

const Ball = ({ x }) => {
  const circleRef = useRef(null);
  const [_x, set_X] = useState(null);
  
  // console.log("START:", { _x, x })
  useEffect(() => {
    // console.log("UseEffect:", { _x, x })
    // if(!_X) return;
    let el = d3.select(circleRef.current);
    el.transition()
      .duration(800)
      .ease(d3.easeBounceOut)
      .attr("cx", _x)
      .on("end", () =>
        set_X(x)
      );
  }, [x])
  return (
    <circle r={20} cx={x} cy={20} ref={circleRef} />
  )
}

const Ball2 = ({ x }) => {
  const circleRef = useRef(null);
  // const [_x, set_X] = useState(null);
  let _x = x;
  console.log('is this')
  useEffect(() => {
    
    // if(!_X) return;
    let el = d3.select(circleRef.current);
    el.transition()
      .duration(800)
      .ease(d3.easeBounceOut)
      .attr("cx", x)
      .on("end", () =>
        _x = x
      );
  }, [x])
  console.log({ _x, x })
  return (
    <circle r={20} cx={x} cy={80} ref={circleRef} fill={'red'} />
  )
}


const MovingBall = () => {
  const [ballLeft, setBallLeft] = useState(true);

  const ballJump = () => {
    console.log('ballJump Runs, value will be: ', !ballLeft)
    setBallLeft(!ballLeft)
  }
  console.log('Moving Ball:', ballLeft)
  return (
    <div>
      <div>
        <h1>D3 transitions in React 16.3 {"\u2728"}</h1>
        <p>Click the ball 👇</p>
        <svg style={{ width: "400", height: "300px" }} onClick={() => ballJump()}>
          <Ball x={ballLeft ? 25 : 250} />
          <Ball2 x={ballLeft ? 25 : 250} />
        </svg>
      </div>
    </div>
  )
}

export default MovingBall;