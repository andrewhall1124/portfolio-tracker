import { Button, DropdownMenu, Flex, Table } from "@radix-ui/themes";
import AddOrderCard from "@/components/AddOrderCard";
import supabase from "../supabase";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import DotMenu from "@/components/DotMenu";

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
        {data.map((data, rowIndex) =>(
        <Table.Row key={rowIndex}>
          {keys.map((key, colIndex) =>(
          <Table.Cell key={colIndex}>
            {data[key]}
          </Table.Cell>
          ))}
          <Table.Cell>
            <DotMenu/>
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