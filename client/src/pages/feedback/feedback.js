import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import NavBar from "../../components/nav-bar/NavBar"

const FeedbackPage = () => {
    const [feedbacks, setFeedback] = useState([]);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const endpoint = '/users/feedback';
                const response = await API.get(endpoint);
                setFeedback(response.data.feedbacks);
            } catch (error) {
                console.error('Failed to fetch users:', error.response?.data?.msg || error.message);
            }
        };

        fetchFeedbacks();
    }, []);

    return (
        <main>
            <NavBar />
            <div className="w-full max-w-screen-xl relative overflow-x-auto mx-auto">
                <div className='w-full flex justify-between pt-10 pb-5'>
                    <h1 className='font-bold text-2xl text-center'>Feedbacks</h1>
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
                                Message
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedbacks.map((feedback, index) => (
                            <tr className="bg-white border-b" key={index}>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {feedback.name}
                                </th>
                                <td className="px-6 py-4">
                                    {feedback.email}
                                </td>
                                <td className="px-6 py-4">
                                    {feedback.message}
                                </td>
                            </tr>
                        ))}
                        {feedbacks.length === 0 &&
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center">No users found</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>

        </main>
    )
}

export default FeedbackPage;