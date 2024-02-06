import { useNavigate } from 'react-router-dom'
import { IonHeader, IonLabel, IonSegment, IonSegmentButton, IonToolbar } from '@ionic/react'

export const TabHeader = () => {
  const navigate = useNavigate()
  return (
    <>
      <IonHeader>
        <IonToolbar color="success" id="titleBar">
          <IonSegment value="all">
            <IonSegmentButton value="all" onClick={() => navigate('/')}>
              <IonLabel>Mainboard</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="history" onClick={() => navigate('/history')}>
              <IonLabel>履歴</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
    </>
  )
}
