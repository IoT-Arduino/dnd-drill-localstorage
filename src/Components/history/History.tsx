import { useStorage } from '../../hooks/useStorage'
import { TabHeader } from '../utilParts/TabHeader'

export const History = () => {
  const { drillHistory } = useStorage()

  return (
    <>
      <TabHeader />

      <div>
        {drillHistory.map((drill,i) => {
          return (
            <div key={i}>
              <p>{drill.date}</p>
              <p>memo:{drill.memo}</p>
              <ul>
                {drill.drillItemsChecked.map((item) => {
                  return <li key={item.id}>{item.content}</li>
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </>
  )
}
