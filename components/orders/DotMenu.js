'use client'
import { Dialog, DropdownMenu, AlertDialog, IconButton, Flex, Button, TextField } from "@radix-ui/themes"
import { DotsVerticalIcon } from "@radix-ui/react-icons"
import { useState, useEffect, useMemo } from "react"
import { deleteOrder, updateOrder } from "@/lib/actions"
import { fetchOrderById } from "@/lib/data"
import { DatePicker } from "../ui/datePicker"

function EditDialog({id}){
  const [order, setOrder] = useState({})
  const [ticker, setTicker] = useState("")
  const [date, setDate] = useState("")
  const [shares, setShares] = useState("")
  const [price, setPrice] = useState("")
  const [beta, setBeta] = useState("")

  useEffect(()=>{
    const fetchData = async () =>{
      const response = await fetchOrderById(id)
      setOrder(response)
    }
    fetchData()
  },[id])

  useEffect(()=>{
    if(order){
      setTicker(order.ticker)
      setDate(order.purchase_date)
      setShares(order.num_shares)
      setPrice(order.purchase_price /100)
      setBeta(order.beta)
    }
  },[order])

  const body = useMemo(()=>{
    return{
      id: id,
      ticker: ticker,
      purchase_date: date,
      num_shares: shares,
      purchase_price: price * 100,
      beta: beta,
    }
  },[id,ticker,date,shares,price,beta])

  return(
    <Dialog.Content style={{ maxWidth: 450 }}>
      <Dialog.Title>Edit order</Dialog.Title>
      <Dialog.Description size="2" mb="4">
        Make changes to your order.
      </Dialog.Description>
      <Flex direction='column' gap='4'>
        <TextField.Input placeholder="Ticker" value={ticker} onChange={(event)=>setTicker(event.target.value)}/>
        <DatePicker value={date} setValue={setDate}/>
        <TextField.Input placeholder="Shares" value={shares} onChange={(event)=>setShares(event.target.value)}/>
        <TextField.Input placeholder="Price" value={price} onChange={(event)=>setPrice(event.target.value)}/>
        <TextField.Input placeholder="Beta" value={beta} onChange={(event)=>setBeta(event.target.value)}/>
      </Flex>
      <Flex gap="3" mt="4" justify="end">
        <Dialog.Close>
          <Button variant="soft" color="gray">
            Cancel
          </Button>
        </Dialog.Close>
        <Dialog.Close>
          <Button onClick={() =>updateOrder(body)}>Save</Button>
        </Dialog.Close>
      </Flex>
    </Dialog.Content>
  )
}

function DeleteDialog({id}){
  return(
    <AlertDialog.Content style={{ maxWidth: 450 }}>
      <AlertDialog.Title>Delete order</AlertDialog.Title>
      <AlertDialog.Description size="2">
        Are you sure? This order will no longer be accessible.
      </AlertDialog.Description>
      <Flex gap="3" mt="4" justify="end">
        <AlertDialog.Cancel>
          <Button variant="soft" color="gray">
            Cancel
          </Button>
        </AlertDialog.Cancel>
        <AlertDialog.Action>
          <Button variant="solid" color="red" onClick={() =>deleteOrder(id)}>
            Delete order
          </Button>
        </AlertDialog.Action>
      </Flex>
    </AlertDialog.Content>
  )
}

export default function DotMenu({id}){
  return(
    <>
      <Dialog.Root>
        <AlertDialog.Root>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <IconButton size='1' variant="soft">
                <DotsVerticalIcon/>
              </IconButton>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <Dialog.Trigger>
                <DropdownMenu.Item>
                  Edit
                </DropdownMenu.Item>
              </Dialog.Trigger>
              <AlertDialog.Trigger>
                <DropdownMenu.Item color='red'>
                  Delete
                </DropdownMenu.Item>
              </AlertDialog.Trigger>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          <EditDialog id={id}/>
          <DeleteDialog id={id}/>
        </AlertDialog.Root>
      </Dialog.Root>
    </>
  )
}