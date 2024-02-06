import styles from './FloagintActionButton.module.scss'
import { IonIcon } from '@ionic/react'
import { chevronUpCircleOutline, chevronDownCircleOutline } from 'ionicons/icons'
import { Link as Scroll } from 'react-scroll'

export const FloatingActionButton = () => {
  return (
    <div className={styles['fab-wrapper']}>
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
      </div>
    </div>
  )
}
