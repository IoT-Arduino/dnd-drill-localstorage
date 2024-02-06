import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { setupIonicReact } from '@ionic/react'
import '@ionic/react/css/core.css'
import '@ionic/react/css/normalize.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css'
import { MainBoard } from './Components/MainBoard'
import { History } from './Components/history/History'

setupIonicReact()

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainBoard />} />
        <Route path="/history" element={<History/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
