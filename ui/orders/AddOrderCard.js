'use client'
import { useState } from "react";
import { Button, Card, Flex, Heading, TextField } from "@radix-ui/themes";
import { addOrder } from "@/app/lib/actions";

export default function AddOrderCard(){
  const [ticker, setTicker] = useState("")
  const [date, setDate] = useState("")
  const [shares, setShares] = useState("")
  const [price, setPrice] = useState("")
  const [beta, setBeta] = useState("")

  const handleSubmit = async () =>{
    if(await addOrder(ticker, date, shares, price, beta)){
      setTicker("")
      setDate("")
      setShares("")
      setPrice("")
      setBeta("")
    }
  }

  return(
    <Card size='3'>
      <Flex direction='column' gap='4' align='center'>
        <Heading align='center'>Add Order</Heading>
        <TextField.Input placeholder="Ticker" value={ticker} onChange={(event) => setTicker(event.target.value)}/>
        <TextField.Input placeholder="Date" value={date} onChange={(event) => setDate(event.target.value)}/>
        <TextField.Input placeholder="Shares" value={shares} onChange={(event) => setShares(event.target.value)}/>
        <TextField.Input placeholder="Price" value={price} onChange={(event) => setPrice(event.target.value)}/>
        <TextField.Input placeholder="Beta" value={beta} onChange={(event) => setBeta(event.target.value)}/>
        <Button onClick={handleSubmit}>Submit</Button>
      </Flex>
    </Card>
  )
}