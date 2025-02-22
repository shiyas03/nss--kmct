import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import NavBar from '../../components/nav-bar/NavBar';

const VolunteersPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const endpoint = '/users/volunteers';
                const response = await API.get(endpoint);
                setUsers(response.data);
            } catch (error) {
                console.error('Failed to fetch users:', error.response?.data?.msg || error.message);
            }
        };

        fetchUsers();
    }, []);

    const handleUpdateStatus = async (userId, isApproved) => {
        try {
            await API.put(`/users/${userId}/status`, { isApproved });
            setUsers(users.map((user) => (user._id === userId ? { ...user, block: isApproved } : user)));
        } catch (error) {
            console.error('Failed to update user status:', error.response?.data?.msg || error.message);
        }
    };

    const handleRequest = async (userId, status) => {
        try {
            await API.put('/users/approve', { userId, status })
            setUsers(users.map((user) => (user._id === userId ? { ...user, status: status } : user)));
        } catch (error) {
            console.error('Failed to update user status:', error.response?.data?.msg || error.message);
        }
    }

    const initialState = {
        name: '',
        email: '',
        mobile: '',
        role: 'volunteer',
    };

    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post('/users/new-volunteer', formData);
            if (response.data.user) {
                setUsers([response.data.user, ...users]);
            }
            setDropdown(false)
            alert('Volunteer created successfully');
            setFormData(initialState);
        } catch (error) {
            console.error('Registration failed:', error.response?.data?.msg || error.message);
        }
    };

    const [dropdown, setDropdown] = useState(false);

    const handleDropdown = () => {
        setDropdown(!dropdown);
    }


    return (
        <main>
            <NavBar />
            <div className="w-full max-w-screen-xl relative overflow-x-auto mx-auto">
                <div className='w-full flex justify-between pt-10 pb-5'>
                    <h1 className='font-bold text-2xl text-center'>Volunteers List</h1>
                    <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="block text-white bg-orange-500 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 text-center" type="button"
                        onClick={handleDropdown}>
                        + New volunteer
                    </button>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 border">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Mobile
                            </th>
                            <th scope="col" className="px-6 py-3">
                                status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr className="bg-white border-b" key={index}>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {user.name}
                                </th>
                                <td className="px-6 py-4">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4">
                                    {user.mobile}
                                </td>
                                <td className="px-6 py-4">
                                    {user.status === 'not verified' && <span className="text-red-500">{user.status}</span>}
                                    {user.status === 'verified' && <span className="text-green-500">{user.status}</span>}
                                </td>
                                <td className="px-6 py-4">

                                    {user.status === 'requested' &&
                                        <div className='flex gap-3'>
                                            <button className='px-3 py-1.5 bg-green-500 text-white rounded-lg'
                                                onClick={() => handleRequest(user._id, 'approved')}>accept</button>
                                            <button className='px-3 py-1.5 bg-red-500 text-white rounded-lg'
                                                onClick={() => handleRequest(user._id, 'rejected')}>reject</button>
                                        </div>
                                    }

                                    {user.block === true && (user.status === 'verified' || user.status === 'not verified') &&
                                        <button className='px-3 py-1.5 bg-green-500 text-white rounded-lg'
                                            onClick={() => handleUpdateStatus(user._id, true, index)} disabled={user.block}>
                                            Unblock
                                        </button>
                                    }
                                    {user.block === false && (user.status === 'verified' || user.status === 'not verified') &&
                                        <button className='px-3 py-1.5 bg-red-500 text-white rounded-lg'
                                            onClick={() => handleUpdateStatus(user._id, false)} disabled={!user.block}>
                                            Block
                                        </button>
                                    }
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 &&
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center">No users found</td>
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
                                    New Voulnteer
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
                                        <label for="name" className="block text-sm/6 font-medium text-gray-900">Name</label>
                                        <div className="mt-2">
                                            <input type="text" name="name" id="name" autocomplete="name" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-2"
                                                placeholder="John doe"
                                                value={formData.name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label for="email" className="block text-sm/6 font-medium text-gray-900">Email</label>
                                        <div className="mt-2">
                                            <input type="email" name="email" id="email" autocomplete="current-email" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-2"
                                                placeholder="johndoe@gmail.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label for="mobile" className="block text-sm/6 font-medium text-gray-900">Mobile Number</label>
                                        <div className="mt-2">
                                            <input type="text" name="mobile" id="mobile" autocomplete="mobile" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-2"
                                                placeholder="+91 1234567890"
                                                value={formData.mobile}
                                                onChange={handleChange}
                                            />
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
        </main>
    )
}

export default VolunteersPage;