'use client'

import { Button, Card, Flex, Heading, TextField } from "@radix-ui/themes";
import { addOrder } from "@/lib/actions";
import { useState, useMemo } from "react";
import { DatePicker } from "../ui/datePicker";

export default function AddOrderCard(){
  const [ticker, setTicker] = useState("")
  const [date, setDate] = useState("")
  const [shares, setShares] = useState("")
  const [price, setPrice] = useState("")
  const [beta, setBeta] = useState("")

  const body = useMemo(() => {
    return {
      ticker: ticker,
      purchase_date: date,
      num_shares: shares,
      purchase_price: price,
      beta: beta,
    };
  }, [ticker, date, shares, price, beta]);

  const handleAdd = async () =>{
    const response = await addOrder(body)
    if(response.status == 200){
      setTicker("")
      setDate("")
      setShares("")
      setPrice("")
      setBeta("")
    }
  }

  return(
    <Card size='4'>
      <Flex direction='column' gap='2' align='center'>
        <Heading align='center'>Add Order</Heading>
        <TextField.Input placeholder="Ticker" value={ticker} onChange={(event)=>setTicker(event.target.value)}/>
        <DatePicker value={date} setValue={setDate}/>
        <TextField.Input placeholder="Shares" value={shares} onChange={(event)=>setShares(event.target.value)}/>
        <TextField.Input placeholder="Price" value={price} onChange={(event)=>setPrice(event.target.value)}/>
        <TextField.Input placeholder="Beta" value={beta} onChange={(event)=>setBeta(event.target.value)}/>
        <Button onClick={handleAdd}>Submit</Button>
      </Flex>
    </Card>
  )
}
