import React, { useEffect, useState } from 'react';
import API from '../../services/api';

const ProgramOfficersPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const endpoint = '/users/program-officers';
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

    return (
        <div>
            <div class="w-full max-w-screen-xl relative overflow-x-auto mx-auto">
                <h1 className='font-bold text-2xl pt-10 pb-5 text-center'>Volunteers List</h1>
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 border">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr className='border-b'>
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
                                Status
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr class={`border-b ${user.status == 'rejected' ? 'bg-gray-50' : 'bg-white'}`}>
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
                                    {user.status === 'requested' && <span className='text-yellow-500 font-medium'>requested</span>}
                                    {user.status === 'rejected' && <span className='text-red-500 font-medium'>rejected</span>}
                                    {user.status === 'approved' && <span className='text-green-500 font-medium'>Approved</span>}
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
        </div>
    )
}

export default ProgramOfficersPage;