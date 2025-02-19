import React, { useEffect, useState } from 'react';
import API from '../../services/api';

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

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        role: 'volunteer',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post('/users/new-volunteer', formData);
            if (response.data.user) {
                setUsers([...users, response.data.user]);
            }
            setDropdown(false)
            alert('Volunteer created successfully');
        } catch (error) {
            console.error('Registration failed:', error.response?.data?.msg || error.message);
        }
    };

    const [dropdown, setDropdown] = useState(false);

    const handleDropdown = () => {
        setDropdown(!dropdown);
    }


    return (
        <div className=''>
            <div class="w-full max-w-screen-xl relative overflow-x-auto mx-auto">
                <div className='w-full flex justify-between pt-10 pb-5'>
                    <h1 className='font-bold text-2xl text-center'>Volunteers List</h1>
                    <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" class="block text-white bg-orange-500 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 text-center" type="button"
                        onClick={handleDropdown}>
                        + New volunteer
                    </button>
                </div>
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 border">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                No
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Mobile
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr class="bg-white border-b">
                                <th scope="row" class="px-6 py-4">
                                    {index + 1}
                                </th>
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {user.name}
                                </th>
                                <td class="px-6 py-4">
                                    {user.email}
                                </td>
                                <td class="px-6 py-4">
                                    {user.mobile}
                                </td>
                                <td class="px-6 py-4">

                                    {user.status === 'requested' &&
                                        <div className='flex gap-3'>
                                            <button className='px-3 py-1.5 bg-green-500 text-white rounded-lg'
                                                onClick={() => handleRequest(user._id, 'approved')}>accept</button>
                                            <button className='px-3 py-1.5 bg-red-500 text-white rounded-lg'
                                                onClick={() => handleRequest(user._id, 'rejected')}>reject</button>
                                        </div>
                                    }

                                    {user.block === true && user.status === 'approved' &&
                                        <button className='px-3 py-1.5 bg-green-500 text-white rounded-lg'
                                            onClick={() => handleUpdateStatus(user._id, true, index)} disabled={user.block}>
                                            Unblock
                                        </button>
                                    }
                                    {user.block === false && user.status === 'approved' &&
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
                                <td colSpan="5" class="px-6 py-4 text-center">No users found</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>


            {dropdown && (
                <div id="authentication-modal" tabindex="-1" aria-hidden="true" class="absolute z-50 flex justify-center items-center w-full h-screen top-0 backdrop-blur-sm">
                    <div class="relative w-full max-w-md max-h-full">
                        <div class="relative bg-gray-50 rounded-lg shadow-sm border-2">
                            <div class="flex items-center justify-between p-4 md:p-5 border-b-2 rounded-t border-gray-200 bg-white">
                                <h3 class="text-lg font-semibold text-gray-900">
                                    New Voulnteer
                                </h3>
                                <button type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="authentication-modal"
                                    onClick={handleDropdown}>
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                            </div>

                            <div class="p-4 md:p-5">
                                <form class="space-y-6" onSubmit={handleSubmit}>
                                    <div>
                                        <label for="name" class="block text-sm/6 font-medium text-gray-900">Name</label>
                                        <div class="mt-2">
                                            <input type="text" name="name" id="name" autocomplete="name" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-2"
                                                placeholder="John doe"
                                                value={formData.name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label for="email" class="block text-sm/6 font-medium text-gray-900">Email</label>
                                        <div class="mt-2">
                                            <input type="email" name="email" id="email" autocomplete="current-email" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-2"
                                                placeholder="johndoe@gmail.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label for="mobile" class="block text-sm/6 font-medium text-gray-900">Mobile Number</label>
                                        <div class="mt-2">
                                            <input type="text" name="mobile" id="mobile" autocomplete="mobile" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-2"
                                                placeholder="+91 1234567890"
                                                value={formData.mobile}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default VolunteersPage;