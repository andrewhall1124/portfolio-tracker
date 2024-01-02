'use client'
import { Dialog, DropdownMenu, AlertDialog, IconButton, Flex, Button, TextField } from "@radix-ui/themes"
import { DotsVerticalIcon } from "@radix-ui/react-icons"
import { useState, useEffect } from "react"
import { deleteOrder, editOrder } from "@/app/lib/actions"
import supabase from "@/app/lib/supabase"

function EditDialog({id}){
  const [order, setOrder] = useState({})
  const [ticker, setTicker] = useState("")
  const [date, setDate] = useState("")
  const [shares, setShares] = useState("")
  const [price, setPrice] = useState("")
  const [beta, setBeta] = useState("")

  useEffect(() =>{
    const getOrder = async () =>{
      try{
        const {data, error} = await supabase.from('orders').select().eq("id", id)
  
        if(data){
          setOrder(data[0])
        }
  
        if(error){
          console.error(error)
        }
      }
      catch(error){
        console.error(error)
      }
    }
    getOrder()
  },[])

  useEffect(()=>{
    if(order){
      setTicker(order.ticker)
      setDate(toString(order.purhcase_date))
      setShares(order.num_shares)
      setPrice(toString(order.purhcase_price))
      setBeta(order.beta)
    }
  },[order])

  const handleEdit = async =>{

  }

  return(
    <Dialog.Content style={{ maxWidth: 450 }}>
      <Dialog.Title>Edit order</Dialog.Title>
      <Dialog.Description size="2" mb="4">
        Make changes to your order.
      </Dialog.Description>
      <Flex direction='column' gap='4'>
        <TextField.Input placeholder="Ticker" value={ticker} />
        <TextField.Input placeholder="Date" value={date} />
        <TextField.Input placeholder="Shares" value={shares} />
        <TextField.Input placeholder="Price" value={price}/>
        <TextField.Input placeholder="Beta" value={beta} />
      </Flex>
      <Flex gap="3" mt="4" justify="end">
        <Dialog.Close>
          <Button variant="soft" color="gray">
            Cancel
          </Button>
        </Dialog.Close>
        <Dialog.Close>
          <Button>Save</Button>
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