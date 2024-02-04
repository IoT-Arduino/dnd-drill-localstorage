import '@ionic/react/css/core.css'
import { setupIonicReact } from '@ionic/react'

import './App.css'
import { MainBoard } from './Components/MainBoard'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'


setupIonicReact()

const App = () => {
  return (
    <>
        <MainBoard />
    </>
  )
}

export default App
