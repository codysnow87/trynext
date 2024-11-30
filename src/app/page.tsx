'use client';

import { useState, useEffect } from 'react';
import TimeDisplay from './components/TimeDisplay'


interface Task {
  id: number;
  title: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch tasks from the API on load
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      const response = await fetch('/api/tasks');
      const data: Task[] = await response.json();
      setTasks(data);
      setLoading(false);
    };

    fetchTasks();
  }, []);

  // Add a new task
  const addTask = async () => {
    if (!newTask.trim()) return;

    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTask }),
    });

    if (response.ok) {
      const addedTask: Task = await response.json();
      setTasks([...tasks, addedTask]);
      setNewTask('');
    }
  };

  // Delete a task
  const deleteTask = async (id: number) => {
    const response = await fetch('/api/tasks', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  return (
      <div style={{padding: '20px', fontFamily: 'Arial, sans-serif', color: 'black'}}>
        <h1>Task Manager</h1>

        <div>
          <input
              type="text"
              placeholder="Enter a new task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              style={{padding: '10px', marginRight: '10px'}}
          />
          <button onClick={addTask} style={{padding: '10px 20px'}}>Add Task</button>
        </div>

        {loading ? (
            <p>Loading tasks...</p>
        ) : (
            <ul style={{marginTop: '20px'}}>
              {tasks.map(task => (
                  <li key={task.id} style={{marginBottom: '10px'}}>
                    {task.title}
                    <button
                        onClick={() => deleteTask(task.id)}
                        style={{
                          marginLeft: '10px',
                          padding: '5px 10px',
                          color: 'white',
                          background: 'red',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                    >
                      Delete
                    </button>
                  </li>
              ))}
            </ul>
        )}

        <TimeDisplay/>

      </div>


)
  ;
}
