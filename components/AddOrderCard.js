'use client'
import { useState } from "react";
import { Button, Card, Flex, Heading, TextField } from "@radix-ui/themes";
import supabase from "@/app/supabase";

export default function AddOrderCard(){
  const [ticker, setTicker] = useState("")
  const [date, setDate] = useState("")
  const [shares, setShares] = useState("")
  const [price, setPrice] = useState("")
  const [beta, setBeta] = useState("")

  const postOrder = async () =>{
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
        console.log('success')
        setTicker("")
        setDate("")
        setShares("")
        setPrice("")
        setBeta("")
      }
      else{
        console.error(error)
      }
    }
    catch(error){
      console.error(error)
    }
  }

  return(
    <Card size='3'>
      <Flex direction='column' gap='4'>
        <Heading align='center'>Add Order</Heading>
        <TextField.Input placeholder="Ticker" value={ticker} onChange={(event) => setTicker(event.target.value)}/>
        <TextField.Input placeholder="Date" value={date} onChange={(event) => setDate(event.target.value)}/>
        <TextField.Input placeholder="Shares" value={shares} onChange={(event) => setShares(event.target.value)}/>
        <TextField.Input placeholder="Price" value={price} onChange={(event) => setPrice(event.target.value)}/>
        <TextField.Input placeholder="Beta" value={beta} onChange={(event) => setBeta(event.target.value)}/>
        <Button onClick={postOrder}>Submit</Button>
      </Flex>
    </Card>
  )
}