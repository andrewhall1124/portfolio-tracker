'use client'
import Link from "next/link";
import { Table } from "../components";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Card, CardBody, CardHeader } from "@chakra-ui/react";
import supabase from "../supabase";
import APCA from "../services/APCA";

export default function Home() {
  const [portfolio, setPortfolio] = useState([])
  
  useEffect(()=>{
    getPortfolioData()
  },[])

  const getPortfolioData= async () =>{
    try{
      const response = await supabase.from('orders').select()

      if(response.status >= 200){

        const fetchedTickers = response.data.map(stock => stock.ticker)
        fetchedTickers.push('IWV')

        const oldestDate = response.data.reduce((oldest, current) => (current.purchase_date < oldest.purchase_date ? current : oldest)).purchase_date

        const result = await APCA.get(
          {
            tickers: fetchedTickers, 
            timeFrame: '1D',
            endTime: dayjs().subtract(1,'day').endOf('day').format(),
            startTime: dayjs(oldestDate).format()
          })

        const bars = result.bars

        let portfolio = []
        for(let i = 0; i < fetchedTickers.length -1; i++){
          portfolio.push({
            ticker: fetchedTickers[i],
            current_price: ((bars[fetchedTickers[i]])[(bars[fetchedTickers[i]].length-1)])['c'],
            num_shares: response.data[i].num_shares,
            average_cost: response.data[i].purchase_price,
            return_td: Math.round(((((bars[fetchedTickers[i]])[(bars[fetchedTickers[i]].length-1)])['c'] / response.data[i].purchase_price) - 1)*10000)/100
          })
        }
        setPortfolio(portfolio)
      }

      if(response.error){
        console.log(response.error)
      }
    }
    catch(error){
      console.error(error)
    }
  }

  /////////////////////////////////

  const headers = [
    'ticker',
    'current_price',
    'num_shares',
    'average_cost',
    'return_td'
  ]

  const names = [
    "Ticker",
    "Current Price",
    "Shares",
    "Average Cost",
    "Return to Date"
  ]

  return (
    <main className="p-4">
      <Card>
        <CardBody>
          <div className="text-xl font-semibold py-4">Portfolio</div>
          <Table names={names} headers={headers} rows={portfolio}/>
        </CardBody>
      </Card>
    </main>
  )
}
