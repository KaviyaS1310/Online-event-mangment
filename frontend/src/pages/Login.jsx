// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import API from '../api';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await API.post('/auth/login', { email, password });
//       localStorage.setItem('token', data.token);
//       navigate('/dashboard');
//     } catch (err) {
//       alert(err.response?.data?.message || "Login Failed");
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Admin Login</h2>
//       <form onSubmit={handleLogin}>
//         <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
//         <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import API from '../api';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       // Send the request to your backend
//       const { data } = await API.post('/auth/login', { email, password });
      
//       // Save the token for the Dashboard to use
//       localStorage.setItem('token', data.token);
      
//       alert("Login Successful!");
//       navigate('/dashboard');
//     } catch (err) {
//       // This will now show you the SPECIFIC error from the backend
//       console.error("Login Error Details:", err.response?.data);
//       alert(err.response?.data?.message || "Login Failed: Check your console (F12)");
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Admin Login</h2>
//       <form onSubmit={handleLogin}>
//         <div style={{ marginBottom: '10px' }}>
//           <input 
//             id="email"
//             name="email"
//             type="email" 
//             placeholder="Email" 
//             value={email}
//             onChange={(e) => setEmail(e.target.value)} 
//             required 
//           />
//         </div>
//         <div style={{ marginBottom: '10px' }}>
//           <input 
//             id="password"
//             name="password"
//             type="password" 
//             placeholder="Password" 
//             value={password}
//             onChange={(e) => setPassword(e.target.value)} 
//             required 
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';
import './Login.css'; // Import the CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      alert("Login Successful!");
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="login-container">
      <div className="auth-nav">
        <Link to="/register">Register</Link>
        <Link to="/login" className="active">Login</Link>
      </div>
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login Now</button>
      </form>
    </div>
  );
};

export default Login;