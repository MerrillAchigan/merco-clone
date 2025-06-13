import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Style from './components/Style'
import Cards from './components/Cards'
import Quality from './components/Quality'
import QualityCards from './components/QualityCards'
import Pioneering from './components/Pioneering'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Hero />
      <Style />
      <Cards />
      <Quality />
      <QualityCards />
      <Pioneering />
    </>
  )
}

export default App
