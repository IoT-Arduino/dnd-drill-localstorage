import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { RiDeleteBin6Fill } from 'react-icons/ri'

import { Drill, Id } from './../types/types'
import styles from './DrillCard.module.scss'

type Props = {
  drill: Drill
  deleteDrill: (id: Id) => void
  updateDrill: (id: Id, content: string) => void
  updateDrillStatus: (id: Id, status: boolean) => void
  columnId?: 'drill' | 'stock'
}

export const DrillCard = ({ drill, deleteDrill, updateDrill, updateDrillStatus, columnId }: Props) => {
  const [mouseIsOver, setMouseIsOver] = useState(false)
  const [editMode, setEditMode] = useState(false)

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: drill.id,
    data: {
      type: 'DrillItem',
      drill
    },
    disabled: editMode
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  const toggleEditMode = () => {
    setEditMode((prev) => !prev)
    setMouseIsOver(false)
  }

  if (isDragging) {
    return <div ref={setNodeRef} style={style} className={styles['drill-is-dragging']} />
  }

  if (editMode && columnId === 'stock') {
    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={styles['drill-item-edit']}>
        <textarea
          className={styles['drill-text-area']}
          value={drill.content}
          autoFocus
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.shiftKey) toggleEditMode()
          }}
          onChange={(e) => updateDrill(drill.id, e.target.value)}
        ></textarea>
      </div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={toggleEditMode}
      className={styles['drill-item']}
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
    >
      {columnId === 'drill' && (
        <div>
          <input type="checkbox" onChange={(e) => updateDrillStatus(drill.id, e.target.checked)} />
        </div>
      )}

      <p className={styles['drill-item-content']}>{drill.content}</p>

      {mouseIsOver && columnId === 'stock' && (
        <button className={styles['drill-item-button']} onClick={() => deleteDrill(drill.id)}>
          <RiDeleteBin6Fill />
        </button>
      )}
    </div>
  )
}
