import { Card, Flex, Table } from "@radix-ui/themes";
import AddOrderCard from "@/components/AddOrderCard";
import supabase from "../supabase";

async function OrdersTable(){
  const {data} = await supabase.from('orders').select()

  const headers = [
    'Purhcase Date',
    'Ticker',
    'Shares',
    'Price'
  ]

  const keys = [
    'purchase_date',
    'ticker',
    'num_shares',
    'purchase_price'
  ]

  return(
    <Card>
      <Table.Root>
        <Table.Header>
          <Table.Row>
          {headers.map((header) =>(
            <Table.ColumnHeaderCell>{header}</Table.ColumnHeaderCell>
          ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((data) =>(
          <Table.Row>
            {keys.map((key) =>(
            <Table.Cell>
              {data[key]}
            </Table.Cell>
            ))}
          </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  )
}

export default async function Page(){
  return(
    <>
      <Flex direction='row' p='4' gap='4' align='start'>
        <AddOrderCard/>
        <OrdersTable/>
      </Flex>
    </>
  )
}