import React, { useState, useEffect } from 'react';
import FeedbackForm from '../../components/feedback/feedbackForm';
import API from '../../services/api';

const EventsPage = ({ user }) => {

    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await API.get('/events');
                setEvents(response.data);
            } catch (error) {
                console.error('Failed to fetch events:', error.response?.data?.msg || error.message);
            }
        };

        fetchEvents();
    }, []);

    const handleViewFeedback = async (eventId) => {
        try {
            const response = await API.get(`/feedback/${eventId}`);
            setSelectedEvent({ id: eventId, feedback: response.data });
        } catch (error) {
            console.error('Failed to fetch feedback:', error.response?.data?.msg || error.message);
        }
    };

    const handleParticipate = async (eventId) => {
        try {
            await API.post(`/events/${eventId}/participate`);
            alert('You have successfully registered for the event!');
            const response = await API.get('/events');
            setEvents(response.data);
        } catch (error) {
            console.error('Failed to participate:', error.response?.data?.msg || error.message);
        }
    };

    return (
        <div>
            <h1>Upcoming Events</h1>
            {events.length > 0 ? (
                <ul>
                    {events.map((event) => (
                        <li key={event._id}>
                            <h2>{event.title}</h2>
                            <p>{event.description}</p>
                            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                            <p>Location: {event.location}</p>
                            {user?.role === 'volunteer' && (
                                <>
                                    <button onClick={() => handleParticipate(event._id)}>Participate</button>
                                    <button onClick={() => handleViewFeedback(event._id)}>View Feedback</button>
                                    <FeedbackForm eventId={event._id} />
                                </>
                            )}
                            {selectedEvent?.id === event._id && (
                                <div>
                                    <h3>Feedback</h3>
                                    {selectedEvent.feedback.length > 0 ? (
                                        selectedEvent.feedback.map((feedback) => (
                                            <div key={feedback._id}>
                                                <p>{feedback.user.name}: {feedback.message} (Rating: {feedback.rating})</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No feedback yet.</p>
                                    )}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No events found.</p>
            )}
        </div>
    )
}

export default EventsPage;