'use client'
import Link from "next/link";
import { Table } from "../components";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function Home() {
  const [payload, setPayload] = useState()

  const symbols = 'AAPL,IBM'
  const timeFrame = '1D'
  const startTime = dayjs('2023-09-01').format()
  const endTime = dayjs().startOf('day').format()
  const BASE_URL = `https://data.alpaca.markets/v2/stocks/bars?symbols=${symbols}&timeframe=${timeFrame}&start=${startTime}&end=${endTime}&limit=1000&adjustment=raw&feed=sip&sort=asc`
  
  useEffect(()=>{
    getPortfolioData()
  },[])

  const fetchData = async () =>{
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'APCA-API-KEY-ID': `${process.env.APCA_API_KEY}`,
        'APCA-API-SECRET-KEY': `${process.env.APCA_API_SECRET}`,
      }
    };
    
    try{
      const response = await fetch(BASE_URL, options)
      const data = await response.json()
      console.log(data.bars)
    }
    catch(error){
      throw error
    }
  }

  const getPortfolioData = async () => {
    await fetchData()
  }

  const headers = [
    'ticker',
    'company_name',
    'sector',
    'current_price',
  ]

  const data = [
    {
      ticker: 'AAPL',
      company_name: 'Apple',
      sector: 'technology',
      current_price: 150.55
    },
  ]

  return (
    <main className="p-4">
      <div className="text-xl font-semibold py-4">Portfolio</div>
      <Table headers={headers} rows={data}/>
    </main>
  )
}
