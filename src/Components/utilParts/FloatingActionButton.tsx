import styles from './FloagintActionButton.module.scss'
import { IonIcon } from '@ionic/react'
import { chevronUpCircleOutline, chevronDownCircleOutline } from 'ionicons/icons'
import { Link as Scroll } from 'react-scroll'

export const FloatingActionButton = () => {
  return (
    <div className={styles['fab-wrapper']}>
      {/* <input id="fabCheckbox" type="checkbox" className={styles['fab-checkbox']} />
      <label className={styles['fab']} htmlFor="fabCheckbox">
        <span className={`${styles['fab-dots']} ${styles['fab-dots-1']}`}></span>
        <span className={`${styles['fab-dots']} ${styles['fab-dots-2']}`}></span>
        <span className={`${styles['fab-dots']} ${styles['fab-dots-3']}`}></span>
      </label> */}
      <div className={styles['fab-wheel']}>
        <Scroll
          to="titleBar"
          className={`${styles['fab-action']} ${styles['fab-action-1']}`}
          smooth={true}
          duration={600}
          offset={-50}
        >
          <IonIcon icon={chevronUpCircleOutline}></IonIcon>
        </Scroll>
        <Scroll
          to="stock"
          className={`${styles['fab-action']} ${styles['fab-action-2']}`}
          smooth={true}
          duration={600}
          offset={-50}
        >
          <IonIcon icon={chevronDownCircleOutline}></IonIcon>
        </Scroll>
      </div>
    </div>
  )
}
