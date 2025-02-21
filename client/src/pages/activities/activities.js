import React from 'react';
import "./activities.css";
import NavBar from '../../components/nav-bar/NavBar';

const ActivitiesPage = () => {
  return (
    <main>
      <NavBar />
      <div className="about-container">
        <section className="about-header">
          <h1> Latest Activities</h1>
          <p>
            The motto of the NSS is "Not Me But You". This motto reflects the need for selfless service, democratic living, and consideration for others.
          </p>
        </section>

        <section>
          <div className='row'>

            <div className='posters'>
              <img className='poster' alt='poster' src='https://www.kmctartskuttippuram.org/images/student-events/image1image11f6bdad53eaa396a4b6890d19054133756d04554.jpeg' />
              <img className='poster' alt='poster' src='https://www.kmctartskuttippuram.org/images/student-events/image1image194421c8158c90914a4d887f6b61249c904128f25.jpg' />
              <img className='poster' alt='poster' src='https://www.kmctartskuttippuram.org/images/student-events/image1image1e59f24c8d7ac90d4152c0d05ea824d664f11acb5.jpg' />
              <img className='poster' alt='poster' src='https://www.kmctartskuttippuram.org/images/student-events/image1image173f0a81dba6285578283947427577eb71dc0cd4f.jpeg' />
              <img className='poster' alt='poster' src='https://www.kmctartskuttippuram.org/images/student-events/image1image1c84151281392e0a80ff3c2d90188f77b694ec199.jpeg' />
              <img className='poster' alt='poster' src='https://www.kmctartskuttippuram.org/images/student-events/image1image11f6bdad53eaa396a4b6890d19054133756d04554.jpeg' />
              <img className='poster' alt='poster' src='https://www.kmctartskuttippuram.org/images/student-events/image1image194421c8158c90914a4d887f6b61249c904128f25.jpg' />
              <img className='poster' alt='poster' src='https://www.kmctartskuttippuram.org/images/student-events/image1image1e59f24c8d7ac90d4152c0d05ea824d664f11acb5.jpg' />
              <img className='poster' alt='poster' src='https://www.kmctartskuttippuram.org/images/student-events/image1image173f0a81dba6285578283947427577eb71dc0cd4f.jpeg' />
              <img className='poster' alt='poster' src='https://www.kmctartskuttippuram.org/images/student-events/image1image1c84151281392e0a80ff3c2d90188f77b694ec199.jpeg' />

            </div>
          </div>
        </section>

      </div>
    </main>
  );
};

export default ActivitiesPage;
