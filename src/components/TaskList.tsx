import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if(newTaskTitle.length>2){
      const nTask:Task = {
        id:Math.random()*1000,
        isComplete:false,
        title : newTaskTitle
      };
      setTasks([...tasks,nTask])
    }
  }

  function handleToggleTaskCompletion(id: number) {
    
    const indexTask = tasks.findIndex(task=> task.id===id)
    const updateTask = tasks[indexTask]
    updateTask.isComplete = true

    const otherTasks = tasks.filter((task,index,arr)=>
      {return task.id!=id}
      )
    setTasks([...otherTasks,updateTask])
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    setTasks(tasks.filter((value,index,arr)=>{
      return value.id!=id
    }))
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}