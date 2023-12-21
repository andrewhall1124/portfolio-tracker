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
    }
  ]

  return(
    <>
      <div className="flex flex-col items-start">
        <table>
          <thead>
            <tr>
              {headers.map((header, index) =>(
                <td key={index}>{header}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) =>(
              <tr key={rowIndex}>
                {data.map((key, colIndex) =>{
                  <td key={colIndex}>{row[key]}</td>
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}