import styles from './ColumnContainer.module.scss'
import { Column, Id, Drill } from '../types'
import { DrillCard } from './DrillCard'

type Props = {
  column: Column
  drills: Drill[]
}

export const ColumnContainer = (props: Props) => {
  const { column, drills } = props
  return (
    <div className={styles['column-container']}>
      {/* column title */}
      <div className={styles['column-title']}>
        <div>{column.title}</div>
      </div>
      {/* column drill container */}
      <div className={styles['column-task-container']}>
        <DrillCard />
      </div>
      {/* Column footer */}
      <button className={styles['column-footer']}>ドリルを追加</button>
    </div>
  )
}
