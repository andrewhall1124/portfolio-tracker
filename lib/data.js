// Get

import supabase from "./supabase";
import dayjs from "dayjs";
import { round } from "@/lib/utils";

export async function getPortfolio() {
  try {
    const orders = await parseOrders();
    const tickers = orders.map((obj) => obj.ticker).join();

    const earliestDate = orders.reduce((minDate, obj) => {
      const currentDate = dayjs(obj.purchase_date);
      return currentDate < minDate ? currentDate : minDate;
    }, dayjs());

    const timeFrame = '1D';
    const startTime = earliestDate.format();
    const endTime = dayjs().startOf('day').format();
    const url = `https://data.alpaca.markets/v2/stocks/bars?symbols=${tickers}&timeframe=${timeFrame}&start=${startTime}&end=${endTime}&limit=10000&adjustment=raw&feed=sip&sort=asc`;

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'APCA-API-KEY-ID': `${process.env.APCA_API_KEY}`,
        'APCA-API-SECRET-KEY': `${process.env.APCA_API_SECRET}`,
      },
    };

    const response = await fetch(url, options);
    const marketData = await response.json();

    let portfolio = orders;
    for (const stock of portfolio) {
      const stockPrices = marketData.bars[stock.ticker];
      const length = stockPrices.length;
      const currentPrice = stockPrices[length - 1]['c'];

      stock['current_price'] = round(currentPrice);
      stock['return_td'] = round((currentPrice / stock.average_cost - 1) * 100);
    }

    return portfolio;
  } catch (error) {
    console.error(error);
  }
}

async function parseOrders(){
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