import '@ionic/react/css/core.css';
import { setupIonicReact } from '@ionic/react';

import './App.css'
import { MainBoard } from './Components/MainBoard'

setupIonicReact();

const App = () => {
  return (
    <>
      <MainBoard />
    </>
  )
}

export default App
