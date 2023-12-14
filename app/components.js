'use client'

export function Table({headers, rows}){
  return(
    <>
      <table className="bg-slate-300 w-[800px]">
        <thead>
          <tr>
            {headers.map((header, index) =>(
              <td key={index} className="font-semibold text-lg p-2">{header}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) =>(
            <tr key={rowIndex} className={rowIndex % 2 == 0 ? 'bg-slate-200' : 'bg-slate-100'}>
              {headers.map((header, colIndex) =>(
                <td key={colIndex} className="p-2">{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}