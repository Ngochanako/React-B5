import React from 'react'
import Todolist from './components/Todolist'
import './components/style.css'
import Modal from './components/Modal'
import B3 from './components/B3/B3'
import B2 from './components/B2/B2'
export default function App() {
  return (
    <div className='app-container'>
      <Todolist  />
      <B3 />
      <B2 />
    </div>
  )
}
