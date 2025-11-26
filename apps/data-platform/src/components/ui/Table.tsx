import { ReactNode } from 'react'
import './Table.css'

interface Column<T> {
  key: string
  header: string
  render?: (row: T) => ReactNode
  width?: string
}

interface TableProps<T> {
  data: T[]
  columns: Column<T>[]
  className?: string
  onRowClick?: (row: T) => void
}

export function Table<T extends Record<string, any>>({
  data,
  columns,
  className = '',
  onRowClick
}: TableProps<T>) {
  return (
    <div className={`table-container ${className}`}>
      <table className="table">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key} style={{ width: col.width }}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              onClick={() => onRowClick?.(row)}
              className={onRowClick ? 'clickable' : ''}
            >
              {columns.map(col => (
                <td key={col.key}>
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
