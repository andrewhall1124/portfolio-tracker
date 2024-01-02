'use client'

import { Button, Card, Flex, Heading, TextField } from "@radix-ui/themes";
import { useFormState } from 'react-dom';
import { addOrder } from "@/app/lib/actions";
import { unstable_noStore as noStore } from "next/cache";

export default function AddOrderCard(){
  noStore()
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(addOrder, initialState);

  return(
    <Card size='3'>
      <form action={dispatch} id="add-order-card">
        <Flex direction='column' gap='4' align='center'>
          <Heading align='center'>Add Order</Heading>
          <TextField.Input name="ticker" placeholder="Ticker"/>
          <TextField.Input name="purchase_date" placeholder="Date"/>
          <TextField.Input name="num_shares" placeholder="Shares"/>
          <TextField.Input name="purchase_price" placeholder="Price"/>
          <TextField.Input name="beta" placeholder="Beta"/>
          <Button type="submit">Submit</Button>
        </Flex>
      </form>
    </Card>
  )
}