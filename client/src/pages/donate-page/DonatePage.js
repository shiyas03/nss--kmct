import React, { useState } from 'react';
import './DonatePage.css';
import NavBar from '../../components/nav-bar/NavBar';

const DonatePage = ({ title }) => {

  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(!modal);
  }

  return (
    <main>
      <NavBar />
      <div className="poster-page">
        <div className="poster-container">
          <img className="poster-image" src='https://c8.alamy.com/comp/2X54F1N/vertical-photo-collage-of-hands-give-money-cash-donate-help-ukraine-humanitarian-charity-shelter-dollar-isolated-on-painted-background-2X54F1N.jpg' alt={title} />
          <div className="poster-details">
            <h1 className="poster-title">{"Give Hope, Change Lives"}</h1>
            <p className="poster-description">On [insert date], the peaceful region of Wayanad was devastated by a massive landslide, leaving many families displaced and in dire need of assistance. Homes have been destroyed, livelihoods have been lost, and countless individuals are facing unimaginable challenges as they rebuild their lives.</p>
            <button className='px-4 py-2 bg-blue-600 focus:ring-4 focus:ring-blue-200 rounded-lg text-white mt-3 flex gap-1 uppercase'
              onClick={handleModal}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                <path d="M11 7H17M11 5V9C11 10.6569 12.3431 12 14 12C15.6569 12 17 10.6569 17 9V5C17 3.34315 15.6569 2 14 2C12.3431 2 11 3.34315 11 5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M4 14H6.39482C6.68897 14 6.97908 14.0663 7.24217 14.1936L9.28415 15.1816C9.54724 15.3089 9.83735 15.3751 10.1315 15.3751H11.1741C12.1825 15.3751 13 16.1662 13 17.142C13 17.1814 12.973 17.2161 12.9338 17.2269L10.3929 17.9295C9.93707 18.0555 9.449 18.0116 9.025 17.8064L6.84211 16.7503" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M13 16.5L17.5928 15.0889C18.407 14.8352 19.2871 15.136 19.7971 15.8423C20.1659 16.3529 20.0157 17.0842 19.4785 17.3942L11.9629 21.7305C11.4849 22.0063 10.9209 22.0736 10.3952 21.9176L4 20.0199" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg> Donate</button>
          </div>
        </div>
      </div>
      {modal && (
        <div id="authentication-modal" tabindex="-1" aria-hidden="true" className="absolute z-50 flex justify-center items-center w-full h-screen top-0 backdrop-blur-sm">
          <div className="relative w-full max-w-md max-h-full">
            <div className='flex flex-col items-center gap-3'>
              <button className='text-center' onClick={handleModal}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
              </button>
              <h1 className='text-center text-xl font-semibold'>Scan QR Here</h1>
              <img src="https://images.squarespace-cdn.com/content/v1/5d3f241fa4e0350001fa20d5/1636491460338-AIZAXV2978MGIDQE0GT7/qr-code.png?format=2500w" />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default DonatePage;
