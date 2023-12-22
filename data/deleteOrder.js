'use server'
import supabase from "@/app/supabase"
import { revalidatePath, unstable_noStore as noStore } from "next/cache"

export default async function deleteOrder(id){
  noStore()
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