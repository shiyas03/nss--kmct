import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import NavBar from '../../components/nav-bar/NavBar';

const DashboardPage = () => {
    const [user, setUser] = useState(null);
    const [data, setData] = useState(null);
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

        const fetchDashboradData = async () => {
            const response = await API.get('/dashboard')
            if (response.data) {
                setData(response.data);
            }
        }
        fetchDashboradData()
    }, []);


    return (
        <main>
            <NavBar />
            <div className="h-screen ">
                <div
                    className="items-center max-w-screen-xl px-4 py-8 mx-auto lg:grid lg:grid-cols-4 lg:gap-16 xl:gap-24 lg:py-24 lg:px-6">
                    <div className="col-span-2 mb-8">
                        <p className="text-lg font-medium text-blue-500">NSS KMCT</p>
                        <h2 className="mt-3 mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-3xl">
                            Welcome to 
                            {user?.role === 'admin'? ' Admin ':' Program Officer '}
                             Dashboard</h2>
                        <p className="font-light text-gray-500 sm:text-xl">National service scheme (NSS) is a central sector scheme of the Government of India, Ministry of youth affairs & sports.</p>
                        <div className="pt-6 mt-6 space-y-4 border-t border-gray-200">
                            <div>
                                <a href="/volunteers" className="inline-flex items-center text-base font-medium text-blue-500 hover:text-blue-800">
                                    View Entire Data of Volunteers
                                    <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                </a>
                            </div>
                            {user?.role === 'admin' && (
                                <div>
                                    <a href="/program-officers" className="inline-flex items-center text-base font-medium text-blue-500 hover:text-blue-800">
                                        View Entire Data of Program Officers
                                        <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                                clip-rule="evenodd"></path>
                                        </svg>
                                    </a>
                                </div>
                            )}
                            <div>
                                <a href="/events" className="inline-flex items-center text-base font-medium text-blue-500 hover:text-blue-800">
                                    View Entire Data of Events
                                    <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                </a>
                            </div>
                            <div>
                                <a href="/feedback" className="inline-flex items-center text-base font-medium text-blue-500 hover:text-blue-800">
                                    View Entire Data of Feedbacks
                                    <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div >
                    {data && (
                        <div className="col-span-2 space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0">
                            <div>
                                <svg className="w-10 h-10 mb-2 text-blue-500 md:w-12 md:h-12" fill="currentColor"
                                    viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z">
                                    </path>
                                </svg>
                                <div className='flex gap-3'>
                                    <h3 className="mb-2 text-2xl font-bold">{data.volunteer}</h3>
                                    <p className="mb-2 text-xl font-bold">Volunteers</p>
                                </div>
                            </div>
                            {user?.role === 'admin' && (
                                <div>
                                    <svg className="w-10 h-10 mb-2 text-blue-500 md:w-12 md:h-12" fill="currentColor"
                                        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z">
                                        </path>
                                    </svg>
                                    <div className='flex gap-3'>
                                        <h3 className="mb-2 text-2xl font-bold">{data.programOfficer}</h3>
                                        <p className="mb-2 text-xl font-bold">Program Officers</p>
                                    </div>
                                </div>
                            )}
                            <div>
                                <svg className="w-10 h-10 mb-2 text-blue-500 md:w-12 md:h-12" fill="currentColor"
                                    viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 1a1 1 0 11-2 0 1 1 0 012 0zM2 13a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2zm14 1a1 1 0 11-2 0 1 1 0 012 0z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                <div className='flex gap-3'>
                                    <h3 className="mb-2 text-2xl font-bold">{data.feedback}</h3>
                                    <p className="mb-2 text-xl font-bold">Feedbacks</p>
                                </div>
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8 mb-2 text-blue-500 md:w-12 md:h-12">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46" />
                                </svg>

                                <div className='flex gap-3'>
                                    <h3 className="mb-2 text-2xl font-bold">{data.event}</h3>
                                    <p className="mb-2 text-xl font-bold">Events</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div >
            </div >
        </main >
    )
}

export default DashboardPage;