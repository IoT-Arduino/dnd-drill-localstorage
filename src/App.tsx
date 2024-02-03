import '@ionic/react/css/core.css'
import { IonApp, IonPage, setupIonicReact } from '@ionic/react'

import './App.css'
import { MainBoard } from './Components/MainBoard'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

setupIonicReact()

const App = () => {
  return (
    <IonApp>
      <IonPage>
        <MainBoard />
      </IonPage>
    </IonApp>
  )
}

export default App
