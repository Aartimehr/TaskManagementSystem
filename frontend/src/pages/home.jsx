import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:5000/api/tasks', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks(res.data);
  };

  const addTask = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/tasks', { title }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTitle('');
    fetchTasks();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>My Tasks</h2>
      <form onSubmit={addTask}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New Task..." required />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>{task.title} - {task.status}</li>
        ))}
      </ul>
    </div>
  );
};
export default Home;