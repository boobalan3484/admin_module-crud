import React from 'react'

import Layout from "./Pages/Layout"
import { AppProvider } from './Utils/Context'

function App() {

  return (
    <div className="App h-screen flex flex-col">
      <AppProvider>
        <Layout />
      </AppProvider>
    </div>
  )
}

export default App
