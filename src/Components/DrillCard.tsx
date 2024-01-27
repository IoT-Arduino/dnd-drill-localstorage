import { useState } from 'react'
import { Drill, Id } from '../types/types'
import styles from './DrillCard.module.scss'

type Props = {
  drill: Drill
  deleteDrill: (id: Id) => void
}

export const DrillCard = ({ drill, deleteDrill }: Props) => {
  const [mouseIsOver, setMouseIsOver] = useState(false)
  return (
    <div
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
