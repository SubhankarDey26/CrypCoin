import React, { useContext, useEffect, useState } from 'react'
import "./Coin.css"
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext'
import LineChart from '../../components/LineChart/LineChart'

const Coin = () => {
  const { coinId } = useParams()
  const [coinData, setCoinData] = useState(null)
  const [historicalData, setHistoricalData] = useState(null)
  const { currency } = useContext(CoinContext)

  const fetchCoinData = async () => {
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, {
        method: 'GET',
        headers: { 
          accept: 'application/json', 
          'x-cg-demo-api-key': 'CG-jfyVbkncaBX2RC92moUoK34X' 
        }
      })
      const data = await response.json()
      setCoinData(data)
    } catch (err) {
      console.error(err)
    }
  }

  const fetchHistoricalData = async () => {
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10`, {
        method: 'GET',
        headers: { 
          accept: 'application/json', 
          'x-cg-demo-api-key': 'CG-jfyVbkncaBX2RC92moUoK34X' 
        }
      })
      const data = await response.json()
      setHistoricalData(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchCoinData()
    fetchHistoricalData()
  }, [currency])

  if (coinData && historicalData) {
    return (
      <div className='coin'> 
        <div className='coin-name'>
          <img src={coinData.image.large} alt={coinData.name} />
          <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
        </div>
        
        <div className="coin-details">
          <div className="coin-price">
            <h3>Current Price</h3>
            <p className="price">
              {currency.symbol}{coinData.market_data.current_price[currency.name]}
            </p>
            <p className={`price-change ${coinData.market_data.price_change_percentage_24h > 0 ? 'positive' : 'negative'}`}>
              {coinData.market_data.price_change_percentage_24h.toFixed(2)}%
            </p>
            
            <div className="coin-stats">
              <div className="stat-card">
                <h4>Market Cap</h4>
                <p>{currency.symbol}{coinData.market_data.market_cap[currency.name].toLocaleString()}</p>
              </div>
              <div className="stat-card">
                <h4>24H Volume</h4>
                <p>{currency.symbol}{coinData.market_data.total_volume[currency.name].toLocaleString()}</p>
              </div>
              <div className="stat-card">
                <h4>Circulating Supply</h4>
                <p>{coinData.market_data.circulating_supply.toLocaleString()}</p>
              </div>
              <div className="stat-card">
                <h4>All Time High</h4>
                <p>{currency.symbol}{coinData.market_data.ath[currency.name].toLocaleString()}</p>
              </div>
            </div>
            
            <div className='coin-chart'>
              <LineChart historicalData={historicalData} />
            </div>
          </div>
          
          <div className="coin-description">
            <h3>About {coinData.name}</h3>
            <p dangerouslySetInnerHTML={{ __html: coinData.description.en }} />
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className='spinner'> 
        <div className='spin'></div>
      </div>
    )
  }
}

export default Coin
