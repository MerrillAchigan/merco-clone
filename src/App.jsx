import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Style from './components/Style'
import Cards from './components/Cards'
import Comforts from './components/Comforts'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Hero />
      <Style />
      <Cards />
   
    </>
  )
}

export default App
