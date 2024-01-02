import { Flex, Table } from "@radix-ui/themes";
import AddOrderCard from "@/ui/orders/AddOrderCard";
import DotMenu from "@/ui/orders/DotMenu";
import supabase from "@/app/lib/supabase";
import { getOrders } from "@/app/lib/data";

async function OrdersTable(){
  const rows = await getOrders()

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
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
        {headers.map((header, index) =>(
          <Table.ColumnHeaderCell key={index}>{header}</Table.ColumnHeaderCell>
        ))}
        <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rows.map((row, rowIndex) =>(
        <Table.Row key={rowIndex}>
          {keys.map((key, colIndex) =>(
          <Table.Cell key={colIndex}>
            {row[key]}
          </Table.Cell>
          ))}
          <Table.Cell>
            <DotMenu id={row.id}/>
          </Table.Cell>
        </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
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