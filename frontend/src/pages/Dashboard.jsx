// // import { useEffect, useState } from 'react';
// // import API from '../api';

// // const Dashboard = () => {
// //   const [events, setEvents] = useState([]);

// //   useEffect(() => {
// //     const fetchEvents = async () => {
// //       try {
// //         const { data } = await API.get('/events');
// //         setEvents(data);
// //       } catch (err) {
// //         console.error("Error fetching events", err);
// //       }
// //     };
// //     fetchEvents();
// //   }, []);

// //   return (
// //     <div>
// //       <h1>Event Management Dashboard</h1>
// //       <div className="event-list">
// //         {events.map(event => (
// //           <div key={event._id} className="event-card">
// //             <h3>{event.title}</h3>
// //             <p>{event.description}</p>
// //             <span>Capacity: {event.capacity}</span>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;

// // import { useEffect, useState } from 'react';
// // import API from '../api';
// // import Navbar from '../components/Navbar';
// // import EventCard from '../components/EventCard';

// // const Dashboard = () => {
// //   const [events, setEvents] = useState([]);

// //   useEffect(() => {
// //     const fetchEvents = async () => {
// //       try {
// //         const { data } = await API.get('/events');
// //         setEvents(data);
// //       } catch (err) {
// //         console.error("Error fetching events", err);
// //       }
// //     };
// //     fetchEvents();
// //   }, []);

// //   return (
// //     <div>
// //       <Navbar />
// //       <div style={{ padding: '20px' }}>
// //         <h1>Event Management Dashboard</h1>
// //         <div className="event-list">
// //           {events.length > 0 ? (
// //             events.map(event => (
// //               <EventCard key={event._id} event={event} />
// //             ))
// //           ) : (
// //             <p>No events found. Start by creating one!</p>
// //           )}
// //         </div>
// //       </div>
// //     </div>
    
// //   );
// // };

// // export default Dashboard;

// import { useEffect, useState, useCallback } from 'react';
// import API from '../api';
// import Navbar from '../components/Navbar';
// import EventCard from '../components/EventCard';
// import './Dashboard.css';

// const Dashboard = () => {
//   const [events, setEvents] = useState([]);
//   const [newEvent, setNewEvent] = useState({ title: '', description: '', capacity: '' });

//   // Fixed with useCallback to avoid cascading render error
//   const fetchEvents = useCallback(async () => {
//     try {
//       const { data } = await API.get('/events');
//       setEvents(data);
//     } catch { 
//       console.error("Failed to fetch events"); 
//     }
//   }, []);

//   useEffect(() => {
//     fetchEvents();
//   }, [fetchEvents]);

//   const handleAddEvent = async (e) => {
//     e.preventDefault();
//     try {
//       await API.post('/events', newEvent);
//       alert("Event Created!");
//       setNewEvent({ title: '', description: '', capacity: '' });
//       fetchEvents();
//     } catch {
//       alert("Failed to add event");
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       <Navbar />
//       <div className="dashboard-content">
//         <section className="admin-section">
//           <h2>Create New Event</h2>
//           <form className="add-event-form" onSubmit={handleAddEvent}>
//             <input type="text" placeholder="Event Title" value={newEvent.title}
//               onChange={(e) => setNewEvent({...newEvent, title: e.target.value})} required />
//             <textarea placeholder="Description" value={newEvent.description}
//               onChange={(e) => setNewEvent({...newEvent, description: e.target.value})} required />
//             <input type="number" placeholder="Capacity" value={newEvent.capacity}
//               onChange={(e) => setNewEvent({...newEvent, capacity: e.target.value})} required />
//             <button type="submit" className="btn-primary">Add Event</button>
//           </form>
//         </section>

//         <section className="events-display">
//           <h2>Manage Events</h2>
//           <div className="event-grid">
//             {events.map(event => (
//               <EventCard key={event._id} event={event} refresh={fetchEvents} />
//             ))}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import { useEffect, useState, useCallback } from 'react';
import API from '../api';
import Navbar from '../components/Navbar';
import EventCard from '../components/EventCard';
import './Dashboard.css';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', description: '', capacity: '' });

  // Fixed: stable reference to prevent ESLint 'cascading renders'
  const fetchEvents = useCallback(async () => {
    try {
      const { data } = await API.get('/events');
      setEvents(data);
    } catch (err) { 
      console.error("Failed to fetch events:", err); 
    }
  }, []);

  // Fixed: Correct dependency array
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      await API.post('/events', newEvent);
      alert("Event Created Successfully!");
      setNewEvent({ title: '', description: '', capacity: '' });
      fetchEvents();
    } catch {
      alert("Failed to add event. Please try again.");
    }
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <section className="admin-section">
          <h2>Create New Event</h2>
          {/* Added autoComplete="off" to prevent browser confusion */}
          <form className="add-event-form" onSubmit={handleAddEvent} autoComplete="off">
            <input 
              type="text" 
              placeholder="Event Title" 
              value={newEvent.title}
              onChange={(e) => setNewEvent({...newEvent, title: e.target.value})} 
              required 
            />
            <textarea 
              placeholder="Description" 
              value={newEvent.description}
              onChange={(e) => setNewEvent({...newEvent, description: e.target.value})} 
              required 
            />
            <input 
              type="number" 
              placeholder="Capacity" 
              value={newEvent.capacity}
              onChange={(e) => setNewEvent({...newEvent, capacity: e.target.value})} 
              required 
            />
            <button type="submit" className="btn-primary">Add Event</button>
          </form>
        </section>

        <section className="events-display">
          <h2>Manage Events</h2>
          <div className="event-grid">
            {events.map(event => (
              <EventCard key={event._id} event={event} refresh={fetchEvents} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;