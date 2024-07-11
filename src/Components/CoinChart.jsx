import React,{useState , useEffect} from 'react'
import axios from 'axios'
import { BaseUrl } from './BaseUrl'
import { useParams } from 'react-router-dom'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  import Loader from './Loader';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const CoinChart =({currency}) => {
    const [chartdata , setChartdata]=useState([])
    const {id} = useParams()
    const [days, setDays]=useState(1)
    const CoinChartData=async()=>{
        try {
            const { data } = await axios.get(`${BaseUrl}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`)
        setChartdata(data.prices)
        // console.log(data.prices)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        CoinChartData()
    },[currency , id ,days])
    const mydata={
        labels : chartdata.map((value)=>{
            const date = new Date(value[0])
            const time = date.getHours() >12 ? `${date.getHours()-12} : ${date.getMinutes()} PM ` : `${date.getHours()} : ${date.getMinutes()} AM `
             return days===1 ? time: date.toLocaleDateString()  
        
        }),
        datasets:[
            {
                label: `Price in past ${days} in ${currency}`,
                data: chartdata.map((value)=>value[1]),
                borderColor: 'orange',
                borderWidth: '3'
            }
        ]
    }
  return (
    <div>
        {/*<Line data ={mydata} /> */}
       <Line data ={mydata} options={{
        elements:{
            point:{
                radius:0.5,
            }
            
        }
       }} style={{marginTop: "5rem", width:"55rem"}} /> 
       <div className='btn' style={{marginTop:"30px"}}>
        <button onClick={()=>setDays(1)}>24Hours</button>
        <button onClick={()=>setDays(30)}>1 Month</button>
        <button onClick={()=>setDays(365)}>1 Year</button>
      </div>
      
    </div>
  )
}

export default CoinChart
