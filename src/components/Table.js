import mockData from '../asset/MOCK_DATA.json'
import COLUMNS from './columns'
import { useTable, useSortBy, usePagination, useRowSelect, useGroupBy, useColumnOrder } from 'react-table'
import { useMemo } from 'react'


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
    prepareRow
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    usePagination,
    useColumnOrder,
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
  return <div>
    <div className="hide-columns">
      <input type="checkBox" id="allColumns" {...getToggleHideAllColumnsProps()} />
      <label htmlFor="allColumns">All columns</label>

      {allColumns.map(column => (
        <div key={column.id}>
          <input type="checkbox" id='column' {...column.getToggleHiddenProps()} />
          <label htmlFor="column">{column.Header}</label>
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
                {column.render("Header")}
                {column.isSorted ? (column.isSortedDesc ? <i class="fas fa-sort-up"></i> : <i class="fas fa-sort-down"></i>) : ""}
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