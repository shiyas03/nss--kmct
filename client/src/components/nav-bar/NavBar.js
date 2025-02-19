import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import API from '../../services/api';

const NavBar = ({ }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

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

  return (
    <header class="bg-white">
      <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div class="flex lg:flex-1">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <img class="h-20 w-auto" src="https://i.pinimg.com/736x/aa/1f/64/aa1f64fe760fc84fc4bd5f8f45cc8276.jpg" />
          </a>
        </div>
        <div class="flex lg:hidden">
          <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
            <span class="sr-only">Open main menu</span>
            <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {(!user || user?.role === "volunteer") && (
            <>
              <Link to="/" className="text-sm font-semibold text-gray-900">
                Home
              </Link>
              {user?.role && (
                <Link to="/events" className="text-sm font-semibold text-gray-900">
                  Events
                </Link>
              )}
              <Link to="/about" className="text-sm font-semibold text-gray-900">
                About
              </Link>
              <Link to="/activities" className="text-sm font-semibold text-gray-900">
                Activities
              </Link>
              <Link to="/contact" className="text-sm font-semibold text-gray-900">
                Contact
              </Link>
              <Link to="/donate" className="text-sm font-semibold text-gray-900">
                Donate
              </Link>
            </>
          )}

          {user?.role === "programOfficer" && (
            <>
              <Link to="/po-dashboard" className="text-sm font-semibold text-gray-900">
                Dashboard
              </Link>
              <Link to="/volunteers" className="text-sm font-semibold text-gray-900">
                Volunteers
              </Link>
              <Link to="/events" className="text-sm font-semibold text-gray-900">
                Events
              </Link>
              <Link to="/feedback" className="text-sm font-semibold text-gray-900">
                Feedback
              </Link>
            </>
          )}

          {user?.role === "admin" && (
            <>
              <Link to="/dashboard" className="text-sm font-semibold text-gray-900">
                Dashboard
              </Link>
              <Link to="/volunteers" className="text-sm font-semibold text-gray-900">
                Volunteers
              </Link>
              <Link to="/program-officers" className="text-sm font-semibold text-gray-900">
                Program Officers
              </Link>
              <Link to="/events" className="text-sm font-semibold text-gray-900">
                Events
              </Link>
              <Link to="/feedback" className="text-sm font-semibold text-gray-900">
                Feedback
              </Link>
            </>
          )}
        </div>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <div className="flex items-center gap-x-4">
            {!user && (
              <Link to="/login">
                <button className="text-sm font-semibold text-gray-900 hover:text-gray-700 bg-blue-600 text-white px-4 py-2 rounded-lg">
                  Login
                </button>
              </Link>
            )}
            {user && (
              <button
                onClick={handleLogout}
                className="text-sm font-semibold text-gray-900 hover:text-gray-700 bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
      <div class="lg:hidden" role="dialog" aria-modal="true">
        <div class="fixed inset-0 z-10"></div>
        <div class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div class="flex items-center justify-between">
            <a href="#" class="-m-1.5 p-1.5">
              <span class="sr-only">Your Company</span>
              <img class="h-8 w-auto" src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="" />
            </a>
            <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700">
              <span class="sr-only">Close menu</span>
              <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/10">
              <div class="space-y-2 py-6">
                <div class="-mx-3">
                  <button type="button" class="flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50" aria-controls="disclosure-1" aria-expanded="false">

                    <svg class="size-5 flex-none" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                      <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                    </svg>
                  </button>
                  <div class="mt-2 space-y-2" id="disclosure-1">
                    <a href="#" class="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50">Analytics</a>
                    <a href="#" class="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50">Engagement</a>
                    <a href="#" class="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50">Security</a>
                    <a href="#" class="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50">Integrations</a>
                    <a href="#" class="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50">Automations</a>
                    <a href="#" class="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50">Watch demo</a>
                    <a href="#" class="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50">Contact sales</a>
                  </div>
                </div>
                <a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Features</a>
                <a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Marketplace</a>
                <a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Company</a>
              </div>
              <div class="py-6">
                <a href="#" class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Log in</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
