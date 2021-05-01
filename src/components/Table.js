import mockData from '../asset/MOCK_DATA.json'
import COLUMNS from './columns'
import { useTable } from 'react-table'
import { useMemo } from 'react'


const Table = () => {
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => mockData, [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data
    }
  )

  return <div>
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              })}

            </tr>
          )
        })}
      </tbody>

    </table>
  </div>
}

export default Table