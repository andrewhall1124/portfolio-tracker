import { parseOrders, getMarketData } from "./data";
import dayjs from "dayjs";
import { round } from "./utils";

export async function getPortfolio() {
  try {
    const orders = await parseOrders();
    const tickers = orders.map((obj) => obj.ticker).join();

    const earliestDate = orders.reduce((minDate, obj) => {
      const currentDate = dayjs(obj.purchase_date);
      return currentDate < minDate ? currentDate : minDate;
    }, dayjs());

    const marketData = await getMarketData(earliestDate, tickers)

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