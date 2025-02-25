import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import NavBar from '../../components/nav-bar/NavBar';

const EventsPage = () => {

    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [user, setUser] = useState(null);

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

        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await API.get('/auth/me');
                    setUser(response.data);
                }
            } catch (error) {
                console.error('Failed to fetch user:', error.response?.data?.msg || error.message);
            }
        };
        fetchUser();
    }, []);


    const [users, setUsers] = useState([]);
    const fetchUsers = async () => {
        try {
            const endpoint = '/users/program-officers';
            const response = await API.get(endpoint);
            setUsers(response.data);
        } catch (error) {
            console.error('Failed to fetch users:', error.response?.data?.msg || error.message);
        }
    };

    const handleParticipate = async (eventId) => {
        try {
            const response = await API.post(`/events/${eventId}/participate`);
            if (response.data.msg) {
                return alert(response.data.msg);
            }
            alert('You have successfully registered for the event!');
            const events = await API.get('/events');
            setEvents(events.data);
        } catch (error) {
            console.error('Failed to participate:', error.response?.data?.msg || error.message);
        }
    };

    const initialState = {
        title: '',
        location: '',
        organizer: '',
        date: '',
        description: '',
    };

    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post('/events/new-event', formData);
            if (response.data) {
                setEvents([...events, response.data.event]);
            }
            setDropdown(false)
            alert('Event created successfully');
            setFormData(initialState);
        } catch (error) {
            console.error('Registration failed:', error.response?.data?.msg || error.message);
        }
    };

    const [dropdown, setDropdown] = useState(false);

    const handleDropdown = () => {
        fetchUsers()
        setDropdown(!dropdown);
    }

    const [feedbackFrom, setFeedbackForm] = useState(null);

    const handleFeedback = (index) => {
        setFeedbackForm(feedbackFrom === index ? null : index);
    }

    const [modalList, setModalList] = useState(false);

    const handleModalList = (index) => {
        setModalList(!modalList);
        setSelectedEvent(events[index]);
    }

    const [modalFeedback, setModalFeedback] = useState(false);

    const handleModalFeedback = (index) => {
        setModalFeedback(!modalFeedback);
        setSelectedEvent(events[index]);
    }

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    const [feedback, setFeedback] = useState("");

    const handleFeedbackSubmit = async (eventId) => {
        if (!feedback.trim()) {
            alert("Please enter feedback.");
            return;
        }

        const data = { feedback, userId: user._id }
        const response = await API.post(`/events/feedback/${eventId}`, data);
        if (response.data) {
            alert(response.data.msg)
        }
        feedbackFrom(null)
    }

    const handleParticipateStatus = async (status, eventId, user) => {
        const data = { status, userId: user._id }
        const response = await API.put(`/events/participant/${eventId}`, data);
        if (response.data) {
            alert(response.data.msg)
            setSelectedEvent(response.data.event)
        }
    }

    return (
        <main>
            <NavBar />
            {user?.role !== 'volunteer' && (
                <div>
                    <div className="w-full max-w-screen-xl relative overflow-x-auto mx-auto">
                        <div className='w-full flex justify-between pt-10 pb-5'>
                            <h1 className='font-bold text-2xl text-center'>Events List</h1>
                            <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="block text-white bg-orange-500 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 text-center" type="button"
                                onClick={handleDropdown}>
                                + New event
                            </button>
                        </div>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 border">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Title
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Description
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Location
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Organizer
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Date
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Participants
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Feedbacks
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.map((event, index) => (
                                    <tr className="bg-white border-b" key={index}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {event.title}
                                        </th>
                                        <td className="px-6 py-4">
                                            {event.description}
                                        </td>
                                        <td className="px-6 py-4">
                                            {event.location}
                                        </td>
                                        <td className="px-6 py-4">
                                            {event.organizer.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {formatDate(event.date)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="flex gap-1 hover:underline"
                                                onClick={() => handleModalList(index)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>
                                                View List
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="flex gap-1 hover:underline"
                                                onClick={() => handleModalFeedback(index)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>
                                                Feedbacks
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {events.length === 0 &&
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 text-center">No events found</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>

                    {dropdown && (
                        <div id="authentication-modal" aria-hidden="true" className="absolute z-50 flex justify-center items-center w-full h-screen top-0 backdrop-blur-sm">
                            <div className="relative w-full max-w-md max-h-full">
                                <div className="relative bg-gray-50 rounded-lg shadow-sm border-2">
                                    <div className="flex items-center justify-between p-4 md:p-5 border-b-2 rounded-t border-gray-200 bg-white">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            New Event
                                        </h3>
                                        <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="authentication-modal"
                                            onClick={handleDropdown}>
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                    </div>

                                    <div className="p-4 md:p-5">
                                        <form className="space-y-6" onSubmit={handleSubmit}>
                                            <div>
                                                <label for="title" className="block text-sm/6 font-medium text-gray-900">Title</label>
                                                <div className="mt-2">
                                                    <input type="text" name="title" id="title" autocomplete="title" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-2"
                                                        placeholder="Title"
                                                        value={formData.title}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label for="location" className="block text-sm/6 font-medium text-gray-900">location</label>
                                                <div className="mt-2">
                                                    <input type="text" name="location" id="location" autocomplete="location" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-2"
                                                        placeholder="location"
                                                        value={formData.location}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className='flex gap-2'>
                                                <div className='w-full'>
                                                    <label for="organizer" className="block text-sm/6 font-medium text-gray-900">Organizer</label>
                                                    <div className="mt-2">
                                                        <select id="organizer" className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-2"
                                                            value={formData.organizer}
                                                            onChange={handleChange}>
                                                            <option value="" selected>Choose a officer</option>
                                                            {
                                                                users.map((user, index) => {
                                                                    return (
                                                                        <option key={index} value={user._id}>{user.name}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className='w-full'>
                                                    <label for="date" className="block text-sm/6 font-medium text-gray-900">date</label>
                                                    <div className="mt-2">
                                                        <input type="date" name="date" id="date" autocomplete="date" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-2"
                                                            placeholder="date"
                                                            value={formData.date}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <label for="description" className="block text-sm/6 font-medium text-gray-900">description</label>
                                                <div className="mt-2">
                                                    <textarea id="description" rows="4" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-2" placeholder="Write description here..."
                                                        value={formData.description}
                                                        onChange={handleChange}></textarea>
                                                </div>
                                            </div>

                                            <div>
                                                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}


                    {modalList && (
                        <div id="authentication-modal" aria-hidden="true" className="absolute z-50 flex justify-center items-center w-full h-screen top-0 backdrop-blur-sm">
                            <div className="relative w-full max-w-md max-h-full">
                                <div className="relative bg-gray-50 rounded-lg shadow-sm border-2">
                                    <div className="flex items-center justify-between p-4 md:p-5 border-b-2 rounded-t border-gray-200 bg-white">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Participants List
                                        </h3>
                                        <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="authentication-modal"
                                            onClick={handleModalList}>
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                    </div>

                                    <ul className="w-full h-full max-h-96 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg overflow-y-auto">
                                        {selectedEvent?.participants.map((participant, index) => (
                                            <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg flex justify-between items-center gap-1" key={index}>
                                                <div>
                                                    <p className="font-medium">{participant.user.name} </p>
                                                    <span className="font-small">{formatDate(participant.date)}</span>
                                                </div>
                                                {participant.status === 'requested' ? (
                                                    <div className='flex items-center gap-1'>
                                                        <button className='px-3 py-1 h-fit text-white bg-red-500 rounded-lg'
                                                            onClick={() => handleParticipateStatus('rejected', selectedEvent._id, participant.user)}>Decline</button>
                                                        <button className='px-3 py-1 h-fit text-white bg-green-500 rounded-lg'
                                                            onClick={() => handleParticipateStatus('accepted', selectedEvent._id, participant.user)}>Accept</button>
                                                    </div>
                                                ) : (
                                                    <span className='text-yellow-500 font-medium capitalize'>{participant.status}</span>
                                                )}
                                            </li>
                                        ))}
                                    </ul>

                                </div>
                            </div>
                        </div>
                    )}

                    {modalFeedback && (
                        <div id="authentication-modal" aria-hidden="true" className="absolute z-50 flex justify-center items-center w-full h-screen top-0 backdrop-blur-sm">
                            <div className="relative w-full max-w-md max-h-full">
                                <div className="relative bg-gray-50 rounded-lg shadow-sm border-2">
                                    <div className="flex items-center justify-between p-4 md:p-5 border-b-2 rounded-t border-gray-200 bg-white">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Feedback List
                                        </h3>
                                        <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="authentication-modal"
                                            onClick={handleModalFeedback}>
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                    </div>

                                    <ul className="w-full h-full max-h-96 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg overflow-y-auto">
                                        {selectedEvent?.participants.filter((participant) => participant.feedback).map((participant, index) => (
                                            <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg" key={index}>
                                                <div className='flex justify-between items-start'>
                                                    <span className="font-medium">{participant.feedback}</span>
                                                    <div>
                                                        <p className="font-small text-end">{participant.user.name} </p>
                                                        <span className="font-small">{formatDate(participant.date)}</span>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {user?.role === 'volunteer' && (
                <div className="w-full">
                    <div className="w-full max-w-screen-xl mx-auto grid grid-cols-2 gap-10 py-20 h-fit">
                        {events.filter((event) => event.date >= user.date).map((event, index) => {
                            const userParticipant = event.participants.find((participant) => participant.user._id === user._id);
                            const isEventOver = new Date(event.date) < new Date();
                            return (
                                <div className="w-full h-fit p-6 bg-white border-2 border-gray-200 rounded-lg shadow-sm" key={index}>
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{event.title}</h5>
                                    <p className="mb-3 font-normal text-gray-700">{event.description}</p>
                                    <div className="flex justify-between items-end mb-3">
                                        <div>
                                            <p className="font-normal text-gray-700">Organizer: {event.organizer.name}</p>
                                            <p className="font-normal text-gray-700">Location: {event.location}</p>
                                            <p className="font-normal text-gray-700">{formatDate(event.date)}</p>
                                        </div>
                                        <div className='flex gap-1'>
                                            {event.participants.length > 0 && userParticipant ? (
                                                <button className={`inline-flex capitalize items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none 
                                                    ${userParticipant.status === 'accepted' ? 'bg-green-600 hover:bg-green-700 focus:ring-green-300' :
                                                        userParticipant.status === 'requested' ? 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-300' :
                                                            'bg-red-600 hover:bg-red-700 focus:ring-red-300'}`}>
                                                    {userParticipant.status}
                                                </button>
                                            ) : (
                                                event.date < new Date() ? (
                                                    <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-600 rounded-lg cursor-not-allowed">
                                                        Not Participated
                                                    </button>
                                                ) : (
                                                    <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                                                        onClick={() => handleParticipate(event._id)}>
                                                        Participate
                                                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                                        </svg>
                                                    </button>
                                                )
                                            )}
                                            {event.participants.length > 0 && !userParticipant.feedback && userParticipant.status === 'accepted' &&
                                                <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-yellow-300"
                                                    onClick={() => handleFeedback(index)}>
                                                    Feedback
                                                </button>
                                            }
                                        </div>
                                    </div>
                                    {feedbackFrom === index && (
                                        <form onSubmit={() => handleFeedbackSubmit(event._id)}>
                                            <label for="message" class="block mb-2 text-sm font-medium text-gray-900">Your Feedback</label>
                                            <textarea id="message" rows="4" class="block p-2.5 w-full mb-3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                                onChange={(e) => setFeedback(e.target.value)}
                                                value={feedback}
                                                placeholder="Write your feedback here..."></textarea>
                                            <button className='w-full py-1.5 bg-blue-600 text-white rounded-lg font-medium'>Submit</button>
                                        </form>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                    {events.length === 0 && (
                        <p className='text-center text-xl font-medium'>No events</p>
                    )}
                </div>
            )}
        </main>
    )
}

export default EventsPage;