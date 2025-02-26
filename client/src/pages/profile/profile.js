import NavBar from "../../components/nav-bar/NavBar";
import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import axios from 'axios';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await API.get('/auth/me');
                    setUser(response.data);
                    if (response.data.image) {
                        setPreview(`http://localhost:5000/uploads/${response.data.image}`)
                    }
                }
            } catch (error) {
                console.error('Failed to fetch user:', error.response?.data?.msg || error.message);
            }
        };
        fetchUser();
    }, []);


    const initialForm = {
        name: '',
        email: '',
        mobile: '',
        password: '',
        cpassword: '',
        dob: '',
        department: '',
        adminYear: '',
    }

    const [formData, setFormData] = useState(initialForm);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.put(`/users/update/${user._id}`, formData);
            if (response.data) {
                alert(response.data.msg)
                user.dob = new Date(formData.dob).toISOString().split("T")[0]
                handleTabChange('profile')
                setFormData(initialForm)
                setUser(response.data.user)
            }
        } catch (error) {
            console.error(error.response?.data?.msg || error.message);
            alert(error.response?.data?.msg)
        }
    };

    const [tab, setTabs] = useState('profile')
    const handleTabChange = (tab) => {
        setTabs(tab)
        if (formData) {
            formData.name = user.name
            formData.email = user.email
            formData.mobile = user.mobile
            formData.department = user?.department
            formData.adminYear = user?.adminYear
        }

        if (formData.dob) {
            formData.dob = new Date(user?.dob).toISOString().split("T")[0]
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.password !== formData.cpassword) {
                return alert('Password and Confirm Password should be same!')
            }
            const response = await API.post(`/users/reset-password/${user._id}`, formData);
            if (response.data) {
                alert(response.data.msg)
                setTabs('reset')
            }
            setFormData(initialForm)
        } catch (error) {
            console.error('Login failed:', error.response?.data?.msg || error.message);
            alert(error.response?.data?.msg)
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile)); // Show preview
    };

    const handleUpload = async () => {
        if (!file) {
            alert('Please select a file first.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(`http://localhost:5000/upload/${user._id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert(response.data.message);
            setFile(null);
            setPreview(`http://localhost:5000/uploads/${response.data.fileName}`)
        } catch (error) {
            alert('Error uploading file');
        }
    };

    const formatDate = (isoString) => {
        if (isoString) {
            const date = new Date(isoString);
            return date.toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "long",
                year: "numeric",
            });
        }
    };

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
                                {user?.role !== 'admin' && (
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex gap-1 items-center focus:ring-4 focus:ring-blue-300"
                                        onClick={() => handleTabChange('edit')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>
                                        Edit
                                    </button>
                                )}
                            </div>
                            <div className="p-3 flex justify-between">
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
                                        {user?.role !== 'admin' && (
                                            <div className="space-y-4">
                                                <div>
                                                    <p className="font-medium">Phone Number:</p>
                                                    <span>{user.mobile}</span>
                                                </div>
                                                <div>
                                                    <p className="font-medium">Department:</p>
                                                    <span>{user?.department || '--------------'}</span>
                                                </div>
                                                <div>
                                                    <p className="font-medium">Date of birth:</p>
                                                    <span>{formatDate(user?.dob) || '---------------'}</span>
                                                </div>
                                                <div>
                                                    <p className="font-medium">Admission Year:</p>
                                                    <span>{user?.adminYear || '-------------------'}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                                {user?.role !== 'admin' && (
                                    <div className="flex flex-col items-center justify-start w-1/4">
                                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                            {preview ? <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-lg" /> : (
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                    </svg>
                                                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> <br /> or drag and drop</p>
                                                    <p className="text-xs text-gray-500">PNG, JPG (MAX. 2MB)</p>
                                                </div>
                                            )}
                                            <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
                                        </label>

                                        {file && (
                                            <button
                                                className="mt-2 px-4 py-1 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                                                onClick={handleUpload}
                                            >
                                                Upload File
                                            </button>
                                        )}
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
                                        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">New Password</label>
                                        <div className="mt-2">
                                            <input type="password" name="password" id="password" autocomplete="password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border"
                                                placeholder="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="cpassword" className="block text-sm/6 font-medium text-gray-900">Confirm Password</label>
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

                    {tab === 'edit' && (
                        <div className="border-2">
                            <div className="flex justify-between border-b p-3">
                                <p className="text-xl font-medium">Edit Informations</p>
                                <button className="px-4 py-2 bg-gray-400 text-white rounded-lg flex gap-1 items-center focus:ring-4 focus:ring-gray-300"
                                    onClick={() => handleTabChange('profile')}>
                                    Cancel
                                </button>
                            </div>
                            <div className="p-3">
                                <form className="space-y-6" onSubmit={handleEditSubmit}>
                                    <div>
                                        <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">Name</label>
                                        <div className="mt-2">
                                            <input type="text" name="name" id="name" autocomplete="name" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-2"
                                                placeholder="John doe"
                                                value={formData.name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email</label>
                                        <div className="mt-2">
                                            <input type="email" name="email" id="email" autocomplete="current-email" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-2"
                                                placeholder="johndoe@gmail.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="mobile" className="block text-sm/6 font-medium text-gray-900">Mobile Number</label>
                                        <div className="mt-2">
                                            <input type="text" name="mobile" id="mobile" autocomplete="mobile" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-2"
                                                placeholder="+91 1234567890"
                                                value={formData.mobile}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="department" className="block text-sm/6 font-medium text-gray-900">Department</label>
                                        <div className="mt-2">
                                            <input type="text" name="department" id="department" autocomplete="department" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-2"
                                                placeholder="Department Name"
                                                value={formData.department}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full flex gap-3">
                                        <div className="w-full">
                                            <label htmlFor="dob" className="block text-sm/6 font-medium text-gray-900">Date of birth</label>
                                            <div className="mt-2">
                                                <input type="date" name="dob" id="dob" autocomplete="dob" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border"
                                                    placeholder=""
                                                    value={formData.dob}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <label htmlFor="adminYear" className="block text-sm/6 font-medium text-gray-900">Admission Year</label>
                                            <div className="mt-2">
                                                <input type="text" name="adminYear" id="adminYear" autocomplete="adminYear" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border"
                                                    placeholder="2022"
                                                    value={formData.adminYear}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
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