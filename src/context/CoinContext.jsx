import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",   // Fixed: added colon and quotes
    symbol: "$"
  });

  const fetchAllCoin = async () => {
    const options = {
      method: 'GET',
      headers: { 
        accept: 'application/json', 
        'x-cg-demo-api-key': 'CG-jfyVbkncaBX2RC92moUoK34X' 
      }
    };

    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
      .then(res => res.json())
      .then(res => setAllCoin(res))
      .catch(err => console.error(err));
  };


    useEffect(()=>{
        fetchAllCoin();
    },[currency])
  const contextValue = {
    // You can add your state and functions here if needed
    allCoin,currency,setCurrency
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
