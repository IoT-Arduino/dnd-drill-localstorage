import { useNavigate, useLocation } from 'react-router-dom'
import styles from './TabHeader.module.scss'
import { useEffect, useState } from 'react'
import { GrDomain } from 'react-icons/gr'
import { SiDatabricks } from 'react-icons/si'

type ActiveTab = 'main' | 'history'

export const TabHeader = () => {
  const navigate = useNavigate()
  let location = useLocation()

  const [activeTab, setActiveTab] = useState<ActiveTab>('main')

  useEffect(() => {
    const currentTab = location.pathname.replace(/^\//, '') === 'history' ? 'history' : 'main'
    setActiveTab(currentTab)
  }, [])

  return (
    <div className={styles['tab-header-wrapper']} id="titleBar">
      <div className={styles['tab-header-inner']}>
        <p
          className={activeTab === 'main' ? styles['tab-header-text-active'] : styles['tab-header-text']}
          onClick={() => {
            setActiveTab('main')
            navigate('/')
          }}
        >
          <GrDomain style={{ marginRight: '8px' }} />
          メイン
        </p>
        <p
          className={activeTab === 'history' ? styles['tab-header-text-active'] : styles['tab-header-text']}
          onClick={() => {
            setActiveTab('history')
            navigate('/history')
          }}
        >
          <SiDatabricks style={{ marginRight: '8px' }} />
          履歴
        </p>
      </div>
    </div>
  )
}
