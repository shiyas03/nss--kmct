import React from 'react';
import "./activities.css";
import NavBar from '../../components/nav-bar/NavBar';
import Footer from '../../components/footer/Footer';

const ActivitiesPage = () => {
  return (
    <main>
      <NavBar />
      <section className="max-w-screen-xl mx-auto">

        <div className='w-full flex flex-col items-center py-20'>
          <h1 className="text-center text-4xl font-bold py-5">Latest Activities</h1>
          <p className='max-w-xl text-center'>
            The motto of the NSS is "Not Me But You". This motto reflects the need for selfless service, democratic living, and consideration for others.
          </p>
        </div>

        <div className="columns-1 md:columns-2 xl:columns-3 gap-7">
          <div className=" break-inside-avoid mb-8">
            <img className="h-auto max-w-full rounded-lg" src="https://www.kmctartskuttippuram.org/images/student-events/image1image1c84151281392e0a80ff3c2d90188f77b694ec199.jpeg" alt="Gallery image" />
          </div>
          <div className=" break-inside-avoid  mb-8">
            <img className="h-auto max-w-full rounded-lg" src="https://www.kmctartskuttippuram.org/images/student-events/image1image173f0a81dba6285578283947427577eb71dc0cd4f.jpeg" alt="Gallery image" />
          </div>
          <div className=" break-inside-avoid  mb-8">
            <img className="h-auto max-w-full rounded-lg" src="https://www.kmctartskuttippuram.org/images/student-events/image1image11f6bdad53eaa396a4b6890d19054133756d04554.jpeg" alt="Gallery image" />
          </div>
          <div className=" break-inside-avoid  mb-8">
            {/* <img className="h-auto max-w-full rounded-lg" src="" alt="Gallery image" /> */}
          </div>
          <div className=" break-inside-avoid  mb-8">
            <img className="h-auto max-w-full rounded-lg" src="https://www.kmctartskuttippuram.org/images/student-events/image1image1e59f24c8d7ac90d4152c0d05ea824d664f11acb5.jpg" alt="Gallery image" />
          </div>
          <div className=" break-inside-avoid  mb-8">
            <img className="h-auto max-w-full rounded-lg" src="https://www.kmctartskuttippuram.org/images/student-events/image1image194421c8158c90914a4d887f6b61249c904128f25.jpg" alt="Gallery image" />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default ActivitiesPage;
