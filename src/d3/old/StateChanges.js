import React, { useState } from 'react';
import { useEffect } from 'react';

const StateChange = ({ data }) => {
  const [myData, setMyData] = useState('MY DATA #00001')

  const updateMyData = () => {
    const rand = Math.floor(Math.random() * 10000)
    setMyData(`MY DATA #${rand}`);
  }

  useEffect(() => {
    console.log('useEffect: EMPTY ARRAY')
  }, [])

  useEffect(() => {
    console.log("useEffect: Props changed - data")
  }, [data])

  useEffect(() => {
    console.log("useEffect: State changed - myData")
  }, [myData])

  return (
    <div>
      <div><button onClick={() => updateMyData()}>Change My Data</button><br /><br /></div>
      <div>Props: {data.map((arr, i) => <span key={i}>[{arr[0]},{arr[1]}] </span>)}</div>
      <div>State: {myData}</div>
    </div>
  )
}

export default StateChange;