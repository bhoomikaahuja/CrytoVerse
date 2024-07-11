import React from 'react'
import { useState , useEffect } from 'react'
import { BaseUrl } from './BaseUrl'
import Loader from './Loader'
import axios from 'axios'
import Header from './Header'
import { Link } from 'react-router-dom'
import './Res.css'

const Coins = () => {
    const [loading , setLoading]=useState(true)
    const [coins , setCoins]=useState([])
    const [curr , setCurr]=useState('inr')
    const [search , setSearch]=useState('')
    const currSymbol = curr === 'inr' ? '₹' : '$'
   
    useEffect(() => {
        const getCoinsData =async()=>{
            const {data} =await axios.get(`${BaseUrl}/coins/markets?vs_currency=${curr}`)
            console.log(data)
            setCoins(data)
            setLoading(false)
        }
        getCoinsData()
    },[curr])
  return (
    <>
    {
      loading ? <Loader /> : <>
      <Header/>
      <div className="search-box">
        <input type="text" placeholder='Search Your Coin' style={{height:'2rem', width:'20rem', position:'absolute' , top:"1%" , left:"30%" , paddingLeft:"5px"}} 
        onChange={(e)=>setSearch(e.target.value)} />
        
      </div>
      <div className='btns'>
        <button onClick={()=>setCurr('inr')}>inr</button>
        <button onClick={()=>setCurr('usd')}>usd</button>
      </div>
      {
        coins.filter((data)=>{
          if(data == ''){
            return data
          }else if(data.name.toLowerCase().includes(search.toLowerCase())){
            return data
          }
        }).map((coindata , i) => {
            return(
                <Coincard coindata={coindata} id={coindata.id} i={i} currSymbol={currSymbol} />
            )
        })
      }
       
      </>
    }
    </>
  )
}

const Coincard=({coindata ,i, currSymbol,id})=>{
    const profit = coindata.price_change_percentage_24h>0
    return(
        <Link to={`/coins/${id}`} style={{color:"white", textDecoration:'none'}}>
          <div key={i} className='ex-cards'>
                <div className="image">
                    <img height = {"80px"} src={coindata.image} alt=""/>
                </div>
                <div className="name">
                    {coindata.name}

                </div>
                <div className="price">
                   {currSymbol}  {coindata.current_price.toFixed(2)}

                </div>
                <div style={profit ? {color:"green"} : {color:"red"}} className="rank">
                    {profit ? '+'+coindata.price_change_percentage_24h.toFixed(2) :coindata.price_change_percentage_24h.toFixed(2)}

                </div>
            </div>
        </Link>
        
    )
}
export default Coins
