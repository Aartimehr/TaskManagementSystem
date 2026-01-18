import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      
      // Store the token so the user stays logged in
      localStorage.setItem('token', res.data.token);
      
      // Optional: Store username if your backend sends it
      if (res.data.username) {
        localStorage.setItem('username', res.data.username);
      }

      // SUCCESS: Redirect to the Dashboard instead of the Home page
      navigate('/dashboard'); 
      
    } catch (err) { 
      console.error(err);
      alert("Login Failed: Please check your email and password."); 
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin} className="auth-form">
        <h2>Login to your Dashboard</h2>
        <input 
          type="email" 
          placeholder="Email Address" 
          required 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          required 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit">Login</button>
        <p>
          Don't have an account? <span onClick={() => navigate('/register')} style={{color: 'blue', cursor: 'pointer'}}>Register here</span>
        </p>
      </form>
    </div>
  );
};

export default Login;