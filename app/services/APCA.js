const APCA = {
  get: async ({tickers, timeFrame, startTime, endTime}) => {
    // const symbols = 'AAPL,IBM'
    // const timeFrame = '1D'
    // const startTime = dayjs('2023-09-01').format()
    // const endTime = dayjs().startOf('day').format()
    const url = `https://data.alpaca.markets/v2/stocks/bars?symbols=${tickers.join(",")}&timeframe=${timeFrame}&start=${startTime}&end=${endTime}&limit=1000&adjustment=raw&feed=sip&sort=asc`
    
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
      return data
    }
    catch(error){
      console.error(error)
    }
  }
}

export default APCA