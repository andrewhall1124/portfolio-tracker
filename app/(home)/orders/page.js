'use client'

import { Button, Card, CardBody, Input } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import supabase from "@/app/supabase"
import { Table } from "@/app/components"

export default function Page(){
  const [ticker, setTicker] = useState("")
  const [num_shares, setNumShares] = useState("")
  const [purhcase_price, setPurchasePrice] = useState("")
  const [beta, setBeta] = useState("")

  const [orders, setOrders] = useState([])

  const headers_name = ["Ticker", "Shares", "Purchase Price", "Beta"]
  const headers_data = ['ticker', 'num_shares', 'purchase_price', 'beta']

  useEffect(() =>{
    getOrders()
  },[])

  const getOrders = async () =>{
    try{
      const response = await supabase.from('orders').select()

      if(response.status >= 200){
        setOrders([...orders, ...response.data])
      }

      if(response.error){
        console.error(error)
      }
    }
    catch(error){
      console.error(error)
    }

  }

  const postOrder = async () =>{
    try{
      const order = {
        ticker: ticker,
        num_shares: num_shares,
        purchase_price: purhcase_price,
        beta: beta
      }
      const response = await supabase
      .from('orders')
      .insert(order)

      if(response.status >= 200){
        setTicker("")
        setNumShares("")
        setPurchasePrice("")
        setBeta("")
        setOrders([...orders, order])
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
                value={num_shares}
                onChange={(event) => setNumShares(event.target.value)}
              />
              <Input
                placeholder="Price"
                value={purhcase_price}
                onChange={(event) => setPurchasePrice(event.target.value)}
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
        <Card>
          <CardBody>
            <div className="flex flex-col p-4 gap-4 items-center">
              <div className="text-xl font-semibold">All Orders</div>
              <Table headers={headers_data} names={headers_name} rows={orders}/>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  )
}