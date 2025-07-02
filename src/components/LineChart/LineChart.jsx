import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts'

const LineChart = ({ historicalData }) => {
  const [data, setData] = useState([["Date", "Price"]])
  
  useEffect(() => {
    if (historicalData && historicalData.prices) {
      const dataCopy = [["Date", "Price"]]
      
      historicalData.prices.forEach((item) => {
        const date = new Date(item[0])
        const dateStr = date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric'
        })
        dataCopy.push([dateStr, item[1]])
      })
      
      setData(dataCopy)
    }
  }, [historicalData])

  return (
  <Chart
  chartType='LineChart'
  data={data}
  width="100%"
  height="300px"
  options={{
    colors: ['#1E90FF'], // Dodger Blue for clear visibility
    curveType: 'function',
    legend: { position: 'none' },
    hAxis: { title: 'Date' },
    vAxis: { title: 'Price' },
    backgroundColor: 'transparent'
  }}
/>

  )
}

export default LineChart
