import { getMarketData } from "@/lib/data"
import dayjs from "dayjs"

export default async function Page(){
  const date = dayjs("2023-11-01").format()
  console.log(date)
  const test = await getMarketData(date, 'AAPL,IBM')
  console.log(test)
  console.log(process.env.APCA_API_SECRET)
  return(
    <div>

    </div>
  )
}