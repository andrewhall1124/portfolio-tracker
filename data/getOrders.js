import supabase from "@/app/supabase"
import { unstable_noStore as noStore} from "next/cache"

export default async function getOrders(){
  noStore()
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