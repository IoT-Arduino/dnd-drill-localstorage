import { useMemo } from 'react'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { Column, Id, Drill } from './../types/types'
import styles from './ColumnContainer.module.scss'
import { DrillCard } from './DrillCard'

type Props = {
  column: Column
  drills: Drill[]
  createDrill: (columnId: Id) => void
  deleteDrill: (id: Id) => void
  updateDrill: (id: Id, content: string) => void
  submitDrill: () => void
}

export const ColumnContainer = (props: Props) => {
  const { column, drills, createDrill, deleteDrill, updateDrill, submitDrill } = props

  const drillsIds = useMemo(() => {
    return drills.map((drill) => drill.id)
  }, [drills])

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column
    },
    disabled: true
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  if (isDragging) {
    return <div ref={setNodeRef} style={style} className={styles['dragging-container']}></div>
  }

  return (
    <div ref={setNodeRef} style={style} className={styles['column-container']}>
      {/* column title */}
      <div {...attributes} {...listeners} className={styles['column-title']}>
        <div>{column.title}</div>
      </div>
      {/* column drill container */}
      <div className={styles['column-drill-container']}>
        <SortableContext items={drillsIds}>
          {drills.map((drill) => (
            <DrillCard
              key={drill.id}
              drill={drill}
              columnId={column.id}
              deleteDrill={deleteDrill}
              updateDrill={updateDrill}
            />
          ))}
        </SortableContext>
      </div>
      {/* Column footer */}
      {column.id === 'stock' && (
        <button
          className={styles['column-footer']}
          onClick={() => {
            createDrill(column.id)
          }}
        >
          ドリルを追加
        </button>
      )}
      {column.id === 'drill' && (
        <button
          className={styles['column-footer']}
          onClick={() => {
            submitDrill()
          }}
        >
          送信
        </button>
      )}
    </div>
  )
}
