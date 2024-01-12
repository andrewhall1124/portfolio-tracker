import supabase from "@/lib/supabase"
export default async function Page(){
  try{
    const { data, error } = await supabase
    .from('portfolios')
    .select(`
      users(
        *
      )
    `)

    if(data){
      console.log(data[0])
    }
    if(error){
      console.error(error)
    }
  }
  catch(error){
    console.error(error)
  }
  return(
    <div>
      Hello Page
    </div>
  )
}