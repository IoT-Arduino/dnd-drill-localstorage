import { useStorage } from '../../hooks/useStorage'
import { TabHeader } from '../utilParts/TabHeader'

import styles from './History.module.scss'

export const History = () => {
  const { drillHistory } = useStorage()

  return (
    <>
      <TabHeader />
      <div className={styles['history-wrapper']}>
        {drillHistory.map((drill, i) => {
          return (
            <div>
              <p className={styles['history-date']}>{drill.date}</p>
              <div key={i} className={styles['history-item']}>
                <p className={styles['history-memo']}>今日のメモ : {drill.memo}</p>
                <p className={styles['history-drill-title']}>今日実施したドリル</p>
                <ul className={styles['history-list']}>
                  {drill.drillItemsChecked.map((item) => {
                    return (
                      <li key={item.id} className={styles['history-list-item']}>
                        {item.content}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
