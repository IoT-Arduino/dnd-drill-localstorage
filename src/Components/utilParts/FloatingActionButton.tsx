import styles from './FloagintActionButton.module.scss'
import { IonIcon } from '@ionic/react'
import { chevronUpCircleOutline, chevronDownCircleOutline } from 'ionicons/icons'
import { Link as Scroll } from 'react-scroll'
import { isDesktop } from 'react-device-detect'

import { FloatingActionModal } from '../modal/FloatingActionModal'
import { Id } from '../../types/types'

type Props = {
  createDrill: (columnId: Id, content: string) => void
  scrollToBottom: () => void
}

export const FloatingActionButton = (props: Props) => {
  const { createDrill, scrollToBottom } = props

  return (
    <div className={styles['fab-wrapper']}>
      {!isDesktop ? (
        <div className={styles['fab-wheel']}>
          <Scroll
            to="titleBar"
            className={`${styles['fab-action']} ${styles['fab-action-1']}`}
            smooth={true}
            duration={100}
            offset={-50}
          >
            <IonIcon icon={chevronUpCircleOutline}></IonIcon>
          </Scroll>
          <Scroll
            to="stock"
            className={`${styles['fab-action']} ${styles['fab-action-2']}`}
            smooth={true}
            duration={100}
            offset={-10}
          >
            <IonIcon icon={chevronDownCircleOutline}></IonIcon>
          </Scroll>
          <div className={`${styles['fab-action']} ${styles['fab-action-3']}`}>
            <FloatingActionModal
              mode="createDrill"
              title="新規ドリル作成"
              textAreaLabel="ドリルの内容"
              placeHolder="ドリルの内容を入力してください"
              button1Label="作成"
              button2Label="キャンセル"
              createDrill={createDrill}
              scrollToBottom={scrollToBottom}
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}
