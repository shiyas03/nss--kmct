import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import NavBar from '../../components/nav-bar/NavBar';
import axios from 'axios';

const EventsPage = () => {

    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [user, setUser] = useState(null);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const fetchEvents = async () => {
        try {
            const response = await API.get('/events');
            setEvents(response.data);
        } catch (error) {
            console.error('Failed to fetch events:', error.response?.data?.msg || error.message);
        }
    };

    useEffect(() => {
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
        _id: null,
        title: '',
        location: '',
        organizer: '',
        date: '',
        description: '',
        image: '',
    };

    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!file) {
                alert('Please select a file first.');
                return;
            }

            const response = await API.post('/events/new-event', formData);

            const fileFormData = new FormData();
            fileFormData.append('file', file);

            if (response.data.event) {
                const res = await axios.post(`http://localhost:5000/upload/event/${response.data.event._id}`, fileFormData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                response.data.event.image = res.data.fileName
                setEvents([response.data.event, ...events]);
            }

            if (response.data.update) {
                const res = await axios.post(`http://localhost:5000/upload/event/${response.data.update._id}`, fileFormData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                const index = events.findIndex((event) => event._id === selectedEvent._id)
                response.data.update.image = res.data.fileName
                events.splice(index, 1, response.data.update);
            }
            setFile(null);
            setPreview(null);
            alert(response.data.msg);
            setDropdown(false)
            setFormData(initialState);
        } catch (error) {
            console.error('failed:', error.response?.data?.msg || error.message);
        }
    };

    const [dropdown, setDropdown] = useState(false);

    const handleDropdown = () => {
        fetchUsers()
        setDropdown(!dropdown);
        if (dropdown === true) {
            setFormData(initialState)
            setFile(null)
            setPreview(null)
        }
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
            setModalList(false);
            fetchEvents()
        }
    }

    const handleEditEvent = async (event, index) => {
        setSelectedEvent(events[index])
        setFormData({
            _id: event._id,
            title: event.title,
            location: event.location,
            organizer: event.organizer._id,
            date: new Date(event.date).toISOString().split("T")[0],
            description: event.description,
            image: event.image,
        })
        setPreview(`http://localhost:5000/uploads/${event.image}`)
        handleDropdown()
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const [imagePreview, setModal] = useState(false);

    const handleImageModal = (index) => {
        setModal(!imagePreview);
        setSelectedEvent(events[index])
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
                                    <th scope="col" className="px-6 py-3">
                                        Image
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
                                        <td className="px-6 py-4">
                                            <button className="flex gap-1 hover:underline"
                                                onClick={() => handleImageModal(index)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>
                                                Preview
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="flex gap-1 hover:underline"
                                                onClick={() => handleEditEvent(event, index)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                </svg>
                                                Edit
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
                                        <form className="space-y-2" onSubmit={handleSubmit}>
                                            <div>
                                                <label htmlFor="title" className="block text-sm/6 font-medium text-gray-900">Title</label>
                                                <div className="mt-1">
                                                    <input type="text" name="title" id="title" autoComplete="title" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-2"
                                                        placeholder="Title"
                                                        value={formData.title}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="location" className="block text-sm/6 font-medium text-gray-900">location</label>
                                                <div className="mt-1">
                                                    <input type="text" name="location" id="location" autoComplete="location" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-2"
                                                        placeholder="location"
                                                        value={formData.location}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className='flex gap-2'>
                                                <div className='w-full'>
                                                    <label htmlFor="organizer" className="block text-sm/6 font-medium text-gray-900">Organizer</label>
                                                    <div className="mt-1">
                                                        <select id="organizer" className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-2"
                                                            value={formData.organizer}
                                                            onChange={handleChange}>
                                                            <option value="">Choose a officer</option>
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
                                                    <label htmlFor="date" className="block text-sm/6 font-medium text-gray-900">date</label>
                                                    <div className="mt-1">
                                                        <input type="date" name="date" id="date" autoComplete="date" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-2"
                                                            placeholder="date"
                                                            value={formData.date}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">description</label>
                                                <div className="mt-1">
                                                    <textarea id="description" rows="4" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-2" placeholder="Write description here..."
                                                        value={formData.description}
                                                        onChange={handleChange}></textarea>
                                                </div>
                                            </div>
                                            <label htmlFor="" className="block text-sm/6 font-medium text-gray-900 text-start">Image upload</label>
                                            <div className="flex flex-col items-center justify-start w-full">
                                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                                    {preview ? <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-lg" /> : (
                                                        <div className="flex flex-col items-center justify-center pt-1 pb-1">
                                                            <svg className="w-8 h-8 mb-1 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                            </svg>
                                                            <p className="mb-1 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> <br /> or drag and drop</p>
                                                            <p className="text-xs text-gray-500">PNG, JPG (MAX. 2MB)</p>
                                                        </div>
                                                    )}
                                                    <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} required />
                                                </label>
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

                    {imagePreview && (
                        <div id="authentication-modal" aria-hidden="true" className="absolute z-50 flex justify-center items-center w-full h-screen top-0 backdrop-blur-sm">
                            <div className="relative w-full max-w-md max-h-full">
                                <div className='flex flex-col items-center gap-3'>
                                    <button className='text-center' onClick={handleImageModal}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                    </button>
                                    <img src={`http://localhost:5000/uploads/${selectedEvent.image}`} alt="preview" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {user?.role === 'volunteer' && (
                <div className="w-full">
                    <div className="w-full max-w-screen-xl mx-auto grid md:grid-cols-2 grid-cols-1 gap-10 py-20 h-fit">
                        {events.filter((event) => event.date >= user.date).map((event, index) => {
                            const userParticipant = event.participants.find((participant) => participant.user._id === user._id);
                            return (
                                <div key={index} className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm md:max-w-xl hover:bg-gray-100">
                                    <div>
                                        <div className='flex'>
                                            <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={`http://localhost:5000/uploads/${event.image}`} alt="" />
                                            <div className="w-full flex flex-col justify-between mb-3">
                                                <div className="flex flex-col p-4 leading-normal">
                                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{event.title}</h5>
                                                    <p className="mb-3 font-normal text-gray-700">{event.description}</p>
                                                </div>
                                                <div className='p-4'>
                                                    <p className="font-normal text-gray-700">Organizer: <span className='font-medium'>{event.organizer.name}</span></p>
                                                    <p className="font-normal text-gray-700">Location: <span className='font-medium'> {event.location}</span></p>
                                                    <p className="font-normal text-gray-700">Date: <span className='font-medium'>{formatDate(event.date)}</span></p>
                                                </div>
                                                <div className='w-fit flex gap-1 px-4'>
                                                    {event.participants.length > 0 && userParticipant ? (
                                                        <button className={`inline-flex capitalize items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none 
                                                    ${userParticipant.status === 'accepted' ? 'bg-green-600 hover:bg-green-700 focus:ring-green-300' :
                                                                userParticipant.status === 'requested' ? 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-300' :
                                                                    'bg-red-600 hover:bg-red-700 focus:ring-red-300'}`}>
                                                            {userParticipant.status}
                                                        </button>
                                                    ) : (
                                                        new Date(event.date) < new Date() ? (
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
                                                    {event.participants.length > 0 && !userParticipant?.feedback && userParticipant?.status === 'accepted' &&
                                                        <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-yellow-300"
                                                            onClick={() => handleFeedback(index)}>
                                                            Feedback
                                                        </button>
                                                    }
                                                    {event.participants.length > 0 && userParticipant?.feedback && userParticipant?.status === 'accepted' &&
                                                        <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-rose-600 rounded-lg hover:bg-rose-700 focus:ring-4 focus:outline-none focus:ring-yellow-300">
                                                            Feedback Updated
                                                        </button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {feedbackFrom === index && (
                                        <form onSubmit={() => handleFeedbackSubmit(event._id)} className='p-4'>
                                            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">Your Feedback</label>
                                            <textarea id="message" rows="4" className="block p-2.5 w-full mb-3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none"
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