import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const navbarStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 32px',
    background: 'white',
    borderBottom: '1px solid #e5e7eb',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 100
  };

  const logoStyles = {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1a1a1a',
    margin: 0
  };

  const navActionsStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  };

  const userInfoStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: '#6b7280',
    fontSize: '14px'
  };

  const avatarStyles = {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: '#2563eb',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: '600'
  };

  const logoutButtonStyles = {
    background: '#dc2626',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease'
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <nav style={navbarStyles}>
      <h1 style={logoStyles}>EventManager</h1>
      
      <div style={navActionsStyles}>
        <div style={userInfoStyles}>
          <div style={avatarStyles}>
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <span>Welcome, {user.name || 'User'}</span>
        </div>
        
        <button 
          onClick={handleLogout} 
          style={logoutButtonStyles}
          onMouseOver={(e) => e.target.style.background = '#b91c1c'}
          onMouseOut={(e) => e.target.style.background = '#dc2626'}
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;