

import getPortfolio from "@/data/getPortfolio"
import { Flex, Table } from "@radix-ui/themes"
import dayjs from "dayjs"

export default async function HomePage(){
  const rows = await getPortfolio()

  const headers = [
    'Ticker',
    'Current Price',
    'Beta',
    'Return'
  ]

  const data = [
    'ticker',
    'current_price',
    'beta',
    'return_td'
  ]

  return(
    <>
      <Flex direction='column' align='start' p='4'>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              {headers.map((header, index) =>(
                <Table.ColumnHeaderCell key={index}>{header}</Table.ColumnHeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {rows.map((row, rowIndex) =>(
              <Table.Row key={rowIndex}>
                {data.map((data, colIndex) =>(
                  <Table.Cell key={colIndex}>{row[data]}</Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>  
      </Flex>
    </>
  )
}