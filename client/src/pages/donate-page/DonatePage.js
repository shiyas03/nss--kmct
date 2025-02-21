import React from 'react';
import './DonatePage.css';
import NavBar from '../../components/nav-bar/NavBar';

const DonatePage = ({ title, imageUrl, description }) => {
  return (
    <main>
      <NavBar />
      <div className="poster-page">
        <div className="poster-container">
          <img className="poster-image" src='https://c8.alamy.com/comp/2X54F1N/vertical-photo-collage-of-hands-give-money-cash-donate-help-ukraine-humanitarian-charity-shelter-dollar-isolated-on-painted-background-2X54F1N.jpg' alt={title} />
          <div className="poster-details">
            <h1 className="poster-title">{"Give Hope, Change Lives"}</h1>
            <p className="poster-description">On [insert date], the peaceful region of Wayanad was devastated by a massive landslide, leaving many families displaced and in dire need of assistance. Homes have been destroyed, livelihoods have been lost, and countless individuals are facing unimaginable challenges as they rebuild their lives.</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DonatePage;
