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
  const [data, setData] = useState(generateData(20))

  const newData = () => {
    setData(generateData(Math.floor(Math.random() * 20) + 5))
  }

  return (
    <div>
      <h1>App</h1>
      <button onClick={() => newData()}>New Data</button>
      <BarChart height={400} width={700} margin={{ left: 50, bottom: 30, right: 10, top: 10 }} data={data} />
    </div>
  )
}

render(<App />, document.getElementById('root'));
