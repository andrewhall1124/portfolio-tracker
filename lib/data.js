// Get

import supabase from "./supabase";
import dayjs from "dayjs";
import { round } from "@/lib/utils";
import { unstable_noStore as noStore } from "next/cache";

export async function parseOrders(){
  try{
    const {data, error} = await supabase.from("orders").select()

    if(data){
      const reducedData = data.reduce((acc, obj) => {
        const existingTicker = acc.find(item => item.ticker === obj.ticker);
      
        if (existingTicker) {
          existingTicker.beta = Math.min(existingTicker.beta, obj.beta);
          existingTicker.purchase_date = existingTicker.purchase_date < obj.purchase_date ? existingTicker.purchase_date : obj.purchase_date;
          existingTicker.num_shares += obj.num_shares;
          existingTicker.total_cost += obj.num_shares * (obj.purchase_price/100);
        } else {
          acc.push({
            ticker: obj.ticker,
            beta: obj.beta,
            purchase_date: obj.purchase_date,
            num_shares: obj.num_shares,
            total_cost: obj.num_shares * (obj.purchase_price/100),
          });
        }
        return acc;
      }, []);
      
      reducedData.forEach(tickerData => {
        tickerData.average_cost = round(tickerData.total_cost / tickerData.num_shares)
      });
      return reducedData
    }
    if(error){
      console.error(error)
    }
  }
  catch(error){
    console.error(error)
  }
}

export async function getMarketData(earliestDate, tickers){
  try{
    const timeFrame = '1D';
    const startTime = dayjs(earliestDate).format("YYYY-MM-DD");
    const url = `https://data.alpaca.markets/v2/stocks/bars?symbols=${tickers}&timeframe=${timeFrame}&start=${startTime}&limit=10000&adjustment=raw&feed=sip&sort=asc`;

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'APCA-API-KEY-ID': `${process.env.APCA_API_KEY}`,
        'APCA-API-SECRET-KEY': `${process.env.APCA_API_SECRET}`,
      },
    };

    const response = await fetch(url, options);
    if(response.status >= 200){
      const marketData = await response.json();
      return marketData
    }else{
      console.log(response)
    }
  }
  catch(error){
    console.error(error)
  }
}

export async function getOrders(){
  try{
    const {data, error} = await supabase.from('orders').select()
    if(data){
      return data
    }
    if(error){
      console.error(error)
    }
  }
  catch(error){
    console.error(error)
  }
}

export async function fetchOrderById(id){
  try{
    const {data, error} = await supabase.from('orders').select().eq('id', id)
    if(data){
      return data[0]
    }
    if(error){
      console.error(error)
    }
  }
  catch(error){
    console.error(error)
  }
}