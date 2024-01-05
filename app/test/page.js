import { getMarketData } from "@/lib/data"

export default async function Page(){
  const date = "2023-11-01"
  const test = await getMarketData(date, 'AAPL,IBM')
  const price = test.bars.IBM[0].c
  return(
    <div>
      {price}
    </div>
  )
}