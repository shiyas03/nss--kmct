import React, { useState, useEffect } from 'react';
import FeedbackForm from '../../components/feedback/feedbackForm';
import API from '../../services/api';
import NavBar from '../../components/nav-bar/NavBar';

const EventsPage = () => {

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

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    return (
        <main>
            <NavBar />
            <div className=''>
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
                                    Action
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
                    <div id="authentication-modal" tabindex="-1" aria-hidden="true" className="absolute z-50 flex justify-center items-center w-full h-screen top-0 backdrop-blur-sm">
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
            </div>
        </main>
    )
}

export default EventsPage;