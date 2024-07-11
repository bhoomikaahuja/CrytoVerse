import React from 'react'
import { useEffect , useState } from 'react'
import Loader from './Loader'
import { BaseUrl } from './BaseUrl'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import coin from '../coin.png'
import './CoinDetails.css'
import {BiSolidUpArrow , BiSolidDownArrow} from "react-icons/bi"
import { IoPulseOutline } from "react-icons/io5"
import CoinChart from './CoinChart'

const CoinDetails = () => {
  const [coins, setCoins]=useState([])
  const [loading , setLoading]=useState(true)
  const {id} = useParams()
  const [currency , setCurrency]=useState('inr')
  const currSymbol = currency === 'inr' ? '₹' : '$'
  const profit = coins.market_data?.price_change_percentage_24h > 0
  useEffect(()=>{
    const getCoin =async()=>{
      try {
        const {data} =await axios.get(`${BaseUrl}/coins/${id}`)
        console.log(data)
        setCoins(data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    getCoin()
  },[])
  return (
    <>
    {
      loading ? <Loader/> : <> 
        <div className='coin-detail'>
          <div className='coin-info'>
          <div className='btn'>
        <button onClick={()=>setCurrency('inr')}>inr</button>
        <button onClick={()=>setCurrency('usd')}>usd</button>
      </div>
            <div className="time">
              Last Updated on {coins.last_updated} 
            </div>
            <div className="coin-image">
              <img height={"150px"} src={coins.image.large} alt="" />
            </div>
            <div className="coin-name">
              {coins.name}
            </div>
            <div className="price">
             {currSymbol} {coins.market_data.current_price[currency]}
            </div>
            <div className="coin-profit">
              {profit ? <BiSolidUpArrow color='green'/> : <BiSolidDownArrow color='red'/>}
              {coins.market_data.price_change_percentage_24h} %
            </div>
            <div className="coin-rank">
              <IoPulseOutline color='blue'/>
              # {coins.market_cap_rank}
            </div>
            <div className="coin-description">
              <p> {coins.description['en'].split('.')[0]} </p>
            </div>

          </div>
             <CoinChart currency={currency} />
        </div>
      
      </>
    }
    </>
  )
}

export default CoinDetails
