import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import styles from './MainBoard.module.scss'
import { Column, Id, Drill } from '../types'
import { ColumnContainer } from './ColumnContainer'

const PresetColumns: Column[] = [
  {
    id: 'drill',
    title: '明日のドリル'
  },
  {
    id: 'stock',
    title: 'ドリルストック'
  }
]

export const Mainboard = () => {
  const [columns] = useState<Column[]>(PresetColumns)
  const [drills, setDrills] = useState<Drill[]>([])

  const createDrill = (columnId: Id) => {
    const uniqueId = uuidv4()
    const newDrill: Drill = {
      id: uniqueId,
      columnId,
      content: `Drill ${drills.length + 1}`
    }
    setDrills([...drills,newDrill])
  }

  return (
    <div className={styles['main-wrapper']}>
      <div className={styles['context-wrapper']}>
        <div className={styles['context-wrapper-sortable']}>
          {columns.map((col) => {
            return (
              <ColumnContainer
                key={col.id}
                column={col}
                drills={drills.filter((drill) => drill.columnId === col.id)}
                createDrill={createDrill}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
