import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';
import './Login.css';

const Register = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    role: 'admin' 
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await API.post('/auth/register', formData);
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="auth-nav">
        <Link to="/register" className="active">Create Account</Link>
        <Link to="/login">Sign In</Link>
      </div>
      
      <form className="login-form" onSubmit={handleRegister}>
        <h2>Create your account</h2>
        <p>Join us to start managing events</p>
        
        <div className="form-group">
          <label className="form-label" htmlFor="name">Full Name</label>
          <input 
            id="name"
            type="text" 
            placeholder="Enter your full name" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="email">Email Address</label>
          <input 
            id="email"
            type="email" 
            placeholder="Enter your email" 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="password">Password</label>
          <input 
            id="password"
            type="password" 
            placeholder="Create a password" 
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})} 
            required 
          />
        </div>
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
        
        <div className="forgot-password">
          <span>Already have an account? </span>
          <Link to="/login">Sign in here</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;