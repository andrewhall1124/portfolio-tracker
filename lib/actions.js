// Post, Update, Delete
'use server'

import supabase from "./supabase";
import {revalidatePath } from "next/cache";

export async function addOrder(body){
  const purchase_price_cents = body.purchase_price * 100

  try{
    const {error} = await supabase.from("orders").insert(
      {
        ticker: body.ticker,
        purchase_date: body.purchase_date,
        num_shares: body.num_shares,
        purchase_price: purchase_price_cents,
        beta: body.beta,
      }
    )

    if(!error){
      revalidatePath('/orders')
      // revalidatePath('/')
      return {
        status: 200
      }
    }
    else{
      console.error(error)
    }
  }
  catch(error){
    console.error(error)
    return {
      message: 'Database Error: Failed to Create Invoice.',
    }
  }
}

export async function updateOrder(body){
  try{
    const {error} = await supabase.from('orders').update(body).eq('id',body.id)
    if(error){
      console.error(error)
    } 
    else{
      revalidatePath('/orders')
      // revalidatePath('/')
      return {message: 'success'}
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
      // revalidatePath('/')
    }
  }
  catch(error){
    console.error(error)
  }
}