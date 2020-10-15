import React, { useState } from 'react';
import { render } from 'react-dom';
import './css/styles.scss';
import BarChart from './d3/Barchart/BarChart';

const generateData = (count) => {
  return new Array(count).fill('').map((d,i) => {
    return {
      x: i,
      y: Math.floor(Math.random() * 100)
    }
  })
}

const App = () => {
  

  

  return (
    <div>
      <h1>App</h1>
      <BarChart height={400} width={700} margin={{ left: 50, bottom: 30, right: 10, top: 10 }} data={generateData(20)} />
    </div>
  )
}

render(<App />, document.getElementById('root'));
