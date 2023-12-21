import { Card, Flex, Table } from "@radix-ui/themes"

export default async function HomePage(){

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

  const rows = [
    {
      ticker: 'AAPL',
      current_price: 150.26,
      beta: 1.5,
      return_td: 5
    },
    {
      ticker: 'AAPL',
      current_price: 150.26,
      beta: 1.5,
      return_td: 5
    },
    {
      ticker: 'AAPL',
      current_price: 150.26,
      beta: 1.5,
      return_td: 5
    },
    {
      ticker: 'AAPL',
      current_price: 150.26,
      beta: 1.5,
      return_td: 5
    },
  ]

  return(
    <>
      <Flex direction='column' align='start' p='4'>
        <Card>
          <Table.Root>
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
        </Card>
      </Flex>
    </>
  )
}