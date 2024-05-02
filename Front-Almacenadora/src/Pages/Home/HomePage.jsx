import { TodoListForm } from '../../components/ListaTareas.jsx'
import { useState } from 'react'
import './HomePage.css'

export const HomePage = () => {
  const [isTask, setIsTask] = useState(true)
  const handleHomePage = () => {
    setIsTask((prev) => !prev)
  }
  return (
    <div className='home-container'>
      <TodoListForm/>
    </div>
  )
}
