import { useState } from 'react'
import { Drill, Id } from '../types/types'
import styles from './DrillCard.module.scss'

type Props = {
  drill: Drill
  deleteDrill: (id: Id) => void
  updateDrill:(id:Id , content:string) =>  void
}

export const DrillCard = ({ drill, deleteDrill, updateDrill }: Props) => {
  const [mouseIsOver, setMouseIsOver] = useState(false)
  const [editMode, setEditMode] = useState(false)

  const toggleEditMode = () => {
    setEditMode((prev) => !prev)
    setMouseIsOver(false)
  }

  if (editMode) {
    return (
      <div key={drill.id} className={styles['drill-item-edit']}>
        <textarea className={styles['task-text-area']}
          value={drill.content}
          autoFocus
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) toggleEditMode()
          }}
          onChange={e => updateDrill(drill.id, e.target.value)}
        ></textarea>
      </div>
    )
  }

  return (
    <div
      onClick={toggleEditMode}
      key={drill.id}
      className={styles['drill-item']}
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
    >
      <p className={styles['task-item-content']}>{drill.content}</p>
      {mouseIsOver && (
        <button className={styles['task-item-button']} onClick={() => deleteDrill(drill.id)}>
          x
        </button>
      )}
    </div>
  )
}
