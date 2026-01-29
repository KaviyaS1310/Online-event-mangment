import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Destroy the session key
    navigate('/login');
  };

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      padding: '1rem', 
      background: '#2c3e50', 
      color: 'white',
      marginBottom: '20px' 
    }}>
      <h2>EventManager</h2>
      <button 
        onClick={handleLogout} 
        style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '5px 15px', cursor: 'pointer', borderRadius: '4px' }}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;