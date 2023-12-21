import supabase from "@/app/supabase";

export default async function getPortfolio(){
  const orders = getOrders()
  return orders
}

async function getOrders(){
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
        tickerData.average_cost = tickerData.total_cost / tickerData.num_shares;
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