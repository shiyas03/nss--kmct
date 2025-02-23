import NavBar from "../../components/nav-bar/NavBar";
import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
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

    const [formData, setFormData] = useState({
        password: '',
        cpassword: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.password !== formData.cpassword) {
                return alert('Password and Confirm Password should be same!')
            }
            const response = await API.post(`/users/reset-password/${user._id}`, formData);
            if (response.data) {
                alert(response.data.msg)
                navigate('/profile')
            }
        } catch (error) {
            console.error('Login failed:', error.response?.data?.msg || error.message);
            alert(error.response?.data?.msg)
        }
    };

    const [tab, setTabs] = useState('profile')
    const handleTabChange = (tab) => {
        setTabs(tab)
    }

    return (
        <main>
            <NavBar />
            <div className="w-full max-w-screen-xl mx-auto flex gap-5">
                <div className="w-1/3 ps-20 py-10">
                    <ul className="border-2">
                        <li className="border-b p-3">
                            <button className={`w-full text-center font-medium ${tab === 'profile' ? 'text-indigo-600 font-semibold' : 'text-gray-600'
                                }`} onClick={() => handleTabChange('profile')}>Profile</button>
                        </li>
                        <li className="border-b p-3">
                            <button className={`w-full text-center font-medium ${tab === 'reset' ? 'text-indigo-600 font-semibold' : 'text-gray-600'
                                }`} onClick={() => handleTabChange('reset')}>Reset Password</button>
                        </li>
                    </ul>
                </div>
                <div className="w-2/3 py-10 py-10">
                    {tab === 'profile' && (
                        <div className="border-2">
                            <div className="flex justify-between border-b p-3">
                                <p className="text-xl font-medium">Personal Informations</p>
                                {/* <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex gap-1 items-center focus:ring-4 focus:ring-blue-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                    Edit
                                </button> */}
                            </div>
                            <div className="p-3">
                                {user && (
                                    <div className="space-y-4">
                                        <div>
                                            <p className="font-medium">Full Name:</p>
                                            <span>{user.name}</span>
                                        </div>
                                        <div>
                                            <p className="font-medium">Email Address:</p>
                                            <span>{user.email}</span>
                                        </div>
                                        <div>
                                            <p className="font-medium">Phone Number:</p>
                                            <span>{user.mobile}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {tab === 'reset' && (
                        <div className="border-2">
                            <div className="flex justify-between border-b p-3">
                                <p className="text-xl font-medium">Reset Password</p>
                            </div>
                            <div className="p-3">
                                <form className="space-y-6 w-1/2" onSubmit={handleSubmit}>
                                    <div>
                                        <label for="password" className="block text-sm/6 font-medium text-gray-900">New Password</label>
                                        <div className="mt-2">
                                            <input type="password" name="password" id="password" autocomplete="password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border"
                                                placeholder="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label for="cpassword" className="block text-sm/6 font-medium text-gray-900">Confirm Password</label>
                                        <div className="mt-2">
                                            <input type="password" name="cpassword" id="cpassword" autocomplete="password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border"
                                                placeholder="password"
                                                value={formData.cpassword}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <button className="bg-blue-600 text-white py-2 w-full rounded-lg">Submit</button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}

export default ProfilePage;