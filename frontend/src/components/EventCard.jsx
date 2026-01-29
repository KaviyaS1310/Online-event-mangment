// // const EventCard = ({ event }) => {
// //   return (
// //     <div style={{ 
// //       border: '1px solid #ddd', 
// //       padding: '15px', 
// //       borderRadius: '8px', 
// //       margin: '10px 0',
// //       boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
// //     }}>
// //       <h3 style={{ color: '#2c3e50', margin: '0 0 10px 0' }}>{event.title}</h3>
// //       <p style={{ color: '#7f8c8d' }}>{event.description}</p>
// //       <div style={{ fontWeight: 'bold', color: '#27ae60' }}>
// //         Capacity: {event.capacity}
// //       </div>
// //     </div>
// //   );
// // };

// // export default EventCard;

// import API from '../api';

// const EventCard = ({ event, refresh }) => {
//   const handleRegister = async () => {
//     try {
//       await API.post(`/events/${event._id}/register`);
//       alert("Registered!");
//       refresh();
//     } catch (err) { alert(err.response?.data?.message || "Error"); }
//   };

//   return (
//     <div className="event-card-styled"> {/* Use Dashboard.css classes */}
//       <h3>{event.title}</h3>
//       <p>{event.description}</p>
//       <p>Spots: {event.capacity}</p>
//       <button onClick={handleRegister} className="register-btn">Register</button>
//     </div>
//   );
// };
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

  const viewParticipants = () => {
    // For now, we show an alert with names. 
    // In a real app, this would open a Modal.
    const names = event.participants?.map(p => p.name).join(", ") || "No one registered yet";
    alert(`Participants: ${names}`);
  };

  return (
    <div style={cardStyle}>
      <h3>{event.title}</h3>
      <p style={{ color: '#bbb', fontSize: '0.9rem' }}>{event.description}</p>
      <div style={{ margin: '15px 0', fontWeight: 'bold' }}>
        Spots Left: {event.capacity}
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={handleRegister} className="btn-register">Register</button>
        <button onClick={viewParticipants} className="btn-view">Participants</button>
      </div>
    </div>
  );
};

const cardStyle = {
  backgroundColor: '#1e1e2f',
  padding: '20px',
  borderRadius: '12px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
  border: '1px solid #333'
};

export default EventCard; // Essential to fix ESLint error