import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import API from '../../services/api';

const NavBar = () => {
  const navigate = useNavigate();

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

  const [dropdown, setDropdown] = useState(false)
  const handleDropdown = () => {
    setDropdown(!dropdown)
  }

  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-20 w-auto" src="https://i.pinimg.com/736x/aa/1f/64/aa1f64fe760fc84fc4bd5f8f45cc8276.jpg" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
            <span className="sr-only">Open main menu</span>
            <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
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
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <div className="flex items-center gap-x-4">
            {!user && (
              <Link to="/login">
                <button className="text-sm font-semibold text-gray-900 hover:text-gray-700 bg-blue-600 text-white px-4 py-2 rounded-lg">
                  Login
                </button>
              </Link>
            )}
            {user && (
              <div className="relative">
                <button className="flex gap-1" onClick={handleDropdown}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
                    <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" stroke-width="1.5" />
                    <path d="M14.75 9.5C14.75 11.0188 13.5188 12.25 12 12.25C10.4812 12.25 9.25 11.0188 9.25 9.5C9.25 7.98122 10.4812 6.75 12 6.75C13.5188 6.75 14.75 7.98122 14.75 9.5Z" stroke="currentColor" stroke-width="1.5" />
                    <path d="M5.49994 19.0001L6.06034 18.0194C6.95055 16.4616 8.60727 15.5001 10.4016 15.5001H13.5983C15.3926 15.5001 17.0493 16.4616 17.9395 18.0194L18.4999 19.0001" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <span className="uppercase font-medium">
                    {user?.name}
                  </span>
                </button>
                {dropdown &&
                  <div class="absolute z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm border-2 w-40" id="language-dropdown-menu">
                    <ul class="py-2 font-medium" role="none">
                      {/* <li>
                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                          <div class="inline-flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none">
                              <path d="M10.5 22H6.59087C5.04549 22 3.81631 21.248 2.71266 20.1966C0.453365 18.0441 4.1628 16.324 5.57757 15.4816C8.12805 13.9629 11.2057 13.6118 14 14.4281" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                              <path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" stroke="currentColor" stroke-width="1.5" />
                              <path d="M18.4332 13.8485C18.7685 13.4851 18.9362 13.3035 19.1143 13.1975C19.5442 12.9418 20.0736 12.9339 20.5107 13.1765C20.6918 13.2771 20.8646 13.4537 21.2103 13.8067C21.5559 14.1598 21.7287 14.3364 21.8272 14.5214C22.0647 14.9679 22.0569 15.5087 21.8066 15.9478C21.7029 16.1298 21.5251 16.3011 21.1694 16.6437L16.9378 20.7194C16.2638 21.3686 15.9268 21.6932 15.5056 21.8577C15.0845 22.0222 14.6214 22.0101 13.6954 21.9859L13.5694 21.9826C13.2875 21.9752 13.1466 21.9715 13.0646 21.8785C12.9827 21.7855 12.9939 21.6419 13.0162 21.3548L13.0284 21.1988C13.0914 20.3906 13.1228 19.9865 13.2807 19.6232C13.4385 19.2599 13.7107 18.965 14.2552 18.375L18.4332 13.8485Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                            </svg> Profile
                          </div>
                        </a>
                      </li> */}
                      <li>
                        <a class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" role="menuitem"
                          onClick={handleLogout}>
                          <div class="inline-flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none">
                              <path d="M15 17.625C14.9264 19.4769 13.3831 21.0494 11.3156 20.9988C10.8346 20.9871 10.2401 20.8194 9.05112 20.484C6.18961 19.6769 3.70555 18.3204 3.10956 15.2816C3 14.723 3 14.0944 3 12.8373L3 11.1627C3 9.90561 3 9.27704 3.10956 8.71845C3.70555 5.67963 6.18961 4.32314 9.05112 3.516C10.2401 3.18062 10.8346 3.01293 11.3156 3.00116C13.3831 2.95058 14.9264 4.52305 15 6.37499" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                              <path d="M10 12H21M10 12C10 11.2998 11.9943 9.99153 12.5 9.5M10 12C10 12.7002 11.9943 14.0085 12.5 14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg> Logout
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                }
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className="lg:hidden" role="dialog" aria-modal="true">
        <div className="fixed inset-0 z-10"></div>
        <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-8 w-auto" src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="" />
            </a>
            <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700">
              <span className="sr-only">Close menu</span>
              <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Features</a>
                <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Marketplace</a>
                <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Company</a>
              </div>
              <div className="py-6">
                <a href="#" className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Log in</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
