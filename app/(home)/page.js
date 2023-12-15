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
      const {data, status, error} = await supabase.from('orders').select()
      console.log(data)
      
      if(status >= 200){

        const portfolio = data.reduce((acc, order) => {
          const { ticker, num_shares, purchase_price, purchase_date, beta } = order;
        
          if (!acc[ticker]) {
            // If the ticker is not in the accumulator, initialize it
            acc[ticker] = { num_shares, beta, purchase_price: num_shares * purchase_price };
          } else {
            // If the ticker is already in the accumulator, update values
            acc[ticker].num_shares += num_shares;
            acc[ticker].purchase_price += num_shares * purchase_price;
            acc[ticker].beta = beta
          }
        
          return acc;
        }, {});

        for (const ticker in portfolio) {
          const { num_shares, purchase_price } = portfolio[ticker];
          portfolio[ticker].average_cost = Math.round((purchase_price / num_shares) * 100)/100;
        }

        console.log(portfolio)

        const oldestDate = data.reduce((oldest, current) => (current.purchase_date < oldest.purchase_date ? current : oldest)).purchase_date
  
        const result = await APCA.get(
          {
            tickers: Object.keys(portfolio), 
            timeFrame: '1D',
            endTime: dayjs().subtract(1,'day').endOf('day').format(),
            startTime: dayjs(oldestDate).format()
          })

        const bars = result.bars

        for (const ticker in portfolio) {
          const curr = bars[ticker][bars[ticker].length - 1]['c'];
        
          const currentTicker = portfolio[ticker];
        
          currentTicker.current_price = curr;
          currentTicker.return_td = Math.round((curr / currentTicker.average_cost) * 10000) / 100;
        }

        const portfolioArray = Object.entries(portfolio).map(([ticker, data]) => ({
          ticker,
          num_shares: data.num_shares,
          average_cost: data.average_cost,
          current_price: data.current_price,
          beta: data.beta,
          return_td: data.return_td
        }));

        console.log(portfolioArray)

        setPortfolio(portfolioArray)
      }

      if(error){
        console.log(error)
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
