import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [taskData, setTaskData] = useState({
    title: '',
    scheduledTime: '',
    description: '', 
  });

  const API_URL = 'http://localhost:5000/api/tasks';
  const token = localStorage.getItem('token');

  // 1. Fetch all tasks on component load
 const fetchTasks = async () => {
  // 1. Get the token right before the call
  const token = localStorage.getItem('token'); 

  if (!token) {
    console.error("No token found, redirecting to login...");
    navigate('/login');
    return;
  }

  try {
    const res = await axios.get('http://localhost:5000/api/tasks', {
      headers: { 
        // 2. Ensure it says 'Bearer ' followed by the token
        Authorization: `Bearer ${token}` 
      }
    });
    setTasks(res.data);
  } catch (err) {
    console.error("Error fetching tasks:", err);
  }
};
  // 2. Add Task - Updates count instantly
  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(API_URL, taskData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Update state manually so counts change immediately
      setTasks((prev) => [...prev, res.data]);
      
      // Reset form
      setTaskData({ title: '', scheduledTime: '', description: '' });
    } catch (err) {
      alert("Error adding task. Check backend connection.");
    }
  };

  // 3. Toggle Status (Pending <-> Completed)
  const toggleStatus = async (task) => {
    const newStatus = task.status === 'pending' ? 'completed' : 'pending';
    try {
      await axios.put(`${API_URL}/${task.id}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Map through state to update the specific task status
      setTasks(tasks.map(t => t.id === task.id ? { ...t, status: newStatus } : t));
    } catch (err) {
      alert("Update failed");
    }
  };

  // 4. Delete Task
  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  // Derived State (Calculates counts automatically every render)
  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const completedTasks = tasks.filter(t => t.status === 'completed');

  return (
    <div className="dashboard-container">
      <header className="dash-header">
        <h1>Task Management Dashboard</h1>
        <div className="stats-container">
          <div className="stat-box">Total: <span>{tasks.length}</span></div>
          <div className="stat-box pending">Pending: <span>{pendingTasks.length}</span></div>
          <div className="stat-box completed">Completed: <span>{completedTasks.length}</span></div>
        </div>
      </header>

      {/* Task Entry Section */}
      <section className="entry-section">
        <form onSubmit={handleAddTask} className="task-form">
          <h3>Allot New Task</h3>
          <input 
            type="text" placeholder="Task Title" required 
            value={taskData.title} onChange={(e) => setTaskData({...taskData, title: e.target.value})}
          />
          <input 
            type="datetime-local" 
            value={taskData.scheduledTime} onChange={(e) => setTaskData({...taskData, scheduledTime: e.target.value})}
          />
          <textarea 
            placeholder="Pending Reason / Description" 
            value={taskData.description} onChange={(e) => setTaskData({...taskData, description: e.target.value})}
          />
          <button type="submit" className="add-btn">Add to List</button>
        </form>
      </section>

      <div className="task-columns">
        {/* PENDING LIST */}
        <div className="column">
          <h2 className="title-pending">⏳ Pending Tasks ({pendingTasks.length})</h2>
          <ul className="task-list">
            {pendingTasks.map(task => (
              <li key={task.id} className="task-card">
                <div className="task-info">
                  <strong>{task.title}</strong>
                  <p>{task.description}</p>
                  <small>Due: {task.scheduledTime ? new Date(task.scheduledTime).toLocaleString() : 'No time set'}</small>
                </div>
                <div className="task-actions">
                  <button onClick={() => toggleStatus(task)} className="done-btn">✔ Complete</button>
                  <button onClick={() => deleteTask(task.id)} className="del-btn">🗑</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* COMPLETED LIST */}
        <div className="column">
          <h2 className="title-completed">✅ Completed Tasks ({completedTasks.length})</h2>
          <ul className="task-list">
            {completedTasks.map(task => (
              <li key={task.id} className="task-card task-done">
                <div className="task-info">
                  <del>{task.title}</del>
                  <p className="small-text">Finished Successfully</p>
                </div>
                <div className="task-actions">
                  <button onClick={() => toggleStatus(task)} className="undo-btn">↩ Undo</button>
                  <button onClick={() => deleteTask(task.id)} className="del-btn">🗑</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;