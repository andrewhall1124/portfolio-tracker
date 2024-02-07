import { getPortfolio } from "@/lib/data"
import { Box, Flex, Heading, Separator, Table, Text } from "@radix-ui/themes"

export default async function HomePage(){
  const rows = await getPortfolio()

  const headers = [
    'Ticker',
    'Shares',
    'Average Cost',
    'Beta',
    'Current Price',
    'Return to Date'
  ]

  const getBackgroundColor = (value) => {
    let hue = 0
    if (value < 0) {
      // When the value is -50 the hue should be 0,
      // when the value is 0 the hue should be 60
      hue = 60 + value - 10
    } else {
      // When the value is 100 the hue should be 130
      // When the value is 0 the hue should be 90
      hue = 80 + (value * .5)
    }
    const hsl = `hsl(${hue}, 50%, 50%)`;
    return hsl;
  };

  return(
    <>
      {/* Desktop */}
      <div className="hidden sm:block">
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
              {rows.map((row, index) =>(
                <Table.Row key={index}>
                  <Table.Cell>{row.ticker}</Table.Cell>
                  <Table.Cell>{row.num_shares}</Table.Cell>
                  <Table.Cell>${row.average_cost}</Table.Cell>
                  <Table.Cell>{row.beta}</Table.Cell>
                  <Table.Cell>${row.current_price}</Table.Cell>
                  {(row.ticker == 'XPEL') || (row.ticker == "LRCX") ?
                  <Table.Cell style={{color: getBackgroundColor(-row.return_td)}}>{-row.return_td}%</Table.Cell>
                  :
                  <Table.Cell style={{color: getBackgroundColor(row.return_td)}}>{row.return_td}%</Table.Cell>
                  }
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>  
        </Flex>
      </div>

      {/* Mobile */}
      <div className="sm:hidden">
        <Separator size='4'/>
        <div className="p-4 flex justify-between items-center">
          <Heading>Holdings</Heading>
          <div>Return since purchase</div>
        </div>
        <Separator size='4'/>
        <Flex direction='column'>
          {rows.map((row,index)=>(
          <>
            <Flex p='4' justify='between' align='center' key={index}>
              <Flex direction='column' align='start'>
                <Text size='5'>{row.ticker}</Text>
                <Text size='3' color='gray'>{row.num_shares} Shares</Text>
              </Flex>
              <div style={{background: getBackgroundColor(row.return_td)}} className="p-2 rounded-xl w-[90px] flex justify-center items-center">
                {(row.ticker == 'XPEL') || (row.ticker == "LRCX") ? -row.return_td : row.return_td}
              </div>
            </Flex>
            <Separator size='4'/>
          </>
          ))}
        </Flex>
      </div>
    </>
  )
}