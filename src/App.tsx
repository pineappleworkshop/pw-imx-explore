import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import { CarDataProvider } from './Providers/CarContext'
// import { Race } from "./Race";
import { TransferProvider } from './Contexts/TransferContext'
import { ImutableXProvider } from './Contexts/ImutableXContext'
import HeaderNav from './Components/HeaderNav'
import Marketplace from './Marketplace'
import Inventory from './Components/Inventory'
import Racetrack from './Racetrack'
import Chopshop from './Chopshop'

require('dotenv').config()

const App = () => {
  return (
    <ImutableXProvider>
      <TransferProvider>
        <CarDataProvider>
          <div className="App bg-img">
            <Router>
              <HeaderNav />

              <Routes>
                <Route path="/" element={<Marketplace />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/racetrack" element={<Racetrack />} />
                <Route path="/chopshop" element={<Chopshop />} />
              </Routes>
            </Router>
            {/* <div>Active wallet: {wallet}</div>
      <div>ETH balance (in wei): {balance?.balance?.toString()}</div> */}
          </div>
        </CarDataProvider>
      </TransferProvider>
    </ImutableXProvider>
  )
}

export default App
