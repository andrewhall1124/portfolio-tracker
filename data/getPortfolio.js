import supabase from "@/app/supabase";
import dayjs from "dayjs";
import round from "@/functions/round";
import { unstable_noStore as noStore } from "next/cache";

export default async function getPortfolio(){
  const orders = await getOrders()
  const tickers = orders.map(obj => obj.ticker).join()

  const earliestDate = orders.reduce((minDate, obj) => {
    const currentDate = dayjs(obj.purchase_date);
    return currentDate < minDate ? currentDate : minDate;
  }, dayjs());


  const timeFrame = '1D'
  const startTime = earliestDate.format()
  const endTime = dayjs().startOf('day').format()
  const url = `https://data.alpaca.markets/v2/stocks/bars?symbols=${tickers}&timeframe=${timeFrame}&start=${startTime}&end=${endTime}&limit=1000&adjustment=raw&feed=sip&sort=asc`
  
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'APCA-API-KEY-ID': `${process.env.APCA_API_KEY}`,
      'APCA-API-SECRET-KEY': `${process.env.APCA_API_SECRET}`,
    }
  };
  
  const response = await fetch(url, options)
  const marketData = await response.json()

  let portfolio = orders
  for(const ticker of tickers.split(",")){
    const stockPrices = marketData.bars[ticker]
    const length = stockPrices.length
    const currentPrice = stockPrices[length -1]['c']
    for(const stock of portfolio){
      if(stock.ticker == ticker){
        stock['current_price'] = round(currentPrice)
        stock['return_td'] = round((currentPrice / stock.average_cost - 1)*100)
      }
    }
  }

  return portfolio
}

async function getOrders(){
  noStore()
  try{
    const {data, error} = await supabase.from("orders").select()

    if(data){
      const reducedData = data.reduce((acc, obj) => {
        const existingTicker = acc.find(item => item.ticker === obj.ticker);
      
        if (existingTicker) {
          existingTicker.beta = Math.min(existingTicker.beta, obj.beta);
          existingTicker.purchase_date = existingTicker.purchase_date < obj.purchase_date ? existingTicker.purchase_date : obj.purchase_date;
          existingTicker.num_shares += obj.num_shares;
          existingTicker.total_cost += obj.num_shares * obj.purchase_price;
        } else {
          acc.push({
            ticker: obj.ticker,
            beta: obj.beta,
            purchase_date: obj.purchase_date,
            num_shares: obj.num_shares,
            total_cost: obj.num_shares * obj.purchase_price,
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