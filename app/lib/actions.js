// Post, Update, Delete
'use server'

import supabase from "./supabase";
import {revalidatePath } from "next/cache";

export async function addOrder(ticker, date, shares, price, beta){
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

export async function updateOrder({id, body}){
  try{
    const {error} = await supabase.from('orders').update(body).eq('id',id)
    if(error){
      console.error(error)
    } 
    else{
      revalidatePath('orders')
    }
  }
  catch(error){
    console.error(error)
  }
}

export async function deleteOrder(id){
  try{
    const {error} = await supabase.from('orders').delete().eq('id', id)
    if(error){
      console.error(error)
    }
    else{
      revalidatePath('/orders')
    }
  }
  catch(error){
    console.error(error)
  }
}