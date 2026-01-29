// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import API from '../api';

// const Register = () => {
//   const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'admin' });
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       await API.post('/auth/register', formData);
//       alert("Registration Successful! Please login.");
//       navigate('/login');
//     } catch (err) {
//       alert(err.response?.data?.message || "Registration Failed");
//     }
//   };

//   return (
//     <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto', border: '1px solid #ccc', borderRadius: '8px' }}>
//       <h2>Create Admin Account</h2>
//       <form onSubmit={handleRegister}>
//         <input style={{ display: 'block', width: '100%', marginBottom: '10px' }} type="text" placeholder="Full Name" onChange={(e) => setFormData({...formData, name: e.target.value})} required />
//         <input style={{ display: 'block', width: '100%', marginBottom: '10px' }} type="email" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
//         <input style={{ display: 'block', width: '100%', marginBottom: '10px' }} type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
//         <button type="submit" style={{ width: '100%', padding: '10px', background: '#3498db', color: '#fff', border: 'none', borderRadius: '4px' }}>Register</button>
//       </form>
//       <p>Already have an account? <Link to="/login">Login here</Link></p>
//     </div>
//   );
// };

// export default Register;
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