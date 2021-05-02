import mockData from '../asset/MOCK_DATA.json'
import COLUMNS from './columns'
import { useTable, useSortBy, usePagination, useColumnOrder } from 'react-table'
import { useMemo } from 'react'
import { useSticky } from 'react-table-sticky'


const Table = () => {
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => mockData, [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    state,
    setPageSize,
    setColumnOrder,
    visibleColumns,
    getToggleHideAllColumnsProps,
    allColumns,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    usePagination,
    useColumnOrder,
    useSticky
  )

  const columnOrder = (arr) => {
    const columnArray = [...arr]
    const randomArr = []
    while (columnArray.length) {
      const random = Math.floor(Math.random() * columnArray.length)
      randomArr.push(columnArray.splice(random, 1)[0])
    }
    return randomArr
  }
  const changeColumnOrder = () => setColumnOrder(columnOrder(visibleColumns.map(column => column.id)))


  const sticky = (column) => {
    const arr = [...columns]
    arr.splice(column.id, 1)
    arr.unshift(column)
    setColumnOrder(arr.map((a) => a.id))
  }

  return <div className="table">
    <div className="hide-columns">
      <label>
        <input type="checkBox" {...getToggleHideAllColumnsProps()} />
      All columns
      </label>


      {allColumns.map((column, i) => (
        <div key={i}>
          <label>
            <input type="checkbox" {...column.getToggleHiddenProps()} />
            {column.Header}
          </label>
        </div>
      ))}
    </div>
    <br></br>
    <button onClick={changeColumnOrder}>change column order</button>

    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                <label>
                  <input type="checkbox" onChange={() => sticky(column)} />
                </label>
                {column.render("Header")}
                {column.isSorted ? (column.isSortedDesc ? <i className="fas fa-sort-up"></i> : <i className="fas fa-sort-down"></i>) : ""}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {page.map(row => {
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
    <div className="pagination">
      <button onClick={() => previousPage()}>previousPage</button>
      <button onClick={() => nextPage()}>nextPage</button>
      <p>Page number: {state.pageIndex + 1}</p>
      <p>Choose size:</p> <select
        value={state.pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}>
        {[10, 20, 30].map(size => {
          return <option key={size} value={size}>{size}</option>
        })}
      </select>

    </div>
  </div>
}

export default Table