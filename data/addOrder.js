'use server'

import { revalidatePath } from "next/cache"
import supabase from "@/app/supabase"

export default async function addOrder(ticker, date, shares, price, beta){
  try{
    const {error} = await supabase.from("orders").insert(
      {
        ticker: ticker,
        purchase_date: date,
        num_shares: shares,
        purchase_price: price,
        beta: beta,
      }
    )

    if(!error){
      revalidatePath('/orders')
      return true
    }
    else{
      console.error(error)
    }
  }
  catch(error){
    console.error(error)
  }
}
