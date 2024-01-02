import dayjs from "dayjs"

export async function getMarketData(){
  const ticker = 'AAPL'
  const timeFrame = '1D'
  const startTime = dayjs('2023-09-01').format()
  const endTime = dayjs().startOf('day').format()
  console.log(startTime)

  const url = `https://data.alpaca.markets/v2/stocks/bars?symbols=${ticker}&timeframe=${timeFrame}&start=${startTime}&end=${endTime}&limit=1000&adjustment=raw&feed=sip&sort=asc`
  
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'APCA-API-KEY-ID': `${process.env.APCA_API_KEY}`,
      'APCA-API-SECRET-KEY': `${process.env.APCA_API_SECRET}`,
    }
  };
  
  try{
    const response = await fetch(url, options)
    const data = await response.json()
    //console.log(data)
    return data
  }
  catch(error){
    console.error(error)
  }
}