import API from '../api';

const EventCard = ({ event, refresh }) => {
  const handleRegister = async () => {
    try {
      await API.post(`/events/${event._id}/register`);
      alert("Registered Successfully!");
      refresh();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await API.delete(`/events/${event._id}`);
        refresh();
      } catch (err) {
        alert(err.response?.data?.message || "Error deleting event");
      }
    }
  };

  const viewParticipants = () => {
    const names = event.participants?.map(p => p.name).join(", ") || "No one registered yet";
    alert(`Participants: ${names}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const cardStyles = {
    background: 'white',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s ease',
    overflow: 'hidden'
  };

  const headerStyles = {
    padding: '24px 24px 16px',
    borderBottom: '1px solid #f3f4f6'
  };

  const titleStyles = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1a1a1a',
    margin: '0 0 8px 0'
  };

  const descriptionStyles = {
    color: '#6b7280',
    fontSize: '14px',
    lineHeight: '1.5',
    margin: 0
  };

  const bodyStyles = {
    padding: '16px 24px'
  };

  const metaRowStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px',
    fontSize: '14px',
    color: '#6b7280'
  };

  const iconStyles = {
    fontSize: '16px'
  };

  const capacityStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    background: '#eff6ff',
    color: '#2563eb',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500'
  };

  const actionsStyles = {
    padding: '16px 24px',
    borderTop: '1px solid #f3f4f6',
    display: 'flex',
    gap: '8px'
  };

  const buttonBaseStyles = {
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: 'none',
    flex: 1
  };

  const primaryButtonStyles = {
    ...buttonBaseStyles,
    background: '#2563eb',
    color: 'white'
  };

  const secondaryButtonStyles = {
    ...buttonBaseStyles,
    background: '#f9fafb',
    color: '#374151',
    border: '1px solid #d1d5db'
  };

  const dangerButtonStyles = {
    ...buttonBaseStyles,
    background: '#dc2626',
    color: 'white'
  };

  return (
    <div style={cardStyles}>
      <div style={headerStyles}>
        <h3 style={titleStyles}>{event.title}</h3>
        <p style={descriptionStyles}>{event.description}</p>
      </div>
      
      <div style={bodyStyles}>
        {event.date && (
          <div style={metaRowStyles}>
            <span style={iconStyles}>📅</span>
            <span>{formatDate(event.date)}</span>
          </div>
        )}
        
        {event.location && (
          <div style={metaRowStyles}>
            <span style={iconStyles}>📍</span>
            <span>{event.location}</span>
          </div>
        )}
        
        <div style={metaRowStyles}>
          <span style={iconStyles}>👥</span>
          <span style={capacityStyles}>
            {event.participants?.length || 0} / {event.capacity} registered
          </span>
        </div>
      </div>
      
      <div style={actionsStyles}>
        <button 
          onClick={handleRegister} 
          style={primaryButtonStyles}
          onMouseOver={(e) => e.target.style.background = '#1d4ed8'}
          onMouseOut={(e) => e.target.style.background = '#2563eb'}
        >
          Register
        </button>
        <button 
          onClick={viewParticipants} 
          style={secondaryButtonStyles}
          onMouseOver={(e) => e.target.style.background = '#f3f4f6'}
          onMouseOut={(e) => e.target.style.background = '#f9fafb'}
        >
          View
        </button>
        <button 
          onClick={handleDelete} 
          style={dangerButtonStyles}
          onMouseOver={(e) => e.target.style.background = '#b91c1c'}
          onMouseOut={(e) => e.target.style.background = '#dc2626'}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EventCard;