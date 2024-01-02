// Post, Update, Delete
'use server'

import supabase from "./supabase";
import {revalidatePath } from "next/cache";

export async function addOrder(prevState, formData){
  const fields = {
    ticker: formData.get('ticker'),
    purchase_date: formData.get('purchase_date'),
    num_shares: formData.get('num_shares'),
    purchase_price: formData.get('purchase_price'),
    beta: formData.get('beta'),
  };

  const {ticker, purchase_date, num_shares, purchase_price, beta} = fields
  const purchase_price_cents = purchase_price * 100

  try{
    const {error} = await supabase.from("orders").insert(
      {
        ticker: ticker,
        purchase_date: purchase_date,
        num_shares: num_shares,
        purchase_price: purchase_price_cents,
        beta: beta,
      }
    )

    if(!error){
      revalidatePath('/orders')
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
  revalidatePath('orders')
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