import { Routes, Route } from 'react-router-dom'
import TaskList from './pages/TaskList'
import TaskItem from './pages/TaskItem'
import TaskForm from './pages/TaskForm'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/task/:id" element={<TaskItem />} />
        <Route path="/task-form" element={<TaskForm />} />
        <Route path="/task-form/:id" element={<TaskForm />} />
      </Routes>
    </div>
  )
}

export default App
