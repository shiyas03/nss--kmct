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
            setUsers(users.map((user) => (user._id === userId ? { ...user, isApproved } : user)));
        } catch (error) {
            console.error('Failed to update user status:', error.response?.data?.msg || error.message);
        }
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.isApproved ? 'Approved' : 'Blocked'}</td>
                            <td>
                                <button onClick={() => handleUpdateStatus(user._id, true)} disabled={user.isApproved}>
                                    Approve
                                </button>
                                <button onClick={() => handleUpdateStatus(user._id, false)} disabled={!user.isApproved}>
                                    Block
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default VolunteersPage;