import supabase from "@/app/supabase"

export default async function getOrders(){
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