'use client'

export function Table({names, headers, rows}){
  return(
    <>
      <table className="bg-slate-300">
        <thead>
          <tr>
            {names.map((name, index) =>(
              <td key={index} className="font-semibold text-lg p-2">{name}</td>
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