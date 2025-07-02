import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'
import {Link} from 'react-router-dom'

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext)
  const [displayCoin, setDisplayCoin] = useState([])
  const [input,setInput]=useState('');

  const inputHandler=(e)=>{
    setInput(e.target.value);
    if(e.target.value=="")
      setDisplayCoin(allCoin)
  }
  const searchHandler=async(e)=>{
    e.preventDefault();
    const coins=await allCoin.filter((item)=>{
      return item.name.toLowerCase().includes(input.toLowerCase())
    })
    setDisplayCoin(coins)
  }

  useEffect(() => {
    setDisplayCoin(allCoin)
  }, [allCoin])

  return (
    <div>
      <div className='hero'>
        <h1>Largest <br /> Crypto Marketplace</h1>
        <p>
          Welcome to the World's Largest cryptocurrency marketplace.
          Sign Up to explore more about the cryptos.
        </p>
        <form onSubmit={searchHandler}>
          <input  onChange={inputHandler} list='coinlist' value={input} type="text" placeholder='Search crypto..'  required/>

        <datalist id="coinlist">
          {allCoin.map((item,index)=>(<option key={index} value={item.name}/>))}
        </datalist>

          <button type='submit'>Search</button>
        </form>
      </div>
      <div className="cryptotable">
        <div className="tablelayout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p>24H Change</p>
          <p>Market Cap</p>
        </div>
        {
          displayCoin.slice(0, 10).map((item, index) => (
            <Link to={`/coin/${item.id}`} className="tablelayout" key={item.id || index}>
              <p>{item.market_cap_rank}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img src={item.image} alt={item.name} style={{ width: 28, height: 28 }} />
                <p>{item.name} - {item.symbol.toUpperCase()}</p>
              </div>
              <p>{currency.symbol}{item.current_price.toLocaleString()}</p>
              <p style={{
                color: item.price_change_percentage_24h > 0
                  ? '#4caf50'
                  : item.price_change_percentage_24h < 0
                  ? '#ff5252'
                  : '#fff'
              }}>
                {item.price_change_percentage_24h !== undefined
                  ? (Math.floor(item.price_change_percentage_24h * 100) / 100) + '%'
                  : 'N/A'}
              </p>
              <p>{currency.symbol}{item.market_cap?.toLocaleString()}</p>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Home
