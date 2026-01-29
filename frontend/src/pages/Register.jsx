import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';
import './Login.css'; 

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'admin' });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', formData);
      alert("Account Created!");
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="login-container">
      <div className="auth-nav">
        <Link to="/register" className="active">Register</Link>
        <Link to="/login">Login</Link>
      </div>
      <form className="login-form" onSubmit={handleRegister}>
        <h2>Register</h2>
        <input type="text" placeholder="Full Name" onChange={(e) => setFormData({...formData, name: e.target.value})} required />
        <input type="email" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
        <input type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
        <button type="submit">Register Now</button>
      </form>
    </div>
  );
};

export default Register;