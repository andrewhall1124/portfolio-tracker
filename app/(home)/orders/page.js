'use client'

import { Button, Card, CardBody, Input } from "@chakra-ui/react"
import { useState } from "react"
import supabase from "@/app/supabase"

export default function Page(){
  const [ticker, setTicker] = useState("")
  const [shares, setShares] = useState("")
  const [price, setPrice] = useState("")
  const [beta, setBeta] = useState("")

  const postOrder = async () =>{
    try{
      const response = await supabase
      .from('orders')
      .insert(
        { ticker: ticker,
          num_shares: shares,
          purchase_price: price,
          beta: beta
        })

      if(response.status >= 200){
        setTicker("")
        setShares("")
        setPrice("")
        setBeta("")
      }
      
      if(response.error){
        console.error(error)
      }
    }
    catch(error){
      console.error(error)
    }
  }

  return(
    <>
      <div className="flex p-4 gap-4">
        <Card maxW="md" variant='outline'>
          <CardBody>
            <div className="flex flex-col p-4 gap-4 items-center">
              <div className="text-xl font-semibold">New Order</div>
              <Input
                placeholder="Ticker"
                value={ticker}
                onChange={(event) => setTicker(event.target.value)}
              />
              <Input
                placeholder="Shares"
                value={shares}
                onChange={(event) => setShares(event.target.value)}
              />
              <Input
                placeholder="Price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
              <Input
                placeholder="Beta"
                value={beta}
                onChange={(event) => setBeta(event.target.value)}
              />
              <Button colorScheme='green' onClick={postOrder}>Add</Button>
            </div>
          </CardBody>
        </Card>
        {/* <Card>
          <CardBody>
            <div className="flex flex-col p-4 gap-4 items-center">
              <div className="text-xl font-semibold">All Orders</div>
            </div>
          </CardBody>
        </Card> */}
      </div>
    </>
  )
}