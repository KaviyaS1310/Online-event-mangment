import { useEffect, useState, useCallback } from 'react';
import API from '../api';
import Navbar from '../components/Navbar';
import EventCard from '../components/EventCard';
import './Dashboard.css';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newEvent, setNewEvent] = useState({ 
    title: '', 
    description: '', 
    date: '', 
    location: '', 
    capacity: '' 
  });

  const fetchEvents = useCallback(async () => {
    try {
      const { data } = await API.get('/events');
      setEvents(data);
    } catch (err) { 
      console.error("Failed to fetch events:", err); 
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleAddEvent = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await API.post('/events', newEvent);
      setNewEvent({ title: '', description: '', date: '', location: '', capacity: '' });
      fetchEvents();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add event. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      
      <div className="dashboard-content">
        <div className="page-header">
          <h1 className="page-title">Event Management</h1>
          <p className="page-subtitle">Create and manage your events efficiently</p>
        </div>

        <section className="admin-section">
          <h2 className="section-title">Create New Event</h2>
          
          <form className="add-event-form" onSubmit={handleAddEvent}>
            <div className="form-group">
              <label className="form-label" htmlFor="title">Event Title</label>
              <input 
                id="title"
                type="text" 
                placeholder="Enter event title" 
                value={newEvent.title}
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})} 
                required 
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="capacity">Capacity</label>
              <input 
                id="capacity"
                type="number" 
                placeholder="Maximum attendees" 
                value={newEvent.capacity}
                onChange={(e) => setNewEvent({...newEvent, capacity: e.target.value})} 
                required 
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="date">Event Date & Time</label>
              <input 
                id="date"
                type="datetime-local" 
                value={newEvent.date}
                onChange={(e) => setNewEvent({...newEvent, date: e.target.value})} 
                required 
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="location">Location</label>
              <input 
                id="location"
                type="text" 
                placeholder="Event location (optional)" 
                value={newEvent.location}
                onChange={(e) => setNewEvent({...newEvent, location: e.target.value})} 
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="description">Description</label>
              <textarea 
                id="description"
                placeholder="Describe your event..." 
                value={newEvent.description}
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})} 
                required 
              />
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn-primary" disabled={isLoading}>
                {isLoading ? 'Creating...' : '+ Create Event'}
              </button>
            </div>
          </form>
        </section>

        <section className="events-section">
          <div className="events-header">
            <h2 className="section-title">Manage Events</h2>
            <span className="events-count">{events.length} events</span>
          </div>
          
          {events.length > 0 ? (
            <div className="event-grid">
              {events.map(event => (
                <EventCard key={event._id} event={event} refresh={fetchEvents} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">📅</div>
              <h3>No events yet</h3>
              <p>Create your first event to get started</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;